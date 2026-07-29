import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const seed = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("Error: MONGODB_URI is not defined in .env file.");
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    const email = "admin@rentfriend.com";
    const password = "admin123456";

    let admin = await User.findOne({ email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (admin) {
      admin.role = 'admin';
      admin.isVerified = true;
      admin.verificationStatus = 'verified';
      admin.password = hashedPassword;
      await admin.save();
      console.log("Admin account updated successfully.");
    } else {
      admin = await User.create({
        name: "RentFriend Admin",
        email,
        password: hashedPassword,
        role: "admin",
        isVerified: true,
        verificationStatus: "verified"
      });
      console.log("Admin account created successfully.");
    }

    console.log(`Admin account: ${email} / ${password}`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
