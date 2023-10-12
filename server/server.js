import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
const port = process.env.PORT || 4000;

connectDB();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("server/public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/provider", providerRoutes);
// app.use("/api/admin", adminRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`🚀 starts at http://localhost:${port}`));
