import StatusCodes from "http-status-codes";
import CustomAPI from "./custom-api.js";

class BadRequestError extends CustomAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

const BadRequest = BadRequestError;

export default BadRequest;
