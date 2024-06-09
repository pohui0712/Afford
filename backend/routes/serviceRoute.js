import express from "express";
import { Service } from "../models/serviceModel.js";

const router = express.Router();

// POST is not require for this route, it is done in bookingRoute

// Route for GET ALL services
router.get("/", async (request, response) => {
  try {
    const services = await Service.find();
    return response.status(200).json({
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for GET ONE service
router.get("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const service = await Service.findById(id);

    if (!service) {
      return response.status(404).json({ message: "service not found" });
    }
    return response.status(200).json({
      data: service,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for UPDATE a service
router.patch("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const updateObject = {
      serviceName: request.body.serviceName,
      remark: request.body.remark,
      progress: request.body.progress,
    };

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { $set: updateObject },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return response.status(404).json({ message: "Service not found" });
    }

    return response
      .status(200)
      .send({ message: "Update successful", data: updatedService });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for DELETE a booking
router.delete("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const result = await Service.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Service not found" });
    }

    return response
      .status(200)
      .send({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});
export default router;
