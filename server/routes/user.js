const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../utils/asyncMiddleware.js");
const loggedin = require("../middleware/loggedin.js");

router.get(
  "/getUser",
  loggedin,
  asyncMiddleware((req, res, next) => {
    res.json(req.user);
  })
);

module.exports = router;
