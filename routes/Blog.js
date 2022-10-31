import express from "express";
import {
  getAllPublishedBlogs,
  getAllDraftBlogs,
  createBlog,
  updateDraftBlog,
  updatePublishedBlog,
} from "../controllers/Blog.js";

const router = express();

router.get("/published", getAllPublishedBlogs);
router.get("/draft", getAllDraftBlogs);
router.post("/create", createBlog);
router.patch("/draft/update/:id", updateDraftBlog);
router.patch("/published/update/:id", updatePublishedBlog);

export default router;
