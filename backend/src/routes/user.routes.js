import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  changePassword,
  getAllUsers,
  updateProfile,
  updateUserStatus
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", protect, authorizeRoles("admin"), getAllUsers);
userRouter.patch("/:id/status", protect, authorizeRoles("admin"), updateUserStatus);
userRouter.put("/me", protect, updateProfile);
userRouter.put("/change-password", protect, changePassword);

export default userRouter;
