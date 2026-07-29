import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['renter', 'lender', 'admin'],
      default: 'renter',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: String,
      enum: ['unverified', 'pending_upload', 'pending_approval', 'verified', 'rejected'],
      default: 'unverified',
    },
    nidFront: {
      type: String,
      default: null,
    },
    nidBack: {
      type: String,
      default: null,
    },
    selfie: {
      type: String,
      default: null,
    },
    verificationRejectionReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Method to verify passwords
userSchema.methods.matchPassword = async function (enteredPassword, bcrypt) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
