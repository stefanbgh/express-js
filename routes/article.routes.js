import express from "express";
import {
	getArticles,
	addArticle,
	getSingleArticle,
	updateArticle,
	deleteArticle,
} from "../controllers/article.controller.js";
import verifyRole from "../utils/verifyRole.js";

const router = express.Router();

router.get("/", getArticles);
router.post("/", verifyRole, addArticle);
router.get("/:id", getSingleArticle);
router.put("/:id", verifyRole, updateArticle);
router.delete("/:id", verifyRole, deleteArticle);

export default router;
