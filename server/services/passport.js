const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const mongoose = require('mongoose');

// fetch user schema from mongoose
const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  // the user here is what we just pulled out from the database
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({googleId: profile.id})
        .then((existingUser) => {
            if (existingUser) {
              console.log('found existing user in the database')
              // we already have a record with the given profile ID
              done(null, existingUser);
            } else {
              // we don't have a user record with this ID, make a new record
              new User({googleId: profile.id})
              .save()
              .then(user => {
                done(null, user)
              })
            }
        })
      // console.log("access token", accessToken);
      // console.log("refresh token", refreshToken);
      console.log("profile:", profile);
    }
  )
);
