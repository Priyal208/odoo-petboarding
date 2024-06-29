const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.js");
const Facility = require("../models/facility.js");
const asyncMiddleware = require("../utils/asyncMiddleware.js");

router.post(
  "/booking",
  asyncMiddleware(async (req, res, next) => {
    const {
      ownerId,
      petId,
      facilityId,
      startDate,
      endDate,
      specialRequirements,
    } = req.body;

    // Find the facility by ID
    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Facility not found",
      });
    }

    // Create new booking
    const newBooking = new Booking({
      ownerId,
      petId,
      facility: facilityId,
      startDate,
      endDate,
      specialRequirements,
    });

    await newBooking.save();

    // Decrease the facility's current capacity by 1
    facility.currentCapacity += 1;
    await facility.save();

    res.json({
      success: true,
      status: 200,
      message: "Booking successful",
      data: newBooking,
    });
  })
);

module.exports = router;
