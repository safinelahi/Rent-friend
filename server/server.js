import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Load routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import productRoutes from './routes/products.js';
import bookingRoutes from './routes/bookings.js';

// Config Env variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allow all origins for development
  credentials: true
}));
app.use(express.json());

// Resolve dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/bookings', bookingRoutes);

// Fallback Route
app.get('/', (req, res) => {
  res.send('Rent Friend API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
