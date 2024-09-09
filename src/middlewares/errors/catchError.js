import { appError } from "../../utils/appError.js";

export const catchError = function (fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      next(new appError(error.message));
    });
  };
};
