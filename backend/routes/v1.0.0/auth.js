import { Router } from "express";

import { register, login, logout } from "../../controllers/v1.0.0/auth.js";
import auth from "../../middleware/auth.js";

const router = Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(auth, logout);

export default router;