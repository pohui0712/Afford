import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const router = express.Router();

router.post("/", async (request, response) => {
  const { error } = validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: request.body.email });
  if (!user) return response.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(
    request.body.password,
    user.password
  );

  if (!validPassword)
    return response.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  response.send({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
    },
  });
});

function validate(request) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(request);
}

export default router;
