import express from "express";
import { Booking } from "../models/bookingModel.js";

const router = express.Router();

// Route for POST a new user
router.post("/", async (request, response) => {
  try {
    const {
      carPlate,
      carModel,
      remarks,
      time,
      date,
      dealer,
      services,
      userId,
    } = request.body;

    if (
      !carPlate ||
      !carModel ||
      !time ||
      !date ||
      !dealer ||
      !services ||
      !userId
    ) {
      return response.status(400).send({
        message: "All the fields are required.",
      });
    }

    const newBooking = {
      carPlate,
      carModel,
      remarks,
      time,
      date,
      dealer,
      services,
      user: userId,
    };

    const data = await Booking.create(newBooking);
    return response.status(201).send(data);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
