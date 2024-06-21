const mongoose =require("mongoose")

const Schema=mongoose.Schema

const streamSchema=new Schema({
      streamname: {
    type: String,
    required: true,
    unique: true,
  },
  shortdescription: {
    type: String,
    required: true,
  },
  longdescription: {
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
  icon: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
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
})
module.exports = mongoose.model("stream", streamSchema);
