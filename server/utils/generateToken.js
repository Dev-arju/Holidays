import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload) return payload;
  } catch (error) {
    return false;
  }
};

export { generateToken, verifyToken };
