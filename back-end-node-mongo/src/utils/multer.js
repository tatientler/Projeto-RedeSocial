import multer from "multer";
import path from "path";

// Multer config
export default multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, callback) => {
        const ext = path.extname(file.originalname)
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            callback(new Error("File type is not supported"), false)
            return;
        }
        callback(null, true);
    },
})