import express from "express";
import {
  getAllPublishedBlogs,
  getAllDraftBlogs,
  createBlog,
  updateDraftToPublishedBlog,
  editPublishedBlog,
  editDraftBlog,
  getUserBlogs,
  deleteDraftBlog,
  deletePublishedBlog,
  getAllSearchPublishedBlogs,
  getSinglePublishBlog,
} from "../controllers/Blog.js";

const router = express();

router.get("/published", getAllPublishedBlogs);
router.get("/published/:id", getSinglePublishBlog);
router.get("/search", getAllSearchPublishedBlogs);
router.get("/all_user_blogs", getUserBlogs);
router.get("/draft", getAllDraftBlogs);
router.post("/create", createBlog);
router.patch("/draft_to_publish/update/:id", updateDraftToPublishedBlog);
router.patch("/edit/published/:id", editPublishedBlog);
router.patch("/edit/draft/:id", editDraftBlog);
router.delete("/delete/draft/:id", deleteDraftBlog);
router.delete("/delete/published/:id", deletePublishedBlog);

export default router;
