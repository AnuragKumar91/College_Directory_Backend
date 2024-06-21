const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to determine destination folder dynamically
const getDestination = (req, file, cb) => {
  // Ensure the type (country, state, city) is provided in the request body
  const type = req.body.type;

  if (!type) {
    return cb("Type not provided", null);
  }

  // Determine destination folder based on type
  let destFolder;
  if (type === "country") {
    destFolder = path.join(__dirname, "../upload/countries");
  } else if (type === "state") {
    destFolder = path.join(__dirname, "../upload/states");
  } else if (type === "city") {
    destFolder = path.join(__dirname, "../upload/cities");
  } else if (type === "locality") {
    destFolder = path.join(__dirname, "../upload/localities");
  } else {
    destFolder = path.join(__dirname, "../upload"); // Default folder if type is not specified
  }

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
