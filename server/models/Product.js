import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a product title'],
      trim: true,
    },
    identifier: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: [
        (val) => val.length <= 3,
        'Cannot exceed 3 images for verification',
      ],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    description: {
      type: String,
      required: [true, 'Please add a condition description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a base daily price'],
    },
    location: {
      type: String,
      required: [true, 'Please add a handover location'],
    },
    city: {
      type: String,
      default: 'Dhaka',
    },
    manual: {
      type: String,
      required: [true, 'Please add owner rules or manual'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Live', 'Hidden'],
      default: 'Live',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
