import express from "express";
import {
  registerAdmin,
  authenticate,
  clearToken,
} from "../controllers/adminController.js";
import { adminProtect } from "../middleware/authMiddleware.js";
const router = express.Router();

// router.post("/", registerAdmin)
router.post("/auth", authenticate);
router.post("/logout", clearToken);

export default router;
