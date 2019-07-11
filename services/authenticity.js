const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { securePassword } = require('../util/security');
const { jwtKey } = require('../keys/keys.js');
const User = require('../models/User');

// Set the expiration time for the web token
const EXPIRE = { expiresIn: 3600 };
const AUTH_ERROR = { auth: 'Invalid email or password' };

const assignToken = function(payload, res) {
  jwt.sign(payload, jwtKey, EXPIRE, (err, token) => {
    if (err) throw err;
    res.json({
      success: true,
      token: `Bearer ${token}`,
    });
  });
}

module.exports = {
  registerUser: function (user, req, res) {
    if (user) {
      console.log(user);
      return res.status(400).json({ email: 'That email is not available' })
    } else {
      const { email, username, password, photoUrl, accounts } = req.body;
      const user = new User({
        email,
        username,
        photoUrl,
        accounts,
        password,
      });

      securePassword(user.password, hash => {
        user.password = hash;
        user.save()
          .then(user => res.json(user))
          .catch(err => {
            console.log(err);
            return res.status(422).json(err);
          })
      })
    }
  },

  loginUser: function (user, password, res) {
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }

    compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          const { id, email } = user;
          const payload = { id, email };
          assignToken(payload, res);
        } else {
          return res.status(401).json(AUTH_ERROR);
        }
      });
  }
};