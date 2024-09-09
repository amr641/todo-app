import { Schema, Types, model } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: "non",
  },
  deadline: {
    type: Date,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
});
const Task = model("Task", taskSchema);
export default Task;
