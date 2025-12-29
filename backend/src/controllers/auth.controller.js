import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

// Simply Validation if any field is empty or not
    if (!fullName || !email || !password) {
      return errorResponse(res, 400, "All fields are required");
    }

// Checking Email Format
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(email)) {
      return errorResponse(res, 400, "Invalid email format");
    }

// Allowing password with length of minimum 8 characters
    if (password.length < 8) {
      return errorResponse(res, 400, "Password must be at least 8 characters");
    }

// Checking is there any user exists with same email id
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 409, "Email already registered");
    }

// Converting password into hashing
    const hashedPassword = await bcrypt.hash(password, 10);

// Creating user in DB
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

// Generating JSON web token 
    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    return successResponse(res, 201, "Signup successful", {
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Server error");
  }
};
