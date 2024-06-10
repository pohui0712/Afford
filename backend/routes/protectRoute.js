import express from "express";
import { verifyToken } from "../models/userModel.js";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.send("Access granted to protected route.");
});

export default router;
