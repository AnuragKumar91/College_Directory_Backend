const express = require("express");
const upload = require("../../middleware/multer");
const router = express.Router();

const { CreateExam ,GetExamData,DeleteExam,ExamUpdate} = require("../../controllers/Course/examController");

router.post(
  "/createexam",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "ogimage", maxCount: 1 },
  ]),
  CreateExam
);
router.get("/getexamdata",GetExamData)

router.put(
  "/updateexam/:id",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "ogimage", maxCount: 1 },
  ]),
  ExamUpdate
);
router.delete("/getexamdata/:id",DeleteExam)

module.exports = router;
