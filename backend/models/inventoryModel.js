import mongoose from "mongoose";

const carPartSchema = new mongoose.Schema({
  carPart: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: String, required: true },
});

const inventorySchema = new mongoose.Schema(
  { inventory: { type: [carPartSchema] } },
  { versionKey: false }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);
