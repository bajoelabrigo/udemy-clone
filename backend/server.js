import express from "express";
import "dotenv/config";
import ImageKit from "imagekit";
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

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/auth", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/upload", async (req, res) => {
  try {
    const uploadLocalFile = async (imagekitInstance, filePath, fileName) => {
      const file = fs.createReadStream(filePath);
      const response = await imagekitInstance.upload({ file, fileName });
      const res = await File.create({ file: response.url });
      return res;
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
