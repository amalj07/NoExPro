const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');


module.exports = (passport) => {
  //Implement local strategy
  passport.use(new LocalStrategy( (username, password, done) => {
    //Match username
    let query = {username:username};
    User.findOne(query, (err, user) => {
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found!'});
      }

      //Match password
      let query = {password: password}
      if(password != user.password) {
        return done(null, false, {message: 'Wrong password!'});
      } else {
        return done(null, user);
      }
    });
  }));

  passport.serializeUser( (user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
