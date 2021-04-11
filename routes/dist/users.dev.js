"use strict";

var express = require('express');

var router = express.Router();
var router = express.Router();

var cors = require('cors');

var Session = require('../models/Session');
/* this is required to store the session_token after we send the request to another doamain ex : localhost:3000 */


router.use(cors({
  origin: 'http://localhost:3000'
}));
/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/checkauthentification', function _callee(req, res, next) {
  var session_data, session, sessions, sess, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          session_data = null;
          _context.next = 3;
          return regeneratorRuntime.awrap(Session.init());

        case 3:
          session = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(session.findAll());

        case 6:
          sessions = _context.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 10;
          _iterator = sessions[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 25;
            break;
          }

          sess = _step.value;
          session_data = sess.data;
          session_data = JSON.parse(session_data);

          if (session_data.email) {
            _context.next = 21;
            break;
          }

          console.log("Not Authenticated");
          return _context.abrupt("return", res.json({
            "message": "Not Authenticated"
          }));

        case 21:
          return _context.abrupt("return", res.json({
            "message": "Authenticated"
          }));

        case 22:
          _iteratorNormalCompletion = true;
          _context.next = 12;
          break;

        case 25:
          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](10);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 31:
          _context.prev = 31;
          _context.prev = 32;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 34:
          _context.prev = 34;

          if (!_didIteratorError) {
            _context.next = 37;
            break;
          }

          throw _iteratorError;

        case 37:
          return _context.finish(34);

        case 38:
          return _context.finish(31);

        case 39:
          return _context.abrupt("return", res.json({
            "message": "Not Authenticated"
          }));

        case 40:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[10, 27, 31, 39], [32,, 34, 38]]);
});
module.exports = router;