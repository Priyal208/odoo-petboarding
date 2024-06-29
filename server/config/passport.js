const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../models/user.js");

passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) return done(null, false, { message: "Incorrect email" });
  
          const passMatch = await user.isValidPassword(password);
          if (!passMatch)
            return done(null, false, { message: "Incorrect password" });
  
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    try {
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  
  module.exports = passport;