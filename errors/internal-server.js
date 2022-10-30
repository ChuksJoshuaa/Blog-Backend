import StatusCodes from "http-status-codes";
import CustomAPIError from "./custom-api.js";

export default class InternalServalError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
