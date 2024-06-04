const express = require("express");

const router = express.Router();

const {
  CreateState,
  GetStateData,
  GetStateDataBYID,
  StateUpdate,
  StateDelete,
  GetStateDatabyCountryId,
} = require("../../controllers/Location/stateController");

router.post("/createstatedata", CreateState);
router.get("/getstatedata", GetStateData);
router.get("/states/:countryId", GetStateDatabyCountryId);
router.get("/getstatedataid/:id", GetStateDataBYID);
router.put("/stateupdate/:id", StateUpdate);
router.delete("/statedelete/:id", StateDelete);

module.exports = router;
