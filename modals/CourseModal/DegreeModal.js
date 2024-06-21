const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const degreeSchema = new Schema({

degreename:{
    type:String,
    required: true,
    unique: true,
},
titles: [
    {
      type: String,
      required: false,
    },
  ],
  descriptions: [
    {
      type: String,
      required: false,
    },
  ],
});

module.exports = mongoose.model("degree", degreeSchema);
