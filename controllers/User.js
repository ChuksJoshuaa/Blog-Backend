import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ status: "ok", msg: "Please provide email and password" });
    }

    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        email: oldUser.email,
        password: oldUser.password,
        id: oldUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};

export const signup = async (req, res) => {
  const { email, phoneNumber, firstName, lastName, password, confirmPassword } =
    req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(404).json({ msg: "User already exist" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password does not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      mobile: phoneNumber,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};
