import jwt from "jsonwebtoken";
import Error from "../errors/index.js";

const Auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      // throw new Error.UnauthenticatedError("Authentication Invalid");
      res.status(401).json({ msg: "Authentication Invalid" });
      return;
    }
    const token = authHeader.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    // throw new Error.UnauthenticatedError("Authentication Invalid");
    res.status(401).json({ msg: "Authentication Invalid" });
  }
};

export default Auth;
