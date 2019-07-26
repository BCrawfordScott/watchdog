const { Schema, model } = require('mongoose');
const { Types: { ObjectId } } = Schema;

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type:[{ type: ObjectId, ref: 'User' }],
    unique: true,
    required: true,
  },
  holders: {
    type: [{ type: ObjectId, ref: 'User' }],
    unique: true,
    default: [],
  },
  photoURL: {
    type: String,
  }
});

// AccountSchema.index({ name: 1, admin: 1 }, { unique: true });

const Account = model('acount', AccountSchema);

module.exports = Account;