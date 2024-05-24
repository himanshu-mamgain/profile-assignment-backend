import mongoose, { Schema } from "mongoose";

const profileSchema = new mongoose.Schema({
  photo: {
    data: Buffer,
    name: String,
    size: Number,
    contentType: String,
  },
  skills: {
    type: [String],
    default: [],
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export = mongoose.model("Profile", profileSchema);
