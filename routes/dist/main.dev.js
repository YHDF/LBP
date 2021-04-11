"use strict";

var express = require('express');

var router = express.Router(); //var redirectLogin = require('./auth').redirectLogin;

/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('mainmenu', {
    title: 'HotPrice'
  });
});
module.exports = router;