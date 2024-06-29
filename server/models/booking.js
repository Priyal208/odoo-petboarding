const mongoose = require("mongoose");
require("./user.js");
require("./pets.js");

const bookingSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
    facility: String,
    startDate: Date,
    endDate: Date,
    specialRequirements: String
});

module.exports = mongoose.model('Booking', bookingSchema);