const multer = require("multer");

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/"); // Destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use current timestamp + original file name as the file name
  },
});

// Initialize Multer upload
const upload = multer({ storage: storage });

module.exports = upload;
