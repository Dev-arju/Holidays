import express from "express";
import {
  registerUser,
  authTokenGenerate,
  googleSign,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authTokenGenerate);
router.post("/auth/google", googleSign);

export default router;
