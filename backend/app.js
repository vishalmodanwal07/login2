// app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./route/userRouter.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// App configurations (middleware)
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Set up routes for login and signup
app.use("/api/user", userRouter);

export { app };