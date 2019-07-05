const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type:[ObjectId],
    unique: true,
  },
  holders: {
    type:[ObjectId],
    unique: true,
  },
  photoURL: {
    type: String,
  }
});

AccountSchema.index({ name: 1, admin: 1 }, { unique: true });

const Account = model('acount', AccountSchema);

module.exports = Account;