const bodyParser = require('body-parser');
const router = require('./routes/router');
const winston = require('winston');
const expressWinston = require('express-winston');
const passport = require('passport');
const favicon = require('serve-favicon');
const path = require('path');
const { jwtStrategy } = require('./passportStrategy');

module.exports = function(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.prettyPrint(),
    ),
  }));
  app.use(passport.initialize());
  jwtStrategy(passport);
  app.use(favicon(path.join(__dirname, '..', '..', 'assets', 'public', 'favicon.ico')))
  router(app);
}