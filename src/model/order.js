const { Schema, model } = require("mongoose");
const schema = new Schema({
  id: String,
  basket: Array,
  date: Date,
});
module.exports = model("order", schema);
