const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.js");
const asyncMiddleware = require("../utils/asyncMiddleware.js");

router.post(
  "booking",
  asyncMiddleware(async(req, res, next) => {
    const {
      ownerId,
      petId,
      facility,
      startDate,
      endDate,
      specialRequirements,
    } = req.body;

    const newBooking = new Booking({
        ownerId,
        petId,
        facility,
        startDate,
        endDate,
        specialRequirements
    });

    await newBooking.save();
    res.json({
        success: true,
        status: 200,
        message: "Booking successfull",
        data: newBooking,
      });
  }
)
);

module.exports = router;
