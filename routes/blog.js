import express from "express";
import { getBlogStats, getSerchResult } from "../controller/blog.js"

const router = express.Router();

router.route("/api/blog-stats").get(getBlogStats)
router.route("/api/blog-search").get(getSerchResult)

export default router;