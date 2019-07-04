require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const appKeys = require('./keys/keys');

const app = express();
const dbURI = appKeys.mongoDBURI;

mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Watchdog says, \"Woof!\""));

const port = process.env.PORT || 5000

module.exports = app.listen(port, () => console.log(`Server is running on port ${port}`));

