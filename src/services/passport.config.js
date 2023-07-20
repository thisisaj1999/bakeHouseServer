const LocalStrategy = require('passport-local').Strategy
const User = require('../modules/user.mongo')
const bcrypt = require('bcrypt')

function intitalizePassport(passport){
  passport.use(
    new LocalStrategy(async (username, password, done) => {

      try {
        const user = await User.findOne({ username: username });
        if (!user) { return done(null, false); }
        if ( bcrypt.compare(password, user.password)) return done(null, user)
        else { return done(null, false); }

      } catch (err) {
        return done(err, false)
      }
    }
    ));
    passport.serializeUser((user,done) => {
      done(null,user.id)
    })
    passport.deserializeUser(async(id,done) => {
      try{
        const user = await User.findById(id);
        done(null,user);
      }catch(error){
        done(error,false)
      }
    });
}


module.exports = intitalizePassport