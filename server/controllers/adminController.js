import Admin from "../models/adminModel.js";
import asyncHandler from "express-async-handler";
// import { generateMasterToken } from "../utils/generateToken.js";

// @desc Register Credentials
// route POST /api/admin
// @access Public
export const registerAdmin = asyncHandler(async (req, res) => {
  const { authId, password } = req.body;
  if (!authId || !password) {
    res.status(400);
    throw new Error("bad request");
  }

  const admin = await Admin.create({
    authId,
    password,
  });
  if (admin) {
    return res.status(200).json({ message: "admin credential added" });
  }
  res.status(404);
  throw new Error("not found");
});

// @desc Token Sign
// route POST /api/admin/auth
// @access  Public
export const authenticate = asyncHandler(async (req, res) => {
  const { authId, password } = req.body;
  if (!authId || !password) {
    res.status(400);
    throw new Error("bad request");
  }
  const admin = await Admin.findOne({ authId });
  if (admin && (await admin.matchPassword(password))) {
    // generateMasterToken(res, admin._id);
    return res
      .status(201)
      .json({ _id: admin._id, authId: admin.authId, isAuth: true });
  } else {
    res.status(401);
    throw new Error("invalid credential");
  }
});

// @desc Destroy Token
// route POST /api/admin/logout
// @access Public
export const clearToken = asyncHandler(async (req, res) => {
  res.cookie("masterToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logout successful" });
});
