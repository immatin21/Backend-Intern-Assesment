import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { errorResponse } from "../utils/apiError.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, 401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return errorResponse(res, 401, "Unauthorized");
    }

    if (user.status !== "active") {
      return errorResponse(
        res,
        403,
        "Your account is inactive. Please contact admin."
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 401, "Invalid or expired token");
  }
};
