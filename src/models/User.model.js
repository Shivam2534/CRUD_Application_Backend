import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    id:{
      type: Number,
      required: true,
      unique: true
    },
    first_name: {
      type: String,
      required: [true, "First Name is a Rquired field"],
      lowercase: true,
      trim: true,
      index: true,
    },
    last_name: {
      type: String,
      required: [true, "Last Name is a Rquired field"],
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is a Rquired field"],
      unique: true
    },
    gender:{
        type: String,
        required: [true, "Gender is a Required field"]
    },
    avatar: {
      type: String, // we are using cloudnary url
      required: [true, "Avatar is a Required field"],
    },
    domain: {
      type: String,
      required: [true, "Domain is a Required field"]
    },
    available: {
      type: Boolean,
      required: [true, "Availablity is a Required field"]
    },
  },
  { timestamps: true }
);



export const User = mongoose.model("User", userschema);
