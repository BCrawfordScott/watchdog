const { Schema, model } = mongoose;
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
    default: () => this.email.split("@")[0],
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

