const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const RegionRoutes = require('./routes/LocationRoute/region-route');
const CountryRoutes=require('./routes/LocationRoute/country-route')
const StateRoutes=require('./routes/LocationRoute/state-route');
const CityRoutes =require('./routes/LocationRoute/city-route');
const LocalityRoutes=require('./routes/LocationRoute/locality-route');
const UserRoutes =require('./routes/user-route')
app.use(cors());
const PORT = process.env.PORT || 6000;
app.use(express.json());
// Start server
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});
// Connect to database
const dbConnect = require('./config/database');
dbConnect();
// Default route
app.get('/', (req, res) => {
  res.send('Hello Server');
});
//Mount our routes
app.use('/admin', RegionRoutes);
app.use('/admin', CountryRoutes);
app.use('/admin', StateRoutes);
app.use('/admin', CityRoutes);
app.use('/admin',LocalityRoutes)
app.use('/admin',UserRoutes)

