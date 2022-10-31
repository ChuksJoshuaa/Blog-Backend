import express from "express";
import {
  getAllPublishedBlogs,
  getAllDraftBlogs,
  createBlog,
} from "../controllers/Blog.js";

const router = express();

router.get("/published", getAllPublishedBlogs);
router.get("/draft", getAllDraftBlogs);
router.post("/create", createBlog);

export default router;
