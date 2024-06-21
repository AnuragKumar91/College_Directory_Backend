const express = require("express");

const router = express.Router();
const upload = require("../../middleware/multer");

const {
  CreateCity,
  GetCityData,
  GetCityDataBYID,
  CityUpdate,
  CityDelete,
  GetCityDatabyStateId,
} = require("../../controllers/Location/cityController");

// router.post("/createcitydata", CreateCity);

router.post(
  "/createcitydata",
  upload.fields([
    { name: "map", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "ogimage", maxCount: 1 },
  ]),
  CreateCity
);
router.get("/getcitydata", GetCityData);
router.get("/cities/:stateId", GetCityDatabyStateId);
router.get("/getcitydataid/:id", GetCityDataBYID);
router.put("/cityupdate/:id", CityUpdate);
router.delete("/citydelete/:id", CityDelete);

module.exports = router;
