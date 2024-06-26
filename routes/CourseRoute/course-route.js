const express = require("express");
const upload = require("../../middleware/multer");
const router = express.Router();

const {
  CreateCourse,
  GetCourseData,
  UpdateCourse,
  GetCourseDatabyId
} = require("../../controllers/Course/courseController");

router.post(
  "/createcourse",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "ogimage", maxCount: 1 },
  ]),
  CreateCourse
);


router.get("/getcoursedata", GetCourseData);
router.get("/updatecoursebyid/:id",GetCourseDatabyId)
// Route to update a course
router.put(
    "/updatecourse/:id",
    upload.fields([
      { name: "icon", maxCount: 1 },
      { name: "banner", maxCount: 1 },
      { name: "ogimage", maxCount: 1 },
    ]),
    UpdateCourse
  );

module.exports = router;
