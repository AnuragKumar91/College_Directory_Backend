const express = require("express");

const router = express.Router();
const upload = require("../../middleware/multer");

const {
  CreateState,
  GetStateData,
  GetStateDataBYID,
  StateUpdate,
  StateDelete,
  GetStateDatabyCountryId,
} = require("../../controllers/Location/stateController");

// router.post("/createstatedata", CreateState);
router.post(
  "/createstatedata",
  upload.fields([
    { name: "map", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "ogimage", maxCount: 1 },
  ]),
  CreateState
);
router.get("/getstatedata", GetStateData);
router.get("/states/:countryId", GetStateDatabyCountryId);
router.get("/getstatedataid/:id", GetStateDataBYID);
router.put("/stateupdate/:id", StateUpdate);
router.delete("/statedelete/:id", StateDelete);

module.exports = router;
