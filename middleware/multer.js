const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to determine destination folder dynamically
const getDestination = (req, file, cb) => {
  // Determine destination folder based on type
  let destFolder;

  destFolder = path.join(__dirname, "../upload"); // Default folder if type is not specified

  // Ensure the destination folder exists
  fs.mkdirSync(destFolder, { recursive: true });

  cb(null, destFolder);
};

// Set up Multer storage
const storage = multer.diskStorage({
  destination: getDestination,
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use current timestamp + original file name as the file name
  },
});

// Initialize Multer upload
const upload = multer({ storage: storage });

module.exports = upload;
