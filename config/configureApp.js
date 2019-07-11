const bodyParser = require('body-parser');
const router = require('./router');
const winston = require('winston');
const expressWinston = require('express-winston');
const passport = require('passport');

module.exports = function(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      // winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.prettyPrint(),
    ),
  }));
  app.use(passport.initialize());
  router(app);
}