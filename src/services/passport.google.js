const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
require('dotenv').config()
const User = require('../modules/user.mongo')

const googleClientID = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET


function initGooglePassport() {
  passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
    async function (accessToken, refreshToken, profile, cb) {
      const newUser = {
        name: profile.displayName,
        username: profile.emails[0].value
      }
      try {
        let user = await User.findOne({ googleId: profile.id })
        if (user) {
          cb(null, user)
        }
        else {
          user = await User.create(newUser)
          cb(null, user)
        }
      } catch (err) {
        console.error(err)
      }
    }
  ));
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    const data = {}
    try {
      const data = await User.findById(id)
      done(null,data);
    } catch (err) {
      done(err,data)
    }
  })
}
module.exports = initGooglePassport 