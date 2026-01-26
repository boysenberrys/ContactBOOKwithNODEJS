import { Router } from "express";
import { registerUsers, loginUser, currentUser } from "../controller/userControllers.mjs";
import { validateToken } from "../middlewares/validateControrHnadler.mjs";

const router = Router();

router.post("/register",registerUsers);
router.post("/login",loginUser);
router.get("/current",validateToken, currentUser);

export default router;