import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth-routes/index.js";
import connectDB from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

//routes configuration
app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
