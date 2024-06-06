import express from "express";
import { Booking } from "../models/bookingModel.js";
import mongoose from "mongoose";

const router = express.Router();

// Route for POST a new user
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.carPlate ||
      !request.body.carModel ||
      !request.body.time ||
      !request.body.date ||
      !request.body.currentMileage ||
      !request.body.services ||
      !request.body.user
    ) {
      return response.status(400).send({
        message: "All the fields are required.",
      });
    }
    const servicesArray = request.body.services.map((service) => ({
      name: service,
    }));

    const newBooking = {
      carPlate: request.body.carPlate,
      carModel: request.body.carModel,
      remark: request.body.body,
      time: request.body.time,
      date: request.body.date,
      currentMileage: request.body.currentMileage,
      services: servicesArray,
      user: request.body.user,
    };

    const data = await Booking.create(newBooking);
    return response.status(201).send(data);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for GET ALL bookings
router.get("/", async (request, response) => {
  try {
    const bookings = await Booking.find().populate("user");
    return response.status(200).json({
      count: bookings.length,
      data: bookings,
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
    const booking = await Booking.findById(id).populate("user");
    if (!booking) {
      return response.status(404).json({ message: "Booking not found" });
    }
    return response.status(200).json({
      data: booking,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for UPDATE a booking
router.patch("/:id", async (request, response) => {
  const { id } = request.params;
  // const updateObject = request.body;

  try {
    const servicesArray = request.body.services.map((service) => ({
      name: service,
    }));

    const updateObject = {
      carPlate: request.body.carPlate,
      carModel: request.body.carModel,
      remark: request.body.body,
      time: request.body.time,
      date: request.body.date,
      currentMileage: request.body.currentMileage,
      services: servicesArray,
      user: request.body.user,
    };

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: updateObject },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return response.status(404).json({ message: "Booking not found" });
    }

    return response
      .status(200)
      .send({ message: "Update successful", data: updatedBooking });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for DELETE a booking
router.delete("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const result = await Booking.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Booking not found" });
    }

    return response
      .status(200)
      .send({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default router;
