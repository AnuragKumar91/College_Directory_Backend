const express = require("express");
const upload = require("../../middleware/multer");

const router = express.Router();

const {
  CreateLocality,
  GetlocalityData,
  GetlocalityDataBYID,
  LocalityUpdate,
  LocalityDelete,
} = require("../../controllers/Location/localityController");

// router.post("/createlocalitydata",CreateLocality)

router.post(
  "/createlocalitydata",
  upload.fields([
    { name: "map", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "ogimage", maxCount: 1 },
  ]),
  CreateLocality
);
router.get("/getlocalitydata", GetlocalityData);
router.get("/getlocalitydatabyid/:id", GetlocalityDataBYID);
router.put("/localityupdate/:id", LocalityUpdate);
router.delete("/localitydelete/:id", LocalityDelete);
module.exports = router;
