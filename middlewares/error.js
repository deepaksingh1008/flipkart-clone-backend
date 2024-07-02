const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  console.log("Error");
  err.statusCode = 500;
  err.message = err.message || "Internal Server Error";

  // Handle Mongoose ObjectId Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Handle Wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid, try again";
    err = new ErrorHandler(message, 400);
  }

  // Handle Expired JWT Error
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is expired, try again";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
