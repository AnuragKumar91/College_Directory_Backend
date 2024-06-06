const express =require("express")

const router=express.Router()
  

const {CreateLocality,GetlocalityData,GetlocalityDataBYID,LocalityUpdate,LocalityDelete} =require("../../controllers/Location/localityController")

router.post("/createlocalitydata",CreateLocality)
router.get("/getlocalitydata",GetlocalityData)
router.get("/getlocalitydatabyid/:id",GetlocalityDataBYID)
router.put("/localityupdate/:id",LocalityUpdate)
router.delete("/localitydelete/:id",LocalityDelete)
 module.exports =router;