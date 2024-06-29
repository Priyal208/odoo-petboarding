const mongoose = require("mongoose");
require("./user.js");
require("./pets.js");

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  currentCapacity: {type:Number, default: 0},
});

module.exports = mongoose.model("Facility", facilitySchema);
