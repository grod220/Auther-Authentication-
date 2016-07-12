'use strict';


var router = require('express').Router();

router.put('/', function (req, res, next) {
  // console.log(req.session);
  req.session.destroy();
  res.sendStatus(204);
});



module.exports = router;
