import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Booking from '../models/Booking.js';
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
      `audit-${req.user.id}-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
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

// POST Create a new booking
router.post('/', protect, async (req, res) => {
  try {
    const { productId, pickupDate, returnDate, rentalDays, rentalTotal, grandTotal, paymentMethod } = req.body;

    if (!productId || !pickupDate || !returnDate || !rentalDays || !rentalTotal || !grandTotal || !paymentMethod) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    // Check if the user already has an active booking
    const activeBooking = await Booking.findOne({
      renter: req.user.id,
      status: { $in: ['Pending Approval', 'Approved', 'Active', 'Returned'] },
    });

    if (activeBooking) {
      return res.status(400).json({ success: false, error: 'LIMIT_REACHED' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const calculatedSecurityDeposit = product.price > 10000 ? Math.round(product.price * 0.4) : Math.round(product.price * 0.1);
    const serviceFee = 85;
    const computedGrandTotal = Number(rentalTotal) + calculatedSecurityDeposit + serviceFee;

    const booking = await Booking.create({
      renter: req.user.id,
      product: productId,
      pickupDate,
      returnDate,
      rentalDays,
      rentalTotal,
      securityDeposit: calculatedSecurityDeposit,
      grandTotal: computedGrandTotal,
      paymentMethod,
    });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET renter bookings
router.get('/my-rentals', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ renter: req.user.id })
      .populate({
        path: 'product',
        populate: {
          path: 'owner',
          select: 'name email rating reviews',
        },
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET lender bookings
router.get('/lender-rentals', protect, async (req, res) => {
  try {
    // Find all products owned by current user
    const products = await Product.find({ owner: req.user.id });
    const productIds = products.map(p => p._id);

    // Find all bookings for these products
    const bookings = await Booking.find({ product: { $in: productIds } })
      .populate('product')
      .populate('renter', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PATCH update booking status (Lender approval / rejection or handover status)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['Pending Approval', 'Approved', 'Active', 'Returned', 'Completed', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id).populate('product');
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    const isLender = String(booking.product.owner) === String(req.user.id);
    const isRenter = String(booking.renter) === String(req.user.id);
    const isAdmin = req.user.role === 'admin';

    if (!isLender && !isRenter && !isAdmin) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    booking.status = status;
    await booking.save();

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST audit-pickup (Renter uploads 3 files)
router.post('/:id/audit-pickup', protect, upload.array('images', 3), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    if (String(booking.renter) !== String(req.user.id)) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    if (!req.files || req.files.length < 3) {
      return res.status(400).json({ success: false, error: 'Please upload exactly 3 photos' });
    }

    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    booking.pickupAudits = imagePaths;
    booking.status = 'Active';
    await booking.save();

    res.json({
      success: true,
      message: 'Pickup audit files uploaded successfully. Rental is now ACTIVE.',
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});

// POST audit-return (Renter uploads 3 files)
router.post('/:id/audit-return', protect, upload.array('images', 3), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    if (String(booking.renter) !== String(req.user.id)) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    if (!req.files || req.files.length < 3) {
      return res.status(400).json({ success: false, error: 'Please upload exactly 3 photos' });
    }

    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    booking.returnAudits = imagePaths;
    booking.status = 'Returned';
    await booking.save();

    res.json({
      success: true,
      message: 'Return audit files uploaded successfully. Status set to RETURNED.',
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});

export default router;
