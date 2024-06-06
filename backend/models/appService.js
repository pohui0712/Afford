import mongoose from "mongoose";

const appointmentServiceSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    mechanic: { type: mongoose.Schema.Types.ObjectId, ref: "Mechanic" },
    inventory: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory" },
  },
  { versionKey: false }
);

export const AppointmentService = mongoose.model(
  "AppointmentService",
  appointmentServiceSchema
);
