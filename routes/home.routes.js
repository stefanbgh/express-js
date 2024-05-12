import express from "express";
import homeController from "../controllers/home.controller.js";

const router = express.Router();

router.get("/", homeController);

export default router;
