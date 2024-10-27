import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import mockTestRouter from "./routes/mockTest.js";
import modelTestRouter from "./routes/modelTest.js";
import questionRouter from "./routes/question.js";
import scoreRouter from "./routes/scores.js";
import studentRouter from "./routes/student.js";
import tutorRouter from "./routes/tutor.js";

const PORT = process.env.PORT;

const app = express();

// Parse the ALLOWED_ORIGINS environment variable
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;

// Validate and parse the allowed origins
let allowedOrigins = [];

if (allowedOriginsEnv) {
  allowedOrigins = allowedOriginsEnv.split(",").map((origin) => origin.trim());
} else {
  console.warn("ALLOWED_ORIGINS is not defined in the environment variables.");
}

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials and cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Example middleware to ensure Access-Control-Allow-Credentials is present
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Routes
app.use("/tutor", tutorRouter);
app.use("/student", studentRouter);
app.use("/question", questionRouter);
app.use("/mockTest", mockTestRouter);
app.use("/modelTest", modelTestRouter);
app.use("/score", scoreRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
