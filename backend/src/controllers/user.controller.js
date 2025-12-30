import User from "../models/User.js";
import { successResponse } from "../utils/apiResponse.js";
import { errorResponse } from "../utils/apiError.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    return successResponse(res, 200, "Users fetched", {
      users,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return errorResponse(res, 400, "Invalid status");
    }

    const user = await User.findById(id);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    user.status = status;
    await user.save();

    return successResponse(res, 200, "User status updated");
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};


// Self profile updation

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return errorResponse(res, 400, "All fields required");
    }

    req.user.fullName = fullName;
    req.user.email = email;

    await req.user.save();

    return successResponse(res, 200, "Profile updated", req.user);
  } catch (error) {
    return errorResponse(res, 500, "Server error");
  }
};

// Change password

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return errorResponse(res, 400, "All fields required");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return errorResponse(res, 401, "Current password incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return successResponse(res, 200, "Password updated");
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return errorResponse(res, 500, "Server error");
  }
};
