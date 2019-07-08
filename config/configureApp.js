const bodyParser = require('body-parser');
const router = require('./router');
const winston = require('winston');
const expressWinston = require('express-winston');

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

  router(app);
}