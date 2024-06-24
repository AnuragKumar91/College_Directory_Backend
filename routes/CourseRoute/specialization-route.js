const express = require("express");
const upload = require("../../middleware/multer");
const router = express.Router();

const {
  CreateSpecialization,
  GetSpecializationData,
  UpdateSpecialization,
  DeleteSpecialization,
} = require("../../controllers/Course/specializationController");

router.post(
  "/createspecialization",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "ogimage", maxCount: 1 },
  ]),
  CreateSpecialization
);
router.get("/getspecializationdata", GetSpecializationData);

router.put(
  "/updatespecialization/:id",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "ogimage", maxCount: 1 },
  ]),
  UpdateSpecialization
);

router.delete("/deletespecialization/:id", DeleteSpecialization);

module.exports = router;
