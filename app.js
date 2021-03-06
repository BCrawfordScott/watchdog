require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const configure = require('./backend/config/configureApp');
const setup = require('./backend/config/setupDB');

const app = express();
configure(app);
setup(mongoose);

const port = process.env.PORT || 5000

module.exports = app.listen(port, () => console.log(`Server is running on port ${port}`));