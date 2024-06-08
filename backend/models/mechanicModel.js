import mongoose from "mongoose";

const mechanicSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

export const Mechanic = mongoose.model("Mechanic", mechanicSchema);
