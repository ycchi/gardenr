/* eslint-disable no-new */

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv').config();
const User = require("../models/user")
// eslint-disable-next-line no-unused-vars
const keys = require('./keys');



passport.serializeUser((user, done) => {
   done(null, user.id);
});  

passport.deserializeUser((id, done) => {
   User.findById(id)
      .then((user) => {
         done(null, user);
      }) 
});

passport.use(
   new GoogleStrategy({
      // options for the google strategy
      // change URL when deploying
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GoogleClientID,
      clientSecret: process.env.GoogleClientSecret
   }, (accessToken, refreshToken, profile, done) => {
      // check if  user already exist in db
      User.findOne({googleId: profile.id})
         .then((currentUser) => {
            if(currentUser) {
               // already have user
               console.log(`User is: ${currentUser}`);
               done(null, currentUser);
            } else {
               // if not, create user in db
               new User({
                  username: profile.displayName,
                  googleId: profile.id
               })
               .save()
               .then((newUser) => {
                  console.log(`NEW USER CREATED: ${newUser}`);
                  done(null, newUser);
               })
            }
         })

      
   })
) 