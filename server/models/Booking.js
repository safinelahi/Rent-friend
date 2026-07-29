import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    pickupDate: {
      type: String,
      required: true,
    },
    returnDate: {
      type: String,
      required: true,
    },
    rentalDays: {
      type: Number,
      required: true,
    },
    rentalTotal: {
      type: Number,
      required: true,
    },
    securityDeposit: {
      type: Number,
      default: 1500,
    },
    serviceFee: {
      type: Number,
      default: 85,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['mobile', 'card'],
      required: true,
    },
    status: {
      type: String,
      enum: [
        'Pending Approval',
        'Approved',
        'Active',
        'Returned',
        'Completed',
        'Rejected',
      ],
      default: 'Pending Approval',
    },
    pickupAudits: {
      type: [String],
      default: [],
    },
    returnAudits: {
      type: [String],
      default: [],
    },
    payoutStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
