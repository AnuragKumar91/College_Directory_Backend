const mongoose=require("mongoose");

const dataSchema=new mongoose.Schema({
    regionname:{
    type:String
    },
   
});

module.exports=mongoose.model("region",dataSchema)