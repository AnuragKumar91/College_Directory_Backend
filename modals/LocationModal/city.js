const mongoose=require("mongoose")
const Schema = mongoose.Schema;
const citySchema=new  Schema({
    cityname:{
        type:String,
        required: true
    }, 
     state: {
        type: Schema.Types.ObjectId,
        ref: 'state',
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
      },
})

module.exports=mongoose.model("city",citySchema)