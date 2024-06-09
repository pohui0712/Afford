import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import config from "config";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 5, maxlength: 50, required: true },
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
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    contact: Joi.string().max(11).required(),
  });

  return schema.validate(user);
}

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

export const User = mongoose.model("User", userSchema);
