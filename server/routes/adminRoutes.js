import express from "express";
import { registerAdmin, authenticate } from "../controllers/adminController.js";
import {
  getAllProviders,
  toggleProviderStatus,
} from "../controllers/providerController.js";
import {
  getAllUsers,
  toggleUserStatus,
} from "../controllers/userController.js";
import {
  setBanner,
  toggleAvailability,
} from "../controllers/packageController.js";
import { getAllBookings } from "../controllers/bookingController.js";
import { adminProtect } from "../middleware/authMiddleware.js";
const router = express.Router();

// router.post("/", registerAdmin);
router.post("/auth", authenticate);
router.get("/users", adminProtect, getAllUsers);
router.get("/providers", adminProtect, getAllProviders);
router.get("/bookings", adminProtect, getAllBookings);
router.put("/users/status-toggle", adminProtect, toggleUserStatus);
router.put("/providers/status-toggle", adminProtect, toggleProviderStatus);
router.put("/banner/set", adminProtect, setBanner);
router.put("/package/availability", adminProtect, toggleAvailability);

export default router;
