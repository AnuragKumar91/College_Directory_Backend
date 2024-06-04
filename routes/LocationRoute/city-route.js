const express =require("express")

const router=express.Router()

const {CreateCity,GetCityData,GetCityDataBYID,CityUpdate,CityDelete}=require("../../controllers/Location/cityController")


router.post("/createcitydata",CreateCity);
router.get("/getcitydata", GetCityData);

router.get("/getcitydataid/:id",GetCityDataBYID)
router.put("/cityupdate/:id",CityUpdate)
router.delete("/citydelete/:id",CityDelete)

module.exports =router;