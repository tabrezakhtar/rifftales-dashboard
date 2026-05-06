import dbConnect from "../lib/mongodb";
import UserModel from "../models/User";
import * as bcrypt from "bcryptjs";
import { userData } from "./seed-data";

async function seedUser() {
  try {
    await dbConnect();
    console.log("Connected to database");

    // Check if user already exists
    const existingUser = await UserModel.findOne({ 
      $or: [
        { email: userData.email },
        { username: userData.username }
      ]
    });
    if (existingUser) {
      console.log("User already exists!");
      console.log({
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      });
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create the user
    const user = await UserModel.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      banHistory: [],
    });

    console.log("User created successfully:");
    console.log({
      id: user._id,
      username: user.username,
      email: user.email,
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding user:", error);
    process.exit(1);
  }
}

seedUser();
