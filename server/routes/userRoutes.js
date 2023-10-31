import express from "express";
import {
  registerUser,
  authTokenGenerate,
  googleSign,
} from "../controllers/userController.js";
import {
  getLatest,
  getPackages,
  getSinglePackageDetails,
} from "../controllers/packageController.js";
import {
  createBooking,
  verificationHandler,
  getUserBookings,
} from "../controllers/bookingController.js";
import { getProperties } from "../controllers/propertyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/latest", getLatest);
router.get("/bookings", protect, getUserBookings);
router.get("/booking/:packageId", getSinglePackageDetails);
router.get("/packages", getPackages);
router.get("/properties", getProperties);
router.post("/new/package", protect, createBooking);
router.post("/new/package/verify", protect, verificationHandler);
router.post("/auth", authTokenGenerate);
router.post("/auth/google", googleSign);

export default router;
