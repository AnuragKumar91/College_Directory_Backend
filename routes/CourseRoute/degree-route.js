const express = require("express");
const router = express.Router();

const {
  CreateDegree,
  GetDegreeData,
  DegreeUpdate,
  GetDegreebyId,
  DegreeDelete,
} = require("../../controllers/Course/degreeController");

router.post("/createdegreedata",CreateDegree);
router.get("/getdegreedata", GetDegreeData);
router.get("/getdegreebyid/:id",GetDegreebyId)
router.put("/updatedegree/:id", 
  DegreeUpdate);
router.delete("/degreedelete/:id", DegreeDelete);
module.exports = router;
