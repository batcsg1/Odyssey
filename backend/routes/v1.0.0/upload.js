import express from "express";
import upload from "../../middleware/uploads/upload.js"
import handleUpload from "../../controllers/v1.0.0/upload.js"

const router = express.Router();

router.post("/", upload.single("file"), handleUpload);

export default router;