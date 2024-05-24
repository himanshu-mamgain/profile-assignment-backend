import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    require: false,
  },
  isVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: {
    type: String,
    required: false,
    default: () => new Date().toString(),
  },
});

export = mongoose.model("User", userSchema);
