const mongoose =require("mongoose")

const Schema = mongoose.Schema;



const countrySchema = new Schema({
  countryname: {
    type: String,
    required: true
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: 'region',
    required: true
  }
});
    
module.exports=mongoose.model("country",countrySchema)