import express from "express";
import {
	getUsers,
	getSingleUser,
	updateUser,
	deleteUser,
} from "../controllers/user.controller.js";
import verifyRole from "../utils/verifyRole.js";

const router = express.Router();

router.get("/", verifyRole, getUsers);
router.get("/:id", verifyRole, getSingleUser);
router.put("/:id", verifyRole, updateUser);
router.delete("/:id", verifyRole, deleteUser);

export default router;
