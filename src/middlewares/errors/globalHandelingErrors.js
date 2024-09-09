const errorHandeller = (err, req, res, next) => {
  let statusCode = err.status || 500;
  res.status(statusCode).json({ message: err.message, stack: err.stack });
};
export default errorHandeller;
