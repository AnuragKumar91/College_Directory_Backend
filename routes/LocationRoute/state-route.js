const express =require("express")

const router=express.Router()

const {CreateState,GetStateData,GetStateDataBYID,StateUpdate,StateDelete}=require("../../controllers/Location/stateController")


router.post("/statedata",CreateState)
router.get('/getstatedata', GetStateData);
router.get("/getstatedataid/:id",GetStateDataBYID)
router.put("/stateupdate/:id",StateUpdate)
router.delete("/statedelete/:id",StateDelete)

module.exports = router;