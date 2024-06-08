const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");

const {
  CreateCountry,
  GetCountryData,
  GetCountryDataBYID,
  CountryUpdate,
  GetCountryDatabyRegionId,
  CountryDelete,
} = require("../../controllers/Location/countryController");
// Route for creating a new country with file uploads

router.post(
  "/createcountrydata",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "map", maxCount: 1 },
    { name: "flag", maxCount: 1 },
    { name: "ogimage", maxCount: 1 },
  ]),
  CreateCountry
);

router.get("/getcountrydata", GetCountryData);
router.get("/countries/:regionId", GetCountryDatabyRegionId);
router.get("/getcountrydataid/:id", GetCountryDataBYID);
router.put("/countryupdate/:id", CountryUpdate);
router.delete("/countrydelete/:id", CountryDelete);
module.exports = router;
