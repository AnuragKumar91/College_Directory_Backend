const express = require("express");
const router = express.Router();

const {
  CreateDegree,
  GetDegreeData,
  DegreeUpdate,
  DegreeDelete,
} = require("../../controllers/Course/degreeController");

router.post("/createdegreedata",CreateDegree);
router.get("/getdegreedata", GetDegreeData);
router.put("/updatedegree/:id", DegreeUpdate);
router.delete("/degreedelete/:id", DegreeDelete);
module.exports = router;
