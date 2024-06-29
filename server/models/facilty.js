const mongoose = require("mongoose");
require("./user.js");
require("./pets.js");

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  bookings: [
    {
      startDate: Date,
      endDate: Date,
      bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
    },
  ],
});

module.exports = mongoose.model("Facility", facilitySchema);
