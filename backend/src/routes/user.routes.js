import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  getAllUsers,
  updateUserStatus
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", protect, authorizeRoles("admin"), getAllUsers);
userRouter.patch("/:id/status", protect, authorizeRoles("admin"), updateUserStatus);

export default userRouter;
