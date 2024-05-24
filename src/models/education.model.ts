import mongoose, { Schema } from "mongoose";

const educationSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  startYear: {
    type: String,
    required: true,
  },
  endYear: {
    type: String,
    required: true,
  },
  percentage: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export = mongoose.model("Education", educationSchema);
