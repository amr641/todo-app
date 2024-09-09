import { Router } from "express";
import * as uc from "./user.controller.js";
import { checkEmail, logIn } from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import { loginSchema, signUpSchema } from "./userValidation.js";

export const userRouter = Router();
userRouter.post("/signUp", validate(signUpSchema), checkEmail, uc.signUp);
userRouter.post("/logIn", validate(loginSchema), logIn);
userRouter.get("/confirmEmail/:token", uc.confirmEmail);
