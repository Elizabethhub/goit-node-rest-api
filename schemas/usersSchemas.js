import Joi from "joi";
import { emailRegexp } from "../constants/regexp.js";

export const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(), // email() will has different validation than indicated in Schema for email, that's why pattern() is better
  password: Joi.string().min(6).required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(), // email() will has different validation than indicated in Schema for email, that's why pattern() is better
  password: Joi.string().min(6).required(),
});
