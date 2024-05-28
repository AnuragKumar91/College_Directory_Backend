const express = require('express');
const router = express.Router();

// Import the CreateRegion function
const { CreateRegion,GetRegionData,GetRegionDataBYID ,RegionUpdate,RegionDelete} = require('../../controllers/Location/regionController');

// Define API route
router.post('/regiondata', CreateRegion);
router.get('/getregiondata', GetRegionData);
router.get("/getregiondataid/:id",GetRegionDataBYID)
router.put("/regionupdate/:id",RegionUpdate)
router.delete("/regiondelete/:id",RegionDelete)


module.exports = router;
 