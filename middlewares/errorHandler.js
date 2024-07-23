module.exports = function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Internal server error";
  let errors = null;

  switch (err.name) {
    case "InvalidInputEmailPass":
      status = 400;
      message = "email / password is required";
      break;
    case "InvalidLogin":
      status = 401;
      message = "error invalid username / password";
      break;
    case "SequelizeValidationError":
      status = 400;
      errors = err.errors.map((err) => err.message);
      message = errors;
      break;
    case "NotFound":
      status = 404;
      message = "Error not found";
      break;
    case "ValidationErrorItem":
      status = 400;
      errors = err.errors.map((err) => err.message);
      message = errors;
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "Forbidden":
      status = 403;
      message = "Forbidden access";
      break;
    case "Invalid Token":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      break;

    case "Admin Only":
      status = 403;
      message = "Sorry, you're not a admin!";
      break;

    case "Not Login":
      status = 401;
      message = "Invalid login!";
      break;
  }
  res.status(status).json({message});
};
