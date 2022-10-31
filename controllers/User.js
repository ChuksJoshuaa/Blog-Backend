import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import Error from "../errors/index.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      // throw new Error.BadRequestError("Please provide email and password");
      res.status(401).json({ msg: "Please provide and password" });
      return;
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      // throw new Error.UnauthenticatedError("Invalid Credentials");
      res.status(401).json({ msg: "Invalid Credientials" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      // throw new Error.UnauthenticatedError("Invalid Credentials");
      res.status(401).json({ msg: "Invalid Credientials" });
      return;
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    // throw new Error.InternalServalError("Something went wrong, try again");
    res.status(500).json({ msg: "Something went wrong, try again" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, phoneNumber } =
    req.body;

  const existingUser = await User.findOne({ email });
  try {
    if (existingUser) {
      // throw new Error.BadRequestError("User already exists");
      res.status(400).json({ msg: "User already exists" });
      return;
    }

    if (password !== confirmPassword) {
      // throw new Error.BadRequestError("Password does not match");
      res.status(400).json({ msg: "Password does not match" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      mobile: phoneNumber,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    // throw new Error.InternalServalError("Something went wrong, try again");
    res.status(500).json({ msg: "Something went wrong, try again" });
  }
};
