class ApiErrors extends Error {
  constructor(statusCode, message, error = [], stack = "") {
    super(message); 
    this.data = null;
    this.statusCode = statusCode;
    this.error = error;

    if (stack) {
      this.stack = stack; 
    } else {
      Error.captureStackTrace(this, this.constructor); 
    }
  }
}
module.exports = ApiErrors;