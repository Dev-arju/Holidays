import Admin from "../models/adminModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

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
    const payload = {
      id: admin._id,
      role: process.env.ADMIN_CONST,
    };
    const token = generateToken(payload);
    return res.status(201).json({ _id: admin._id, token });
  } else {
    res.status(401);
    throw new Error("invalid credential");
  }
});
