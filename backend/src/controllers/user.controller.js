import User from "../models/User.js";
import { successResponse } from "../utils/apiResponse.js";
import { errorResponse } from "../utils/apiError.js";

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

// Updating User status
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
