// Multer Image Middleware
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./api/media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

exports.upload = multer({
  storage,
});
