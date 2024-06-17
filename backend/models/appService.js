import mongoose from "mongoose";

const appointmentServiceSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mechanic",
      default: "667041f5eb8f531e8a3e5497",
    },
    inventory: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
  },
  { versionKey: false }
);

export const AppointmentService = mongoose.model(
  "AppointmentService",
  appointmentServiceSchema
);
