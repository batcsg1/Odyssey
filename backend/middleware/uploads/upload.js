import multer from "multer";

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

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

export default upload;
