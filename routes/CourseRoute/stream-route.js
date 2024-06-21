const express = require("express");
const upload = require("../../middleware/multer");
const router = express.Router();

const {
  CreateStream,
  GetStreamData,
  StreamDelete,
} = require("../../controllers/Course/streamController");

router.post(
  "/createstreamdata",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "ogimage", maxCount: 1 },
  ]),
  CreateStream
);

router.get("/getstreamdata", GetStreamData);
router.delete("/deletestream/:id", StreamDelete);
module.exports = router;
