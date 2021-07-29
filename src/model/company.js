const { Schema, model } = require("mongoose");
const schema = new Schema({
  title: String,
  address: String,
  contactPerson: String,
  phone: Number,
  citiesSale: Array,
  type: String,
  logo: String,
});
module.exports = model("company", schema);
