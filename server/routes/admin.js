import express from 'express';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Product from '../models/Product.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Get all users who are pending verification
router.get('/pending-verifications', protect, adminOnly, async (req, res) => {
  try {
    const pendingUsers = await User.find({ verificationStatus: 'pending_approval' }).select('-password');
    res.json({
      success: true,
      users: pendingUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Approve or reject user verification request
router.patch('/verify/:userId', protect, adminOnly, async (req, res) => {
  const { status, reason } = req.body; // Expects 'Verified' or 'Rejected'
  const { userId } = req.params;

  if (!status || !['Verified', 'Rejected'].includes(status)) {
    return res.status(400).json({ success: false, error: "Please provide status as 'Verified' or 'Rejected'" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (status === 'Verified') {
      user.isVerified = true;
      user.verificationStatus = 'verified';
      user.verificationRejectionReason = null;
    } else {
      user.isVerified = false;
      user.verificationStatus = 'rejected';
      user.verificationRejectionReason = reason || 'Your verification documents were blurry or did not match our database records.';
    }

    await user.save();

    res.json({
      success: true,
      message: `User identity ${status === 'Verified' ? 'approved' : 'rejected'} successfully.`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET admin dashboard stats
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const pendingVerifications = await User.countDocuments({ verificationStatus: 'pending_approval' });
    const activeRentals = await Booking.countDocuments({ status: 'Active' });
    
    // Revenue is 10% fee from completed bookings
    const completedBookings = await Booking.find({ status: 'Completed' });
    const platformRevenue = completedBookings.reduce((sum, booking) => sum + (booking.rentalTotal * 0.1), 0);

    res.json({
      success: true,
      stats: {
        totalUsers,
        pendingVerifications,
        activeRentals,
        platformRevenue: Math.round(platformRevenue),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET payouts queue (bookings completed/returned with pending payout)
router.get('/payouts', protect, adminOnly, async (req, res) => {
  try {
    const payouts = await Booking.find({
      status: 'Completed',
      payoutStatus: 'Pending',
    })
      .populate({
        path: 'product',
        populate: {
          path: 'owner',
          select: 'name email',
        },
      })
      .populate('renter', 'name email');

    res.json({
      success: true,
      payouts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PATCH pay lender (mark payout as Paid)
router.patch('/payouts/:id', protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    booking.payoutStatus = 'Paid';
    await booking.save();

    res.json({
      success: true,
      message: 'Payout marked as paid successfully',
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET returns queue (bookings in Returned status)
router.get('/returns', protect, adminOnly, async (req, res) => {
  try {
    const returns = await Booking.find({ status: 'Returned' })
      .populate({
        path: 'product',
        populate: {
          path: 'owner',
          select: 'name email',
        },
      })
      .populate('renter', 'name email');

    res.json({
      success: true,
      returns,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// PATCH approve return audit
router.patch('/returns/:id/approve', protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    booking.status = 'Completed';
    await booking.save();

    res.json({
      success: true,
      message: 'Return audit approved. Payout is now pending.',
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET all bookings in the system
router.get('/bookings', protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: 'product',
        populate: {
          path: 'owner',
          select: 'name email',
        },
      })
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

// PATCH cancel booking (admin override)
router.patch('/bookings/:id/cancel', protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    booking.status = 'Rejected'; // Cancel status
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully.',
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;
