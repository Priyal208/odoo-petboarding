const mongoose = require("mongoose");
require("./user.js");

const petSchema = new mongoose.Schema({
  petOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  breed: String,
  age: Number,
  specialNeeds: String,
});

module.exports = mongoose.model("Pet", petSchema);
