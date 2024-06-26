const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  // stream: {
  //   type: Schema.Types.ObjectId,
  //   ref: "stream",
  //   required: true,
  // },
  // degree: {
  //   type: Schema.Types.ObjectId,
  //   ref: "degree",
  //   required: true,
  // },
  stream: {
    type: Schema.Types.ObjectId,
    ref: 'stream', // Make sure 'Stream' matches the model name of your stream collection
    required: true,
  },
  degree: {
    type: Schema.Types.ObjectId,
    ref: 'degree', // Make sure 'Degree' matches the model name of your degree collection
    required: true,
  },
  coursename: {
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
  ogimage: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("course", courseSchema);
