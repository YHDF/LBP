"use strict";

var bcrypt = require('bcrypt');

var saltRounds = 10;

function hash(req, res, next) {
  var hasher;
  return regeneratorRuntime.async(function hash$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(encrypt());

        case 2:
          hasher = _context.sent;
          return _context.abrupt("return", hasher);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function encrypt() {
  return new Promise(function _callee2(resolve, reject) {
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            bcrypt.hash(password, saltRounds, function _callee(err, hash) {
              return regeneratorRuntime.async(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      resolve(hash);

                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
}

module.exports.hash = hash;