const mongoose = require("mongoose");
const commonSchema = require("../commonModal/common");
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  countryname: {
    type: String,
    required: true,
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: "region",
    required: true,
  },
  aboutcountry: {
    type: String,
    required: true,
  },
  foodculture: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  primeminister: {
    type: String,
    required: true,
  },
  president: {
    type: String,
    required: true,
  },
  population: {
    type: String,
    required: true,
  },

  // status: {
  //   type: String,
  //   required: true,
  // },
  rank: {
    type: String,
    required: true,
  },

  populationByReligion:  {
      type: String,
      required: true,
    },

    logo: {
    type: String,
    required: true,
  },
  map: {
    type: String,
    required: true,
  },
  flag: {
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
  commonFields: {
    type: commonSchema,
    required: true,
  },
});

module.exports = mongoose.model("country", countrySchema);
