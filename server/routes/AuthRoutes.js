import { Router } from "express";
import { login, signup, getUserInfo, updateProfile } from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);

// verifyToken is a middleware here. Any number of middlewares can be subsequently added using `,`
authRoutes.get("/user-info", verifyToken, getUserInfo)
authRoutes.post("/update-profile", verifyToken, updateProfile);

export default authRoutes;
