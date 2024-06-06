import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    carPart: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: String, required: true },
  },
  { versionKey: false }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);
