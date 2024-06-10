import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import inventoryRouter from "./routes/inventoryRoute.js";
import serviceRouter from "./routes/serviceRoute.js";
import authRouter from "./routes/authRoute.js";
import appServiceRouter from "./routes/appServiceRoute.js";
import config from "config";

import { AppointmentService } from "./models/appService.js";
import { Admin } from "./models/adminModel.js";
import { Mechanic } from "./models/mechanicModel.js";

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}
// Middleware for pasesing JSON request body
app.use(express.json());

/// Middleware for handling CORS policy
app.use(cors());

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connect databse successfully.");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (request, response) => {
  return response.status(200).send("Connected.");
});

app.use("/users", userRouter);

app.use("/booking", bookingRouter);

app.use("/inventory", inventoryRouter);

app.use("/service", serviceRouter);

app.use("/appointmentService", appServiceRouter);

app.use("/auth", authRouter);

// async function listBooking() {
//   const data = await Booking.find()
//     .populate("admin", "email")
//     .populate("user", "name");
//   console.log(data);
// }
// listBooking();

// async function createBooking(booking, service, mechanic, inventory) {
//   const appService = new AppointmentService({
//     booking,
//     service,
//     mechanic,
//     inventory,
//   });

//   await appService.save();
// }

// createBooking(
//   "6661a438773422291891ade5",
//   "6661a22d9ddda088194a9ccd",
//   "66619d4a54a021ef58674977",
//   "6661a08e69ce8709ee0dd850"
// );

// async function listAll() {
//   const data = await AppointmentService.find()
//     .populate({
//       path: "booking",
//       populate: [
//         { path: "user", model: "User" },
//         { path: "admin", model: "Admin" },
//       ],
//     })
//     .populate("service")
//     .populate("mechanic")
//     .populate("inventory");
//   console.log(data);
// }
// listAll();

// app.get("/all", async (request, response) => {
//   try {
//     const all = await AppointmentService.find()
//       .populate({
//         path: "booking",
//         populate: [
//           { path: "user", model: "User" },
//           { path: "admin", model: "Admin" },
//         ],
//       })
//       .populate("service")
//       .populate("mechanic")
//       .populate("inventory");
//     return response.status(200).json({
//       count: all.length,
//       data: all,
//     });
//   } catch (error) {
//     console.error(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// async function listUser() {
//   const data = await User.find();
//   console.log(data);
// }

// listUser();

// async function createAdmin(email, password) {
//   const admin = new Admin({
//     email,
//     password,
//   });

//   const result = await admin.save();
//   console.log(result);
// }

// createAdmin("admin@gmail.com", "admin123");

// async function createMechanic(email, password) {
//   const mechanic = new Mechanic({
//     email,
//     password,
//   });

//   const result = await mechanic.save();
//   console.log(result);
// }
// createMechanic("mechanic@gmail.com", "mechanic123");

// async function createInventory() {
//   const inventory = new Inventory({
//     inventory: [
//       { carPart: "Tyre", quantity: 10, price: "RM500" },
//       { carPart: "Baterry", quantity: 1, price: "RM100" },
//     ],
//   });

//   const result = await inventory.save();
//   console.log(result);
// }

// createInventory();

// async function createService(serviceName) {
//   const service = new Service({
//     serviceName,
//   });

//   const result = await service.save();
//   console.log(result);
// }

// createService(["battery replacement", "brake system", "suspension"]);

// async function createBooking(
//   carPlate,
//   carModel,
//   time,
//   date,
//   mileage,
//   admin,
//   user
// ) {
//   const booking = new Booking({
//     carPlate,
//     carModel,
//     time,
//     date,
//     mileage,
//     admin,
//     user,
//   });

//   const result = await booking.save();
//   console.log(result);
// }

// createBooking(
//   "SYP 630",
//   "Ranger",
//   "9 am",
//   "6 June 2024",
//   "10000",
//   "66619cd39e8645bb07eef999",
//   "666117db1d9744606d86cb24"
// );

// async function createUser(name, email, password, contact) {
//   const user = new User({
//     name,
//     email,
//     password,
//     contact,
//   });

//   const result = await user.save();
//   console.log(result);
// }
// createUser("TAN PO HUI", "ph123@gmail.com", "ph123", "01234567890");
