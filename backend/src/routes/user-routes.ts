import { Router } from "express";
import { getAllUsers, userSignup, userLogin, verifyUser, userLogout} from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validator } from "../utils/validators.js";
import { verify } from "crypto";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validator(signupValidator), userSignup);
userRoutes.post("/login", validator(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);

export default userRoutes;