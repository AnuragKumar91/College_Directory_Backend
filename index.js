const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");

const RegionRoutes = require("./routes/LocationRoute/region-route");
const CountryRoutes = require("./routes/LocationRoute/country-route");
const StateRoutes = require("./routes/LocationRoute/state-route");
const CityRoutes = require("./routes/LocationRoute/city-route");
const LocalityRoutes = require("./routes/LocationRoute/locality-route");
const DegreeRoutes = require("./routes/CourseRoute/degree-route");
const StreamRoutes = require("./routes/CourseRoute/stream-route");
const CourseRoutes = require("./routes/CourseRoute/course-route");
const SpecializationRoutes = require("./routes/CourseRoute/specialization-route");
const ExamRoutes = require("./routes/CourseRoute/exam-route");
const UserRoutes = require("./routes/user-route");
app.use(cors());

const PORT = process.env.PORT || 6000;
app.use(express.json());
// Start server
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});
// Connect to database
const dbConnect = require("./config/database");
dbConnect();
// Default route
app.get("/", (req, res) => {
  res.send("Hello Server From Anurag");
});
//Mount our routes
app.use("/region", RegionRoutes);
app.use("/country", CountryRoutes);
app.use("/state", StateRoutes);
app.use("/city", CityRoutes);
app.use("/locality", LocalityRoutes);
app.use("/degree", DegreeRoutes);
app.use("/stream", StreamRoutes);
app.use("/course", CourseRoutes);
app.use("/specialization", SpecializationRoutes);
app.use("/exam", ExamRoutes);
app.use("/api", UserRoutes);
