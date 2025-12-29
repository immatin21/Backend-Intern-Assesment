import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

// Sign up controller
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

// Login controller 
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

// Checking is email and password is empty or not
    if (!email || !password) {
      return errorResponse(res, 400, "Email and password are required");
    }

// Finding User from Db using email
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 401, "Invalid credentials");
    }

// Checking the status of user either active or inactive
    if (user.status === "inactive") {
      return errorResponse(res, 403, "Account is deactivated");
    }

// Comparing the inputted password with stored password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 401, "Invalid credentials");
    }

// Changing the login time of user whenever sign in's
    user.lastLogin = new Date();
    await user.save();

// Generating JSON web token
    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    return successResponse(res, 200, "Login successful", {
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

// Current user 
export const getMe = async (req, res) => {
  return successResponse(res, 200, "User profile", req.user);
};
