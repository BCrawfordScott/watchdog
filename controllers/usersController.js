const User = require('../models/User');
const { securePassword } = require('../util/security');

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
          })

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
  }
}