import express from "express";

import authController from "../controllers/authController.js";

import validateBody from "../decorators/validateBody.js";

import { signupSchema, signinSchema, updateSubscriptionSchema } from "../schemas/usersSchemas.js";

import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(signupSchema), authController.signup);

authRouter.post("/login", validateBody(signinSchema), authController.signin);

authRouter.post("/logout", authenticate, authController.signout);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch("/", authenticate, validateBody(updateSubscriptionSchema), authController.updateSubscription);

export default authRouter;
