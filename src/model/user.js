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
});
module.exports = model("users", schema);
