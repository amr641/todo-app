import User from "../../database/models/userModel.js";
import { sendEmail } from "../email/email.js";
import { appError } from "../utils/appError.js";
import { catchError } from "./errors/catchError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Task from "../../database/models/tasksModel.js";

const checkEmail = catchError(async (req, res, next) => {
  const emailExistence = await User.findOne({ email: req.body.email });
  if (emailExistence)
    return next(new appError("email already exist please sign in", 409));
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  sendEmail(req.body.email);
  next();
});
const logIn = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new appError("incorrect email or password", 401));

  jwt.sign(
    { userId: user.id, name: user.userName, confirmEmail: user.confirmEmail },
    process.env.JWT_KEY,
    (error, token) => {
      return user.confirmEmail
        ? res.status(200).json({ message: "logged in", token })
        : res.status(200).json({
            message: "logged in",
            emailConfirmation:
              "you have to confirm your email to access our services",
            token,
          });
    }
  );
});
const authTask = catchError(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) return next(new appError("task not found", 404));
  else if (task.user != req.user.userId) {
    return next(new appError("un authorized task", 403));
  }
  next();
});
export { checkEmail, logIn, authTask };
