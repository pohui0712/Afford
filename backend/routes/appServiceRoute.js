import express from "express";
import { AppointmentService } from "../models/appService.js";

const router = express.Router();

// POST method is not required

// Route for GET ALL bookings
router.get("/", async (request, response) => {
  try {
    const appService = await AppointmentService.find()
      .populate({
        path: "booking",
        populate: [
          { path: "user", model: "User" },
          { path: "admin", model: "Admin" },
        ],
      })
      .populate("service")
      .populate("mechanic")
      .populate("inventory")
      .sort({ createdAt: -1 })
      .limit(8);
    return response.status(200).json({
      appService,
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
      .populate({
        path: "booking",
        populate: [
          { path: "user", model: "User" },
          { path: "admin", model: "Admin" },
        ],
      })
      .populate("service")
      .populate("mechanic")
      .populate("inventory");
    if (!appService) {
      return response.status(404).json({ message: "Composite data not found" });
    }
    return response.status(200).json({
      appService,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});
// Get the info by user's id
router.get("/user/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const data = await AppointmentService.find()
      .populate({
        path: "booking",
        match: { user: id }, // Use the user ID to match
        populate: [
          {
            path: "user",
            model: "User",
          },
          { path: "admin", model: "Admin" },
        ],
      })
      .populate("service")
      .populate("mechanic")
      .populate("inventory");

    // Filter out any appointments where the booking did not match the user ID
    const appService = data.filter((d) => d.booking);

    if (!appService.length) {
      return response.status(404).json({
        message: "No appointment services found for the specified user",
      });
    }

    return response.status(200).json({
      appService,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
