import mongoose from "mongoose";

const serviceModel = new mongoose.Schema(
  {
    serviceName: [{ type: String, required: true }],
    remark: { type: String, default: "" },
    progress: { type: Number, default: 0 },
  },
  { versionKey: false }
);

export const Service = mongoose.model("Service", serviceModel);
