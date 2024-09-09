import User from "../../../database/models/userModel.js";
import { catchError } from "../../middlewares/errors/catchError.js";
import jwt from "jsonwebtoken";
import { appError } from "../../utils/appError.js";

const signUp = catchError(async (req, res) => {
  const user = await User.insertMany(req.body);
  res.status(201).json({ message: "success" });
});
const confirmEmail = catchError(async (req, res, next) => {
  jwt.verify(req.params.token, "awq", async (err, payload) => {
    if (err) return next(new appError("invalid token", 403));
    const user = await User.findOneAndUpdate(
      { email: payload.email },
      { confirmEmail: true }
    );
    res.status(200).json({
      message: "email confirmed successfully please login",
      email: user.email,
    });
  });
});

export { signUp, confirmEmail };
