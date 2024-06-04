const express = require("express");
const router = express.Router();

const {
  CreateCountry,
  GetCountryData,
  GetCountryDataBYID,
  CountryUpdate,
  GetCountryDatabyRegionId,
  CountryDelete,
} = require("../../controllers/Location/countryController");

router.post("/createcountrydata", CreateCountry);
router.get("/getcountrydata", GetCountryData);
router.get("/countries/:regionId", GetCountryDatabyRegionId);
router.get("/getcountrydataid/:id", GetCountryDataBYID);
router.put("/countryupdate/:id", CountryUpdate);
router.delete("/countrydelete/:id", CountryDelete);
module.exports = router;
