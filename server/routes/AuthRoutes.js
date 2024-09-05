import { Router } from "express";
import cors from "cors";
import {
  getUserInfo,
  login,
  setUserImage,
  setUserInfo,
  signup,
} from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/profiles/" });

const corsOptions = {
  origin: 'https://bico-client.vercel.app',
  methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
};

authRoutes.use(cors(corsOptions));
authRoutes.options('*', cors(corsOptions)); // Handle preflight requests

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/get-user-info", verifyToken, getUserInfo);
authRoutes.post("/set-user-info", verifyToken, setUserInfo);

authRoutes.post(
  "/set-user-image",
  verifyToken,
  upload.single("images"),
  setUserImage
);

export default authRoutes;
