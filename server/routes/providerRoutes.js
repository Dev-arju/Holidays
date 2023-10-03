import express from "express";
import {
  authProvider,
  registerProvider,
  registerBussiness,
  sendResetLink,
  verifyResetLink,
  updatePassword,
} from "../controllers/providerController.js";
import {
  addProperty,
  addPriceOption,
  getAllProperties,
  changePropertyStatus,
  getSinglePropertyDetails,
  updatePropertyDetails,
} from "../controllers/propertyController.js";
import {
  addNewPackage,
  getAllPackages,
} from "../controllers/packageController.js";
import { providerProtect } from "../middleware/authMiddleware.js";
import {
  propertyImgUpload,
  logoUpload,
  packageUpload,
} from "../utils/multer.js";
const router = express.Router();

router.post("/", registerProvider);
router.post("/bussiness", logoUpload.single("brandLogo"), registerBussiness);
router.post("/reset", sendResetLink);
router.get("/reset/:id/:token", verifyResetLink);
router.post("/update-password", updatePassword);
router.post("/auth", authProvider); // completed
router.get("/property", providerProtect, getAllProperties); // completed
router.get("/property/:id", providerProtect, getSinglePropertyDetails); // completed
router.post(
  "/property/add",
  providerProtect,
  propertyImgUpload.array("coverImage", 8),
  addProperty
); // completed
router.post("/property/add/:propertyId", providerProtect, addPriceOption); // completed
router.put("/property/:propertyId", providerProtect, changePropertyStatus); // completed
router.post(
  "/property/edit/:id",
  providerProtect,
  propertyImgUpload.array("newImages", 8),
  updatePropertyDetails
); // completed
router.post(
  "/package/add",
  providerProtect,
  // packageUpload.array("coverImage", 2),
  packageUpload.any(),
  addNewPackage
);
router.get("/packages", providerProtect, getAllPackages);

export default router;
