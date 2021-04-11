"use strict";

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var session = require("express-session");

var SequelizeStore = require('connect-session-sequelize')(session.Store);

var sequelize = require('./public/javascripts/db').sequelize;

var indexRouter = require('./routes/main');

var usersRouter = require('./routes/users');

var identificationRouter = require("./routes/auth");

var productsrouter = require("./routes/products");

var apirouter = require('./routes/api/api');

var app = express();
/************************************************************** HANDLING SESSIONS + AUTHANTIFICATION ********************************************************/

var ONE_HOUR = 1000 * 3600;
var _process$env = process.env,
    _process$env$SESS_SEC = _process$env.SESS_SECRET,
    SESS_SECRET = _process$env$SESS_SEC === void 0 ? '/#/#!!^EURTP^!!#/#/' : _process$env$SESS_SEC,
    _process$env$NODE_ENV = _process$env.NODE_ENV,
    NODE_ENV = _process$env$NODE_ENV === void 0 ? 'developpement' : _process$env$NODE_ENV,
    _process$env$SESS_LIF = _process$env.SESS_LIFETIME,
    SESS_LIFETIME = _process$env$SESS_LIF === void 0 ? ONE_HOUR : _process$env$SESS_LIF,
    _process$env$SESS_NAM = _process$env.SESS_NAME,
    SESS_NAME = _process$env$SESS_NAM === void 0 ? 'sid' : _process$env$SESS_NAM;
var IN_PROD = NODE_ENV === "production";
var SQLStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 3600,
  // The interval at which to cleanup expired sessions in milliseconds.
  expiration: ONE_HOUR
});
var sess = session({
  name: SESS_NAME,
  secret: SESS_SECRET,
  store: SQLStore,
  resave: false,
  // we support the touch method so per the express-session docs this should be set to false
  proxy: true,
  // if you do SSL outside of node.
  cookie: {
    //maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD
  }
});
app.use('/auth', sess);
SQLStore.sync();
/***************************************************************** VALUES FOR EMAIL HANDLER : nodemailer ****************************************************************/
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', identificationRouter);
app.use('/products', productsrouter);
app.use('/api', apirouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;