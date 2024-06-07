const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  regionname: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("region", dataSchema);
