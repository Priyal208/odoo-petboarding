const cron = require("node-cron");
const Booking = require("../models/booking.js");
const Facility = require("../models/facility.js");

// Schedule task to run every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running capacity adjustment task");

  // Get current date
  const today = new Date();

  // Find all bookings that have ended
  const endedBookings = await Booking.find({ endDate: { $lt: today } });

  // Adjust facility capacity for each ended booking
  for (const booking of endedBookings) {
    const facility = await Facility.findById(booking.facility);
    if (facility) {
      facility.currentCapacity -= 1;
      if (facility.currentCapacity < 0) {
        facility.currentCapacity = 0;
      }
      await facility.save();
    }
  }
});