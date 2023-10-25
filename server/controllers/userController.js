import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";

// @desc Register new user
// route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, dob, password, promo } = req.body;
  if (!name || !email || !dob || !password) {
    res.status(400);
    throw new Error("bad request");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already registered");
  }
  const newUser = await User.create({
    name,
    email,
    dob,
    password,
    promo: promo ? promo : false,
  });
  if (newUser) {
    const payload = {
      id: newUser._id,
      role: process.env.USER_CONST,
    };
    const token = generateToken(payload);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Error while create user info");
  }
});

// @desc Auth token generate
// route POST /api/users/auth
// @access Public
export const authTokenGenerate = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("bad request");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  if (!user.isActive) {
    res.status(403);
    throw new Error("user has been blocked");
  }
  if (user && (await user.matchPassword(password))) {
    const payload = {
      id: user._id,
      role: process.env.USER_CONST,
    };
    const token = generateToken(payload);
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar ? user.avatar : "",
      token: token,
    });
  }
  res.status(401);
  throw new Error("incorrect password");
});

// @desc Google Sign Token Generate
// route POST /api/users/auth/google
// @access Public
export const googleSign = asyncHandler(async (req, res) => {
  if (!req.body.code) {
    res.status(404);
    throw new Error("code not recived");
  }
  try {
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "postmessage"
    );
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    oAuth2Client.setCredentials({
      access_token: tokens.access_token,
    });
    const user = await oAuth2Client.request({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "GET",
    });

    if (user.data.email && user.data.name) {
      const existUser = await User.findOne({ email: user.data.email }).select(
        "-password"
      );
      if (existUser && !existUser.isActive)
        throw new Error("user has been blocked contact support");
      if (existUser) {
        const payload = {
          id: existUser._id,
          role: process.env.USER_CONST,
        };
        const token = generateToken(payload);
        return res.status(201).json({
          _id: existUser._id,
          name: existUser.name,
          email: existUser.email,
          avatar: existUser.avatar ? existUser.avatar : "",
          token: token,
        });
      } else {
        const newUser = await User.create({
          name: user.data.name,
          email: user.data.email,
          avatar: user.data.picture ? user.data.picture : "",
        });
        if (newUser) {
          const payload = {
            id: newUser._id,
            role: process.env.USER_CONST,
          };
          const token = generateToken(payload);
          return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar ? newUser.avatar : "",
            token: token,
          });
        } else {
          throw new Error("error while creating user");
        }
      }
    } else {
      throw new Error("user name and email is missing");
    }
  } catch (err) {
    res.status(404);
    throw err;
  }
});

// @desc retrive user info
export function getUser(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        reject("user not found");
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
}

// @desc Get All Documents
// @access Private
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) throw new Error("users not find");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw error;
  }
});

// @desc Change User Status
// route PUT /api/admin/user/status-toggle
// @access Private
export const toggleUserStatus = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("user not found");
    user.isActive = !user.isActive;
    const saved = await user.save();
    return res.status(200).json({ ...saved._doc, password: "" });
  } catch (error) {
    res.status(404);
    throw error;
  }
});
