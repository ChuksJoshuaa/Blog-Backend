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
      throw new Error.BadRequest("Please provide email and password");
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error.Unauthenticated("Invalid Credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      throw new Error.Unauthenticated("Invalid Credentials");
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    throw new Error.InternalServer("Something went wrong");
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, phoneNumber } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error.BadRequest("User already exists");
    }

    if (password !== confirmPassword) {
      throw new Error.BadRequest("Password does not match");
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
    throw new Error.InternalServer("Something went wrong");
  }
};
