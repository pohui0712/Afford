import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import { User } from "./models/userModel.js";

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

// Route for POST a new user
app.post("/users", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.password ||
      !request.body.contact
    ) {
      return response.status(400).send({
        message: "All the fileds is required.",
      });
    }
    const newUser = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      contact: request.body.contact,
    };
    const data = await User.create(newUser);
    return response.status(201).send(data);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for GET ALL users
app.get("/users", async (request, response) => {
  try {
    const users = await User.find();
    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for GET ONE user
app.get("/users/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const users = await User.findById(id);
    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for UPDATE
app.patch("/users/:id", async (request, response) => {
  const { id } = request.params;
  const updateObject = request.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: updateObject },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return response.status(404).json({ message: "User not found" });
    }

    return response
      .status(200)
      .send({ message: "Update successfully", user: updateUser });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//Route for DELETE
app.delete("/users/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const result = await User.findOneAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).send({ message: "User delete successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});
