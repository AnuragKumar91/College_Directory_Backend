const express = require("express");
const upload = require("../../middleware/multer");
const router = express.Router();

const {
  CreateStream,
  GetStreamData,
  StreamUpdate,
  StreamDelete,
  GetStreamDatabyId,
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
router.get("/getstreamdatabyid/:id", GetStreamDatabyId);

router.put(
  "/updatestream/:id",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "ogimage", maxCount: 1 },
  ]),
  StreamUpdate
);

router.delete("/deletestream/:id", StreamDelete);
module.exports = router;
