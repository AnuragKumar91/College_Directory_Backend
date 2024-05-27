const express =require("express")

const router=express.Router()
  

const {CreateLocality,GetlocalityData,GetlocalityDataBYID,LocalityUpdate,LocalityDelete} =require("../../controllers/Location/localityController")

router.post("/localitydata",CreateLocality)
router.get("/getlocalitydata",GetlocalityData)
router.get("/getlocalitydatabyid/:id",GetlocalityDataBYID)
router.post("/localityupdate/:id",LocalityUpdate)
router.post("/localitydelete/:id",LocalityDelete)
 module.exports =router;