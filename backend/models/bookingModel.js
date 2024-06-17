import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    carPlate: { type: String, required: true },
    carModel: { type: String, required: true },
    remark: { type: String, default: "" },
    time: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, default: "pending" },
    mileage: { type: Number, required: true },
    createdTime: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: "667041d480e08e7044225f71",
    },
  },
  { versionKey: false }
);

bookingSchema.index(
  { user: 1, carPlate: 1, date: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["pending", "completed", "in_progress"] },
    },
  }
);

export const Booking = mongoose.model("Booking", bookingSchema);
