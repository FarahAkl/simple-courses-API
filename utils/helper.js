const SUCCESS = "success";
const FAIL = "fail";
const ERROR = "error";

class appError extends Error {
  constructor(message, statusCode, statusText) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}

export { SUCCESS, FAIL, ERROR, appError };
