import { Router } from "express";
import { registerUsers, loginUser, currentUser } from "../controller/userControllers.mjs";

const router = Router();

router.post("/register",registerUsers);
router.post("/login",loginUser);
router.get("/current", currentUser);

export default router;