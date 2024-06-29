const mongoose = require("mongoose");
require("./user.js");
require("./pets.js");

const bookingSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Facility",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  specialRequirements: { type: String },
});

module.exports = mongoose.model("Booking", bookingSchema);

