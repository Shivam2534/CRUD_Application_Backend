import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    Team_name: {
      type: String,
      required: [true, "Team Name is a Required Field"],
    },
    Team_Id: {
      type: Number,
      required: [true, "Team Name is a Required Field"],
    },
    Team_mambers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Team = mongoose.model("Team", teamSchema);
