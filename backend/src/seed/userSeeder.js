import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt'

dotenv.config();

const users = [];

for (let i = 1; i <= 25; i++) {
  users.push({
    fullName: `Test User ${i}`,
    email: `user${i}@example.com`,
    password: "User@123",
    role: i === 1 ? "admin" : "user",
    status: i % 3 === 0 ? "inactive" : "active"
  });
}

const seedUsers = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    console.log("Existing users removed");

    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await User.insertMany(users);
    console.log("Users seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeder failed:", error);
    process.exit(1);
  }
};

seedUsers();
