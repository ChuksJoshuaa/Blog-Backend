import Blog from "../models/Blog.js";
import StatusCodes from "http-status-codes";
import mongoose from "mongoose";
import Error from "../errors/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//Get all published blogs
export const getAllPublishedBlogs = async (req, res) => {
  try {
    const publishedBlog = await Blog.find({})
      .where("state")
      .equals("published");
    res.status(StatusCodes.OK).json({ data: publishedBlog });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "No published blogs" });
  }
};

//Get all draft blogs
export const getAllDraftBlogs = async (req, res) => {
  try {
    const draftBlog = await Blog.find({}).where("state").equals("draft");
    res.status(StatusCodes.OK).json({ data: draftBlog });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "No draft blogs" });
  }
};

// create blog
export const createBlog = async (req, res) => {
  const blog = req.body;

  const { title, description, body, tags } = blog;

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ msg: "Authentication is not correct" });
  }
  const token = authHeader.split(" ")[1];

  let decodedData = "";
  if (token !== undefined || token !== null) {
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
    decodedData = decodedData?.id;
  }

  try {
    if (decodedData === undefined || decodedData === null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid User or no user signed in yet" });
    }
    if (title === "" || description === "" || body === "" || tags === "") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Incomplete fields" });
    } else {
      const newBlog = new Blog({
        ...blog,
        author: decodedData,
        createdAt: new Date().toISOString(),
      });
      await newBlog.save();
      res.status(StatusCodes.CREATED).json({ newBlog });
    }
  } catch (error) {
    res
      .status(StatusCodes.CONFLICT)
      .json({ msg: "New blog cannot be created. try again" });
  }
};

//Update blog in draft state to published state
export const updateDraftToPublishedBlog = async (req, res) => {
  const { id: _id } = req.params;
  const blog = req.body;

  const { state } = blog;

  if (state === "") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "state field is empty." });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(StatusCodes.NOT_FOUND).send(`No blog with id: ${_id}`);
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(
      _id,
      { ...blog, state },
      {
        new: true,
        runValidators: true,
      }
    )
      .where("state")
      .equals("draft");
    res.status(200).json(updatedBlog);
  }
};

//edit draft
export const editDraftBlog = async (req, res) => {
  const { id: _id } = req.params;
  const blog = req.body;
  const { title, tags, description, body } = blog;

  if (title === "" || description === "" || body === "" || tags === "") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Incomplete fields" });
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(StatusCodes.NOT_FOUND).send(`No blog with id: ${_id}`);
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(
      _id,
      { title, tags, description, body },
      {
        new: true,
        runValidators: true,
      }
    )
      .where("state")
      .equals("draft");
    res.status(200).json(updatedBlog);
  }
};

//Edit blog in published state
export const editPublishedBlog = async (req, res) => {
  const { id: _id } = req.params;
  const blog = req.body;
  const { title, tags, description, body } = blog;

  if (title === "" || description === "" || body === "" || tags === "") {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Incomplete fields" });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(StatusCodes.NOT_FOUND).send(`No blog with id: ${_id}`);
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(
      _id,
      { title, tags, description, body },
      {
        new: true,
        runValidators: true,
      }
    )
      .where("state")
      .equals("published");
    res.status(200).json(updatedBlog);
  }
};
