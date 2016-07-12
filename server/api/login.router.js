'use strict';

var router = require('express').Router();
var User = require('./users/user.model')

router.post('/', function (req, res, next) {
  console.log(req.body)
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      res.sendStatus(204);
      // setTimeout(function(){
      //   req.session.userId = undefined;
      //   console.log('and gone!!');
      // },10000);
    }
  })
  .catch(next);
});

module.exports = router;
