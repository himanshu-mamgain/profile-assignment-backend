import mongoose, { Schema } from "mongoose";

const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  designation: {
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "userId",
    required: true
  }
});

export = mongoose.model("Experience", experienceSchema);
