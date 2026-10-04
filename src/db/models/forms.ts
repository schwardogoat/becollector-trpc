import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    data: {
      type: String,
      required: true,
    },
    publicdata: {
      type: String,
      required: true,
    },
    org: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  {
    timestamps: true,
  }
);

export const Form = mongoose.model("Form", formSchema);