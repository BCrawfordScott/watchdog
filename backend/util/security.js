const bcrypt = require('bcryptjs');

module.exports = {
  securePassword: (password, cb) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        cb(hash);
      });
    });
  }
}