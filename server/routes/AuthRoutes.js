import { Router } from "express";
import {
  getUserInfo,
  login,
  setUserImage,
  setUserInfo,
  signup,
} from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryConfig from "../cloudinaryConfig.js";

const authRoutes = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: "profiles",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

const upload = multer({ storage: storage });

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
