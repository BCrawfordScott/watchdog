const express = require('express');
const router = express.Router();

const tester = function(req, res) {
  res.json({msg: "This is the user test route"});
}

router.get("/test", tester);

module.exports = router;