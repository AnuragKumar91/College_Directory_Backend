const express = require("express");
const router = express.Router();

const {
  CreateCountry,
  GetCountryData,
  GetCountryDataBYID,
  CountryUpdate,
  CountryDelete,
} = require("../../controllers/Location/countryController");

router.post("/countrydata", CreateCountry);
router.get("/getcountrydata", GetCountryData);
router.get("/getcountrydataid/:id", GetCountryDataBYID);
router.put("/countryupdate/:id", CountryUpdate);
router.delete("/countrydelete/:id", CountryDelete);
module.exports = router;
