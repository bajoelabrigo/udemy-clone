import express from "express";
import { loginUser, registerUser } from "../../controllers/auth-controller/index.js";
import { authenticate } from "../../middleware/auth-middleware.js";
const router = express.Router();

router.post("/register",  registerUser);
router.post("/login", loginUser);
router.get("/check-auth",  authenticate)

export default router;
