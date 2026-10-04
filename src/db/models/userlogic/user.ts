import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    betterAuthId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    name: { // BETTERAUTHS NAME IS IRRELEVANT
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["owner", "member"], // OWNER WIRD NUR DANN GESETZT WENN GERADE DIE ORG ERSTELLT WIRD, sonst NIE
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);