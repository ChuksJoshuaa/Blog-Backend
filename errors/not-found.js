import StatusCodes from "http-status-codes";

import CustomAPI from "./custom-api.js";

class NotFoundError extends CustomAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

const NotFound = NotFoundError;
export default NotFound;
