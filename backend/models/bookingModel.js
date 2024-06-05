import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    carPlate: { type: String, required: true },
    carModel: { type: String, required: true },
    remarks: { type: String },
    time: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, default: "pending" },
    dealer: { type: String, required: true },
    services: [{ type: String, required: true }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  },
  { versionKey: false }
);

export const Booking = mongoose.model("Booking", bookingSchema);
