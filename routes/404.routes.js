import express from "express";
import notFoundController from "../controllers/404.controller.js";

const router = express.Router();

router.get("*", notFoundController);

export default router;
