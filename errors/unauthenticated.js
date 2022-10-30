import StatusCodes from "http-status-codes";
import CustomAPI from "./custom-api.js";

class UnauthenticatedError extends CustomAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

const Unauthenticated = UnauthenticatedError;
export default Unauthenticated;
