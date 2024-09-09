import { appError } from "../utils/appError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      { ...req.body, ...req.params },
      { abortEarly: false }
    );
    if (!error) return next();
    const errors = error?.details.map((ele) => ele.message);
    next(new appError(errors, 403));
  };
};
export default validate;
