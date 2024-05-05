import express from "express";
import bcrypt from "bcrypt";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const router = express.Router();

// const { ObjectId } = require("mongodb");

// api routes here
router.get("/", async (req, res) => {
  let collection = await db.collection("Students");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// register new Student
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    let collection = await db.collection("Students");

    // Check for existing user with the same email or username
    const existingUser = await collection.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res
        .status(409)
        .send({ message: "Email or username already exists" });
    }

    // Hash password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new student document
    const newStudent = {
      email,
      username,
      hashedPassword, // Note: Store hashed passwords in production for security
      created_at: new Date(),
    };

    const result = await collection.insertOne(newStudent);

    if (result.acknowledged) {
      const token = jwt.sign({ email: result.email }, "UwoZatxBBtdt4yAN5GFsiO");
      res.cookie("jwt", token, { httpOnly: true });
      res.status(201).send({
        message: "Student registered successfully",
        studentId: result.insertedId,
        studentName: result.username,
        jwtoken: token,
        isStudent: true,
      });
    } else {
      res.status(500).send({ message: "Failed to register student" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// Login existing student
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    let collection = await db.collection("Students");

    // Check for existing user with the given email
    const student = await collection.findOne({ email: email });

    if (!student) {
      return res.status(404).send({ message: "User not found" });
    }

    /*bcrypt.hash generates a new hash each time it's called, even with the same input, due to the salt. Therefore, the newly hashed password will not match the previously hashed password stored in the database.
    Instead, we should directly use bcrypt.compare with the user's plain password and the stored hashed password. */
    // Verify the hashed password
    const passwordIsValid = await bcrypt.compare(
      password,
      student.hashedPassword
    );

    // Wrong Password
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Login successful
    const token = jwt.sign(
      { email: student.email },
      /*process.env.JWT_SECRET*/ "UwoZatxBBtdt4yAN5GFsiO",
      { expiresIn: "7d" }
    );
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.status(200).send({
      message: "Login successful",
      studentId: student._id,
      studentName: student.username,
      jwtoken: token,
      isStudent: true,
    });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// Logout student
router.post("/logout", async (req, res) => {
  try {
    // Clear user data from local storage
    // Optionally, you can also clear any other session-related data
    // For example: localStorage.removeItem("userData");

    // Clear JWT token from the cookie
    res.clearCookie("jwt");
    // localStorage.removeItem("userData"); // it should be done from client side
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// Fetch student profile data
router.get("/profile/:studentId", async (req, res) => {
  const { studentId } = req.params;

  // Validate the studentId
  if (!ObjectId.isValid(studentId)) {
    return res.status(400).send({ message: "Invalid student ID format" });
  }

  let objectId = new ObjectId(studentId);
  let collection = await db.collection("Students");

  try {
    const studentData = await collection.findOne({ _id: objectId });
    if (!studentData) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send(studentData);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// Update student profile
router.put("/profile/:studentId", async (req, res) => {
  const { studentId } = req.params;

  // Check if the studentId is a valid ObjectId
  if (!ObjectId.isValid(studentId)) {
    return res.status(400).send({ message: "Invalid student ID format" });
  }

  let objectId;

  try {
    objectId = new ObjectId(studentId);
  } catch (error) {
    return res.status(400).send({ message: "Invalid student ID format" });
  }

  const { fullName, institute, batch, phone, email, username } = req.body;
  let collection = await db.collection("Students");

  // Check if the username is already taken by another student
  if (username) {
    const existingUser = await collection.findOne({
      username: username,
      _id: { $ne: objectId },
    });
    if (existingUser) {
      return res.status(409).send({ message: "Username already taken" });
    }
  }

  try {
    const updatedData = {
      ...(fullName && { fullName }),
      ...(institute && { institute }),
      ...(batch && { batch }),
      ...(phone && { phone }),
      ...(email && { email }),
      ...(username && { username }),
    };
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: updatedData }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "Data unchanged" });
    }
    res.status(200).send({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// Update student password
router.post("/update-password/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  // Validate student ID
  if (!ObjectId.isValid(studentId)) {
    return res.status(400).send({ message: "Invalid student ID format" });
  }

  // Check password length
  if (!newPassword || newPassword.length < 6) {
    return res
      .status(400)
      .send({ message: "Password must be at least 6 characters long" });
  }

  // Check if new password and confirm new password match
  if (newPassword !== confirmNewPassword) {
    return res.status(400).send({ message: "New passwords do not match" });
  }

  let collection = await db.collection("Students");
  let objectId = new ObjectId(studentId);

  // Fetch the existing user
  const student = await collection.findOne({ _id: objectId });
  if (!student) {
    return res.status(404).send({ message: "Student not found" });
  }

  // Verify old password
  const isOldPasswordValid = await bcrypt.compare(
    oldPassword,
    student.hashedPassword
  );
  if (!isOldPasswordValid) {
    return res.status(401).send({ message: "Invalid old password" });
  }

  // Hash new password
  const saltRounds = 10;
  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

  // Update password in the database
  const result = await collection.updateOne(
    { _id: objectId },
    { $set: { hashedPassword: hashedNewPassword } }
  );

  if (result.modifiedCount === 0) {
    return res.status(500).send({ message: "Failed to update password" });
  }

  res.status(200).send({ message: "Password updated successfully" });
});

export default router;