const express = require("express");
const router = express.Router();
const Facility = require("../models/facility.js");
const asyncMiddleware = require("../utils/asyncMiddleware.js");
const Booking = require('../models/booking.js')

router.post(
  "/facility",
  asyncMiddleware(async (req, res, next) => {
    const { name, capacity } = req.body;
    const newFacility = new Facility({ name, capacity });
    await newFacility.save();
    res.json({
      success: true,
      status: 200,
      message: "Facility registered successfully",
      data: newFacility,
    });
  })
);

router.post(
  "/availableFacility",
  asyncMiddleware(async (req, res, next) => {
    const facilityId  = '667ff1108ed612f85ebeeea0';

    // Find the facility by ID
    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Facility not found",
      });
    }

    // Calculate the date range
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    // Find all bookings for the facility in the next 30 days
    const bookings = await Booking.find({
      facility: facilityId,
      $or: [
        { startDate: { $lte: thirtyDaysFromNow, $gte: today } },
        { endDate: { $lte: thirtyDaysFromNow, $gte: today } },
        { startDate: { $lte: today }, endDate: { $gte: today } },
      ],
    });

    // Initialize a map to track bookings per date
    const dateMap = new Map();

    // Populate the map with booking counts
    bookings.forEach((booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);

      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split("T")[0];
        dateMap.set(dateString, (dateMap.get(dateString) || 0) + 1);
      }
    });

    // Find dates with full capacity
    const fullCapacityDates = [];
    for (
      let d = new Date(today);
      d <= thirtyDaysFromNow;
      d.setDate(d.getDate() + 1)
    ) {
      const dateString = d.toISOString().split("T")[0];
      if (dateMap.get(dateString) >= facility.capacity) {
        fullCapacityDates.push(dateString);
      }
    }

    res.json({
      success: true,
      status: 200,
      message: "Full capacity dates retrieved successfully",
      data: fullCapacityDates,
    });
  })
);

module.exports = router;
