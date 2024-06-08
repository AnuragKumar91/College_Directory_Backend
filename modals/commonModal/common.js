// commonSchema.js
const mongoose = require("mongoose");

const commonSchema = new mongoose.Schema({
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

module.exports = commonSchema;
