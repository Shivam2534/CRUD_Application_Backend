
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message); 
    this.statusCode = statusCode;
    this.data = null; 
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) { // learn more about it....
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
