import express from "express";
import { upload, request } from "../../middleware/uploads/upload.js"

const router = express.Router();

router.post("/", upload.single("file"), request );

export default router;