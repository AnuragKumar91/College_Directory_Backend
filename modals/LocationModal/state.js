const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema({
  statename: {
    type: String,
    required: true,
  },

  country: {
    type: Schema.Types.ObjectId,
    ref: "country",
    required: true,
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: "region",
    required: true,
  },
  aboutstate: {
    type: String,
    required: true,
  },
  population: {
    type: String,
    required: true,
  },
  chiefminister: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  map: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
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
  ogimage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("state", stateSchema);
