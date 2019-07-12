const JwtStrategy = require('passport-jwt').Strategy;
  const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const { jwtKey } = require('../keys/keys');

const User = mongoose.model('users');
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtKey,
};

module.exports = {
  jwtStrategy: passport => {
    passport.use(new JwtStrategy(options, (jwtPayload, done) => {
      const { id } = jwtPayload;
      User.findById(id).then(
        user => user ? done(null, user) : done(null, false),
        err => console.log(err)
      )
    }));
  },
}

