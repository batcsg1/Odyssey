import { Router } from "express";

import { register, login, logout, me } from "../../controllers/v1.0.0/auth.js";
import auth from "../../middleware/auth.js";

const router = Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(auth, logout);
router.route("/me").get(auth, me);

export default router;