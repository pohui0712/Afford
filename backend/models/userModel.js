import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import config from "config";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 50, required: true },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
      unique: true,
    },
    password: { type: String, minlength: 5, maxlength: 1024, required: true },
    contact: { type: String, maxlength: 11, required: true },
  },
  { versionKey: false }
);

// validate new user
export function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    contact: Joi.string().max(11).required(),
  });

  return schema.validate(user);
}

export function validateUpdateUser(user) {
  const schema = Joi.object({
    name: Joi.string().max(50),
    email: Joi.string().min(5).max(255).email(),
    password: Joi.string().min(5).max(255),
    contact: Joi.string().max(11),
  });

  return schema.validate(user);
}

userSchema.methods.generateAuthToken = function () {
  // const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
  return token;
};

export function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    // const decoded = jwt.verify(
    //   token.split(" ")[1],
    //   config.get("jwtPrivateKey")
    // );
    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_PRIVATE_KEY
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

export const User = mongoose.model("User", userSchema);
