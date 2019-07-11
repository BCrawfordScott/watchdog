const { Strategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const { jwtKey } = require('../keys/keys');

const User = mongoose.model('users');
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtKey,
};

module.exports = {
  strategize: passport => {
    passport.use(new Strategy(options, (jwtPayload, done) => {
      const { id } = jwtPayload;
      User.findById(id).then(
        user => user ? done(null, user) : done(null, false),
        err => console.log(err)
      )
    }));
  },
}

