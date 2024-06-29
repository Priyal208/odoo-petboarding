const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../utils/asyncMiddleware.js");

router.post(
  "/pets",
  asyncMiddleware(async (req, res) => {
    const { ownerId, name, breed, age, specialNeeds } = req.body;
    const newPet = new Pet({ ownerId, name, breed, age, specialNeeds });
    await newPet.save();
    res.json({
        success: true,
        status: 200,
        message: "Pet registered successfully",
        data: null,
      })
  })
);

module.exports = router;
