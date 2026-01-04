import multer from "multer";
import express from "express";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const timeStamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);

        const ext = file.originalname.split('.').pop();

        cb(null, `${timeStamp}.${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

router.post("/", upload.single("file"), (req, res) => {
    console.log("Upload hit:", req.originalUrl);
    console.log("File:", req.file);

    if (!req.file) {
        return res.status(400).json({ message: "No file provided" });
    }

    res.json({
        file: req.file
    });
});


export default router;