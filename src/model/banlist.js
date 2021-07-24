const { Schema, model } = require("mongoose");
const schema = new Schema({
  ip: String,
  account: Object,
});
module.exports = model("BlackList", schema);
