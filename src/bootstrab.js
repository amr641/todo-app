import errorHandeller from "./middlewares/errors/globalHandelingErrors.js";
import { verfifyToken } from "./middlewares/tokenVerfication.js";
import { taskRouter } from "./modules/tasks/tasks.routes.js";
import { userRouter } from "./modules/user/user.routes.js";
import { appError } from "./utils/appError.js";

export const bootstrab = function (app) {
  app.use("/users", userRouter);
  app.use(verfifyToken);
  app.use("/tasks", taskRouter);
  app.use("*", (req, res, next) => {
    next(new appError("not found", 404));
  });
  app.use(errorHandeller);
};
