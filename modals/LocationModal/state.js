const mongoose =require("mongoose")
const Schema = mongoose.Schema;

const stateSchema= new Schema({
    statename: {
       type: String,
       required: true
     },
  
     country: {
      type: Schema.Types.ObjectId,
      ref: 'country',
      required: true
    },
    region: {
      type: Schema.Types.ObjectId,
      ref: 'region',
      required: true
    }
     
   })
   
   
module.exports=mongoose.model("state",stateSchema)