const { Schema, model } = require("mongoose");
const schema = new Schema({
  login: String,
  password: String,
  position: String,
  important: Number,
  email: String,
  phone: Number,
  year: String,
  image: String,
  ip: String,
  ban: Boolean,
});
module.exports = model("users", schema);
