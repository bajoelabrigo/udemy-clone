require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");

const app = express();

const PORT = process.env.PORT || 5000;

cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

//routes configuration


app.use(express.json());

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Someting went wrong" + err.message,
  });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});

