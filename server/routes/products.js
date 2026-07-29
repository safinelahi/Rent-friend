import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `product-${req.user.id}-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    );
  },
});

// File validation helper
const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only (jpg, jpeg, png, webp)'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// GET all live products with optional filters (category, city, search query)
router.get('/', async (req, res) => {
  try {
    const { category, city, query } = req.query;
    
    let filter = { status: 'Live' };
    
    if (category && category !== 'All') {
      filter.category = category;
    }
    
    if (city && city !== 'All') {
      filter.city = city;
    }
    
    if (query) {
      filter.title = { $regex: query, $options: 'i' };
    }
    
    const products = await Product.find(filter).populate('owner', 'name email rating reviews');
    
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET products listed by the currently authenticated user
router.get('/my-listings', protect, async (req, res) => {
  try {
    const listings = await Product.find({ owner: req.user.id });
    res.json({
      success: true,
      listings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('owner', 'name email rating reviews');
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST list a new product
router.post('/', protect, upload.array('images', 3), async (req, res) => {
  try {
    const { title, category, description, price, location, rules, city } = req.body;
    
    if (!title || !category || !description || !price || !location || !rules) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    if (!req.files || req.files.length < 3) {
      return res.status(400).json({ success: false, error: 'Please upload exactly 3 photos' });
    }

    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

    const identifier = `#RF-RF-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    const product = await Product.create({
      title,
      identifier,
      image: imagePaths[0],
      images: imagePaths,
      category,
      description,
      price: Number(price),
      location,
      city: city || 'Dhaka',
      manual: rules,
      owner: req.user.id,
      isVerified: true, // Default to true for this P2P project
    });

    res.status(201).json({
      success: true,
      message: 'Gear listed successfully',
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});

// PATCH toggle listing status (Live / Hidden)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    if (String(product.owner) !== String(req.user.id) && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    product.status = product.status === 'Live' ? 'Hidden' : 'Live';
    await product.save();

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// DELETE product
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    if (String(product.owner) !== String(req.user.id) && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product removed successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;
