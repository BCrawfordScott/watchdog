const users = require('./routes/api/users');
const accounts = require('./routes/api/accounts');

const router = (app) => {
  app.use('/api/users', users);
  app.use('/api/accounts', accounts);
}

module.exports = router;