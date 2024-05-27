const mongoose =require("mongoose")
const Schema = mongoose.Schema;
const localitySchema=new Schema({
    localityname:{
        type:String,
        required: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'city',
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

module.exports=mongoose.model("locality",localitySchema)