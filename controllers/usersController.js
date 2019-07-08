const { compare } = require('bcryptjs');
const User = require('../models/User');
const { securePassword } = require('../util/security');
const keys = require('../keys/keys.js');

module.exports = {
  register: function(req, res) {
    User.findOne({ email: req.body.email }).then(
      user => {
        if(user) {  
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
                res.status(422).json(err);
              })
          })
        }
      }
    );
  },
  login: function(req, res) {
    const { email, password } = req.body;
    const authError = { auth: 'Invalid email of password' };

    User.findOne({email})
      .then(user => {
        if (!user) {
          return res.status(401).json(authError);
        }

        compare(password, user.password)
          .then(isMatch => {
            if(isMatch) {
              res.json({ msg: 'Success' });
            } else {
              return res.status(401).json(authError);
            }
          });
      });
  },
}