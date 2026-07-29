import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import User from '../models/User.js';
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
      `${file.fieldname}-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`
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

// Upload user verification documents (NID front/back and optional selfie)
router.post(
  '/upload-verification',
  protect,
  upload.fields([
    { name: 'nidFront', maxCount: 1 },
    { name: 'nidBack', maxCount: 1 },
    { name: 'selfie', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      // Check if files exist
      if (!req.files || !req.files.nidFront || !req.files.nidBack) {
        return res.status(400).json({ success: false, error: 'NID Front and Back are required' });
      }

      if (user.role === 'lender' && !req.files.selfie) {
        return res.status(400).json({ success: false, error: 'Selfie is required for Lenders' });
      }

      // Update document paths
      if (req.files.nidFront) {
        user.nidFront = `/uploads/${req.files.nidFront[0].filename}`;
      }
      if (req.files.nidBack) {
        user.nidBack = `/uploads/${req.files.nidBack[0].filename}`;
      }
      if (req.files.selfie) {
        user.selfie = `/uploads/${req.files.selfie[0].filename}`;
      }

      user.verificationStatus = 'pending_approval';
      await user.save();

      res.json({
        success: true,
        message: 'Verification documents uploaded successfully. Admin review pending.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          verificationStatus: user.verificationStatus,
          nidFront: user.nidFront,
          nidBack: user.nidBack,
          selfie: user.selfie,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message || 'Server error' });
    }
  }
);

// Upgrade renter to lender
router.patch('/upgrade', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    user.role = 'lender';
    await user.save();

    res.json({
      success: true,
      message: 'User role upgraded to lender successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;
