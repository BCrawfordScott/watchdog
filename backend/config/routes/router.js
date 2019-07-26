const users = require('./api/users');
const accounts = require('./api/accounts');

const router = (app) => {
  app.get("/", (req, res) => res.send("Watchdog says, \"Woof!\""));
  app.use('/api/users', users);
  app.use('/api/accounts', accounts);
}

module.exports = router;