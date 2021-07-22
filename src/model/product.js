const { Schema, model } = require("mongoose");
const schema = new Schema({
  title: {
    type: String,
    reqired: true,
  },
  prise: {
    type: Number,
    reqired: true,
  },
  type: {
    type: String,
    reqired: true,
  },
  image: {
    type: String,
  },
});
module.exports = model("Product", schema);
