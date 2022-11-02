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
  blogReadCount,
} from "../controllers/Blog.js";

const router = express();

//Get requests
router.get("/published", getAllPublishedBlogs);
router.get("/published/:id", getSinglePublishBlog);
router.get("/search", getAllSearchPublishedBlogs);
router.get("/all_user_blogs", getUserBlogs);
router.get("/draft", getAllDraftBlogs);

//Post requests
router.post("/create", createBlog);

//Patch requests
router.patch("/draft_to_publish/update/:id", updateDraftToPublishedBlog);
router.patch("/edit/published/:id", editPublishedBlog);
router.patch("/edit/draft/:id", editDraftBlog);
router.patch("/read_count/:id", blogReadCount);

//Delete requests
router.delete("/delete/draft/:id", deleteDraftBlog);
router.delete("/delete/published/:id", deletePublishedBlog);

export default router;
