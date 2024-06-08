import express from "express";
import { AppointmentService } from "../models/appService.js";

const router = express.Router();

// POST method is not required

// Route for GET ALL bookings
router.get("/", async (request, response) => {
  try {
    const appService = await AppointmentService.find()
      .populate("booking")
      .populate("service")
      .populate("mechanic")
      .populate("inventory");
    return response.status(200).json({
      count: appService.length,
      data: appService,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for GET ONE booking
router.get("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const appService = await AppointmentService.findById(id)
      .populate("booking")
      .populate("service")
      .populate("mechanic")
      .populate("inventory");
    if (!appService) {
      return response.status(404).json({ message: "Composite data not found" });
    }
    return response.status(200).json({
      data: appService,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});
export default router;
