const mongoose = require("mongoose");
require("./user.js");
require("./pets.js");

const bookingSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
    facility: String,
    startDate: Date,
    endDate: Date,
    specialRequirements: String
});

module.exports = mongoose.model('Booking', bookingSchema);