import express from "express";
import { AppointmentService } from "../models/appService.js";

const router = express.Router();

// POST method is not required

// Route for GET ALL bookings
router.get("/", async (request, response) => {
  try {
    // const appService = await AppointmentService.find()
    //   .populate({
    //     path: "booking",
    //     populate: [
    //       { path: "user", model: "User" },
    //       { path: "admin", model: "Admin" },
    //     ],
    //   })
    //   .populate("service")
    //   .populate("mechanic")
    //   .populate("inventory");
    const appService = await AppointmentService.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "booking",
          foreignField: "_id",
          as: "booking",
        },
      },
      { $unwind: "$booking" },
      {
        $lookup: {
          from: "users",
          localField: "booking.user",
          foreignField: "_id",
          as: "booking.user",
        },
      },
      { $unwind: "$booking.user" },
      {
        $lookup: {
          from: "admins",
          localField: "booking.admin",
          foreignField: "_id",
          as: "booking.admin",
        },
      },
      { $unwind: "$booking.admin" },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: "$service" },
      {
        $lookup: {
          from: "mechanics",
          localField: "mechanic",
          foreignField: "_id",
          as: "mechanic",
        },
      },
      { $unwind: "$mechanic" },
      {
        $lookup: {
          from: "inventories",
          localField: "inventory",
          foreignField: "_id",
          as: "inventory",
        },
      },
      { $unwind: { path: "$inventory", preserveNullAndEmptyArrays: true } },
      { $sort: { "booking.createdTime": -1 } },
    ]);
    return response.status(200).json({
      count: appService.length,
      appService,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get ALL except "status : completed"
router.get("/exCompleted", async (request, response) => {
  try {
    const appService = await AppointmentService.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "booking",
          foreignField: "_id",
          as: "booking",
        },
      },
      { $unwind: "$booking" },
      {
        $match: {
          "booking.status": { $ne: "completed" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "booking.user",
          foreignField: "_id",
          as: "booking.user",
        },
      },
      { $unwind: "$booking.user" },
      {
        $lookup: {
          from: "admins",
          localField: "booking.admin",
          foreignField: "_id",
          as: "booking.admin",
        },
      },
      { $unwind: "$booking.admin" },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: "$service" },
      {
        $lookup: {
          from: "mechanics",
          localField: "mechanic",
          foreignField: "_id",
          as: "mechanic",
        },
      },
      { $unwind: "$mechanic" },
      {
        $lookup: {
          from: "inventories",
          localField: "inventory",
          foreignField: "_id",
          as: "inventory",
        },
      },
      { $unwind: { path: "$inventory", preserveNullAndEmptyArrays: true } },
      { $sort: { "booking.createdTime": -1 } },
    ]);
    return response.status(200).json({
      count: appService.length,
      appService,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/completed", async (request, response) => {
  try {
    const appService = await AppointmentService.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "booking",
          foreignField: "_id",
          as: "booking",
        },
      },
      { $unwind: "$booking" },
      {
        $match: {
          "booking.status": "completed",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "booking.user",
          foreignField: "_id",
          as: "booking.user",
        },
      },
      { $unwind: "$booking.user" },
      {
        $lookup: {
          from: "admins",
          localField: "booking.admin",
          foreignField: "_id",
          as: "booking.admin",
        },
      },
      { $unwind: "$booking.admin" },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: "$service" },
      {
        $lookup: {
          from: "mechanics",
          localField: "mechanic",
          foreignField: "_id",
          as: "mechanic",
        },
      },
      { $unwind: "$mechanic" },
      {
        $lookup: {
          from: "inventories",
          localField: "inventory",
          foreignField: "_id",
          as: "inventory",
        },
      },
      { $unwind: { path: "$inventory", preserveNullAndEmptyArrays: true } },
      { $sort: { "booking.createdTime": -1 } },
    ]);
    return response.status(200).json({
      count: appService.length,
      appService,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get All approved data for mechanist
router.get("/mechanist", async (req, res) => {
  try {
    const appService = await AppointmentService.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "booking",
          foreignField: "_id",
          as: "booking",
        },
      },
      { $unwind: "$booking" },
      {
        $lookup: {
          from: "users",
          localField: "booking.user",
          foreignField: "_id",
          as: "booking.user",
        },
      },
      { $unwind: "$booking.user" },
      {
        $lookup: {
          from: "admins",
          localField: "booking.admin",
          foreignField: "_id",
          as: "booking.admin",
        },
      },
      { $unwind: "$booking.admin" },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: "$service" },
      {
        $lookup: {
          from: "mechanics",
          localField: "mechanic",
          foreignField: "_id",
          as: "mechanic",
        },
      },
      { $unwind: "$mechanic" },
      {
        $lookup: {
          from: "inventories",
          localField: "inventory",
          foreignField: "_id",
          as: "inventory",
        },
      },
      { $unwind: { path: "$inventory", preserveNullAndEmptyArrays: true } },
      {
        $match: {
          "booking.status": "approved",
        },
      },
      { $sort: { "booking.createdTime": -1 } },
    ]);

    return res.status(200).json({ count: appService.length, appService });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
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
