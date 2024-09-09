import joi from "joi";
const addTaskVal = joi.object({
  title: joi.string().required(),
  desc: joi.string().required(),
  deadline: joi.date().required(),
  user: joi.string().hex().required(),
});
const editTaskVal = joi.object({
  id: joi.string().hex().required(),
  title: joi.string(),
  desc: joi.string(),
  deadline: joi.date(),
});
export { addTaskVal, editTaskVal };
