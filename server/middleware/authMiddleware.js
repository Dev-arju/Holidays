import asyncHandler from "express-async-handler";
import { verifyToken } from "../utils/generateToken.js";
import { getUser } from "../controllers/userController.js";

export const protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401);
    throw new Error("authorisation token is missing");
  }
  const authorisation = req.headers.authorization;
  if (authorisation && authorisation.startsWith("Bearer ")) {
    const token = authorisation.split(" ")[1];
    const decode = verifyToken(token);
    if (decode && decode.role === process.env.USER_CONST) {
      getUser(decode.id)
        .then((user) => {
          if (user && user.isActive) {
            req.userId = decode.id;
            return next();
          }
          res.status(403).json({ message: "user has been blocked" });
        })
        .catch((err) => {
          res.status(404).json({ message: err?.message || err });
        });
    }
  }
  res.status(401);
  throw new Error("token invalid / expired");
});

export const adminProtect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401);
    throw new Error("authorisation token is missing");
  }
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.split(" ")[1];
    const decode = verifyToken(token);
    if (decode && decode.role === process.env.ADMIN_CONST) {
      req.adminId = decode.id;
      return next();
    }
  }
  res.status(401);
  throw new Error("invalid token / expired");
});

export const providerProtect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401);
    throw new Error("authorisation token is missing");
  }
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.split(" ")[1];
    const decode = verifyToken(token);
    if (decode && decode.role === process.env.PROVIDER_CONST) {
      req.providerId = decode.id;
      return next();
    }
  }
  res.status(401);
  throw new Error("invalid token / expired");
});
