const appKeys = require('../../keys/keys');

const dbURI = appKeys.mongoDBURI;

module.exports = function(mongoose) {
  mongoose
    .connect(dbURI, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log(err));
}