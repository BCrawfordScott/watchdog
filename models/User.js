const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    default: function() {
      return this.email ? this.email.split("@")[0] : null
    },
  },
  password: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
  },
  accounts: {
    type: [ObjectId],
    required: true,
    default: [],
  }
});

const User = model('users', UserSchema);

module.exports = User;

