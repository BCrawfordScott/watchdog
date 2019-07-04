const bodyParser = require('body-parser');
const router = require('./router');

module.exports = function(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  router(app);
}