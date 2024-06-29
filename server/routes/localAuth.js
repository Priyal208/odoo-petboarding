const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/asyncMiddleware.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const loggedin = require("../middleware/loggedin.js");
const passport = require("passport");
const Joi = require("joi");

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string()
        .min(8)
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
        )
        .required()
        .messages({
          "string.pattern.base":
            "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.",
        }),
        phoneNumber: Joi.string(),
        fullName: Joi.string(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({
        status: 400,
        success: false,
        message: error.details[0].message,
      });

    const { email, password, fullName, phoneNumber } = req.body;

    const userRepeated = await User.findOne({ email });
    if (userRepeated)
      return res.status(400).json({
        success: false,
        status: 400,
        message: "User with the given email already exists",
        data: null,
      });

    const salt = await bcrypt.genSalt(10);
    const user = new User({
      email,
      password: await bcrypt.hash(password, salt),
      fullName,
      phoneNumber,
    });
    await user.save();

    req.logIn(user, (error) => {
      if (error) return next(error);
      res.json({
        success: true,
        status: 200,
        message: "User registered successfully",
        data: { id: user._id, email: user.email, isAdmin: user.isAdmin },
      });
      //redirect remaining
      //res.redirect("http://localhost:3001/boardpets");
    });
  })
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  const { _id, email, isAdmin } = req.user;

  return res.status(200).json({
    success: true,
    status: 200,
    message: "Logged in successfully",
    data: { _id, email, isAdmin },
  });
});

router.post("/logout", loggedin, (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.clearCookie("connect.sid");

      res.json({
        success: true,
        status: 200,
        message: "Logged out successfully",
        data: null,
      });
    });
  });
});

module.exports = router;
