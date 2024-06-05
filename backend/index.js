import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoute.js";

const app = express();

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
