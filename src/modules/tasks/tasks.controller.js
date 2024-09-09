import Task from "../../../database/models/tasksModel.js";
import { catchError } from "../../middlewares/errors/catchError.js";

const addTask = catchError(async (req, res) => {
  await Task.insertMany(req.body);
  res.status(201).json({ message: "success" });
});
// get user tasks
const getMyTasks = catchError(async (req, res) => {
  const { userId } = req.user;
  const tasks = await Task.find({ user: userId }, { user: 0 }).sort("deadline");
  res.status(200).json({ message: "success", tasks });
});
// edit tasks
const editTask = catchError(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body);
  res.status(201).json({ message: "success", task });
});
// delete task
const deleteTask = catchError(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  res.status(201).json({ message: "success", task });
});

export { addTask, getMyTasks, editTask, deleteTask };
