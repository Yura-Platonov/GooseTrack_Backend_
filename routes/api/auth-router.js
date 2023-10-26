import express from "express";

import authController from "../../controllers/auth-controller.js";

import * as userSchemas from "../../models/User.js";

import { validateBody } from "../../decorators/index.js";

import { authenticate, upload } from "../../middleware/index.js";

const authRouter = express.Router();

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);
const userEmailValidate = validateBody(userSchemas.userEmailSchema);
const userUpdateValidate = validateBody(userSchemas.userUpdateSchema);

authRouter.post("/register", userSignupValidate, authController.register);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post("/verify", userEmailValidate, authController.resendVerifyEmail);

authRouter.post("/login", userSigninValidate, authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch(
  "/update",
  authenticate,
  userUpdateValidate,
  upload.single("avatar"),
  authController.updateUser
);

authRouter.patch("/theme", authenticate, authController.updateTheme);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
