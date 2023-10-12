import express from "express";
import {
  registerUser,
  authTokenGenerate,
  googleSign,
} from "../controllers/userController.js";
import {
  getPackages,
  getSinglePackageDetails,
} from "../controllers/packageController.js";
import {
  createBooking,
  verificationHandler,
  getUserBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/bookings", protect, getUserBookings);
router.get("/booking/:packageId", protect, getSinglePackageDetails);
router.get("/packages", getPackages);
router.post("/new/package", protect, createBooking);
router.post("/new/package/verify", protect, verificationHandler);
router.post("/auth", authTokenGenerate);
router.post("/auth/google", googleSign);

export default router;
