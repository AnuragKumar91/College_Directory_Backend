const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const degreeSchema = new Schema({
  degreename: {
    type: String,
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
  metatitle: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },

  metadescription: {
    type: String,
    required: true,
  },

  metakeyword: {
    type: String,
    required: true,
  },
  ogtitle: {
    type: String,
    required: true,
  },
  ogdescription: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("degree", degreeSchema);
