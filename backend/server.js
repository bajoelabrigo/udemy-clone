import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import cors from "cors";
import File from "./models/file.model.js";
import path from "path";
import fs from "fs";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
