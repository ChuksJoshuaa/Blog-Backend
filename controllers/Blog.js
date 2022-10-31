import Blog from "../models/Blog.js";
import StatusCodes from "http-status-codes";
import Error from "../errors/index.js";

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
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "No draft blogs available yet" });
  }
};

// create blog
export const createBlog = async (req, res) => {
  const blog = req.body;

  const { title, description, body } = blog;

  try {
    if (title === "" || description === "" || body === "") {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "Incomplete fields" });
    } else {
      const newBlog = new Blog({
        ...blog,
        author: req.userId,
        createdAt: new Date().toISOString(),
      });
      await newBlog.save();
      res.status(StatusCodes.CREATED).json({ newBlog });
    }
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.msg });
  }
};

// Update blog from draft state to published
