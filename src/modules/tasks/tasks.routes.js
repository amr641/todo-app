import { Router } from "express";
import validate from "../../middlewares/validate.js";
import { addTaskVal, editTaskVal } from "./tasks.validation.js";
import * as tc from "./tasks.controller.js";
import { authTask } from "../../middlewares/auth.js";

export const taskRouter = Router();
// add task
taskRouter.post("/", validate(addTaskVal), tc.addTask);
taskRouter.get("/", tc.getMyTasks);
taskRouter.patch("/:id", validate(editTaskVal), authTask, tc.editTask);
taskRouter.delete("/:id", authTask, tc.deleteTask);
