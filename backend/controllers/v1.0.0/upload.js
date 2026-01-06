export const handleUpload = (req, res) => {
    try {
        console.log("Upload hit:", req.originalUrl);
        console.log("File:", req.file);

        let { filename, destination } = req.file

        if (!req.file) {
            return res.status(400).json({ message: "No file provided" });
        }

        return res.status(200).json({
            file: req.file,
            path: `${req.protocol}://${req.get("host")}/${destination}${filename}`
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

export default handleUpload;