import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Booking from './models/Booking.js';
import Product from './models/Product.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalBookings = await Booking.countDocuments();

    console.log(`\n--- DB Metrics ---`);
    console.log(`Total Users: ${totalUsers}`);
    console.log(`Total Products: ${totalProducts}`);
    console.log(`Total Bookings: ${totalBookings}`);

    const users = await User.find({}, 'name email role isVerified verificationStatus');
    console.log(`\n--- Users in DB ---`);
    users.forEach((u, i) => {
      console.log(`${i+1}. Name: ${u.name} | Email: ${u.email} | Role: ${u.role} | Verified: ${u.isVerified} | VerificationStatus: ${u.verificationStatus}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error fetching stats:", error);
    process.exit(1);
  }
};

run();
