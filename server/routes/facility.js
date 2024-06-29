const express = require("express");
const router = express.Router();
const Facility = require("../models/facilty.js");
const asyncMiddleware = require("../utils/asyncMiddleware.js");

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

router.get("/availableFacility",
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
    }))

module.exports = router;
