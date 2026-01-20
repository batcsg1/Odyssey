import express from "express";
import upload from "../../middleware/uploads/upload.js"
import handleUpload from "../../controllers/v1.0.0/upload.js"
import multer from "multer";

const router = express.Router();

router.post("/", (req, res) => {
    upload.single("file")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred (e.g., file size limit exceeded)
            return res.status(400).json({ message: err.message, code: err.code });
        } else if (err) {
            // An unknown error occurred
            return res.status(500).json({ message: 'An unknown error occurred: ' + err.message });
        }
        return handleUpload(req, res);
    })
});

export default router;