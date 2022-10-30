import StatusCodes from "http-status-codes";
import CustomAPI from "./custom-api.js";

class InternalServalError extends CustomAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

const InternalServer = InternalServalError;

export default InternalServer;
