import express from "express";
import {
  getAllPublishedBlogs,
  getAllDraftBlogs,
  createBlog,
  updateDraftToPublishedBlog,
  editPublishedBlog,
  editDraftBlog,
} from "../controllers/Blog.js";

const router = express();

router.get("/published", getAllPublishedBlogs);
router.get("/draft", getAllDraftBlogs);
router.post("/create", createBlog);
router.patch("/draft_to_publish/update/:id", updateDraftToPublishedBlog);
router.patch("/edit/published/:id", editPublishedBlog);
router.patch("/edit/draft/:id", editDraftBlog);

export default router;
