import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmEmail: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    values: ["user", "admin"],
    default: "user",
  },
});
const User = model("User", userSchema);
export default User;
