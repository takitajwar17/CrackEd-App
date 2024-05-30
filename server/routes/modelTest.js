import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Route to fetch questions based on subject
router.get("/questions", async (req, res) => {
  const { subject } = req.query; // Get subject from query parameters

  if (!subject) {
    return res.status(400).json({ message: "Subject is required" });
  }

  // Determine the collection name based on the subject
  const collectionName = `Questions_${subject}`;

  try {
    const questions = await db.collection(collectionName).find({}).toArray();
    const questionsWithSubject = questions.map((question) => ({
      ...question,
      subject: subject,
    }));

    res.json(questionsWithSubject);
  } catch (error) {
    console.error("Failed to fetch questions from", collectionName, ":", error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

// Route to fetch all questions from multiple collections with subject field
router.get("/allQuestions", async (req, res) => {
  try {
    const physicsQuestions = await db
      .collection("Questions_Physics")
      .find({})
      .toArray();
    const mathQuestions = await db
      .collection("Questions_Math")
      .find({})
      .toArray();
    const chemistryQuestions = await db
      .collection("Questions_Chemistry")
      .find({})
      .toArray();
    const englishQuestions = await db
      .collection("Questions_English")
      .find({})
      .toArray();

    const allQuestions = [
      ...physicsQuestions.map((question) => ({
        ...question,
        subject: "Physics",
      })),
      ...mathQuestions.map((question) => ({ ...question, subject: "Math" })),
      ...chemistryQuestions.map((question) => ({
        ...question,
        subject: "Chemistry",
      })),
      ...englishQuestions.map((question) => ({
        ...question,
        subject: "English",
      })),
    ];

    res.json(allQuestions);
  } catch (error) {
    console.error("Failed to fetch all questions:", error);
    res.status(500).json({ message: "Failed to fetch all questions" });
  }
});

// Route to store a ModelTest in the ModelTests collection
router.post("/storeModelTest", async (req, res) => {
  const { Name, Marks, Time, Subject, QuestionIds } = req.body;

  try {
    const result = await db.collection("ModelTests").insertOne({
      Name,
      Marks,
      Time,
      Subject,
      QuestionIds,
    });

    res.status(201).json({
      message: "ModelTest stored successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Failed to store ModelTest:", error);
    res.status(500).json({ message: "Failed to store ModelTest" });
  }
});

// route to get All ModelTest Data (Name, Subject and Marks)
router.get("/allModelTests", async (req, res) => {
  try {
    const allModelTests = await db.collection("ModelTests").find({}).toArray();
    res.json(allModelTests);
  } catch (error) {
    console.error("Failed to fetch all ModelTests:", error);
    res.status(500).json({ message: "Failed to fetch all ModelTests" });
  }
});

export default router;
