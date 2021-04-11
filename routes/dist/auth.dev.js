"use strict";

var express = require('express');

var router = express.Router();

var bcrypt = require('bcrypt');

var nodemailer = require('nodemailer');

var cors = require('cors');

var fs = require('fs');

var saltRounds = 10;

var User = require('../models/User');

var db = require('../public/javascripts/db');

var hasher = require('../public/javascripts/hash');

var bodyparser = express.json();
var token = email = password = username = "";
router.use(cors({
  origin: 'http://localhost:3000'
}));
var host_email = 'uness.houdaifa@gmail.com';
var host_password = 'yhix2012';
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: host_email,
    pass: host_password
  }
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/join', function (req, res, next) {
  res.render('signup');
});
router.post('/connect', bodyparser, function _callee(req, res, next) {
  var user, users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;
          password = req.body.password;
          req.session.email = email;
          _context.next = 5;
          return regeneratorRuntime.awrap(User.init());

        case 5:
          user = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(user.findAll());

        case 8:
          users = _context.sent;
          users.forEach(function (user) {
            if (user.email === email && bcrypt.compareSync(password, user.password) == true) {
              token = req.session.token = user.api_token;
              return res.redirect("http://localhost:3000");
            }
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/create', function _callee12(req, res, next) {
  var rand_num;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          password = req.body.password;
          email = req.body.email;
          username = req.body.username;
          req.session.email = email;
          db.connect();
          _context12.next = 7;
          return regeneratorRuntime.awrap(hasher.hash().then(function _callee2(value) {
            var user;
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(User.init());

                  case 2:
                    user = _context2.sent;
                    _context2.next = 5;
                    return regeneratorRuntime.awrap(user.create({
                      name: req.body.username,
                      email: req.body.email,
                      password: value
                    }));

                  case 5:
                    user = _context2.sent;

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          }));

        case 7:
          rand_num = Math.floor(Math.random() * 1000);
          bcrypt.hash(rand_num.toString(), saltRounds, function _callee11(err, hash) {
            return regeneratorRuntime.async(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    return _context11.abrupt("return", new Promise(function _callee3(resolve, reject) {
                      return regeneratorRuntime.async(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              resolve(hash);

                            case 1:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      });
                    }).then(function _callee10(value) {
                      return regeneratorRuntime.async(function _callee10$(_context10) {
                        while (1) {
                          switch (_context10.prev = _context10.next) {
                            case 0:
                              return _context10.abrupt("return", new Promise(function _callee5(resolve, reject) {
                                var text, mailOptions;
                                return regeneratorRuntime.async(function _callee5$(_context5) {
                                  while (1) {
                                    switch (_context5.prev = _context5.next) {
                                      case 0:
                                        token = value.slice(value.length - 8);
                                        text = "Your Verification token is : ".concat(token, "  ");
                                        mailOptions = {
                                          from: host_email,
                                          to: email,
                                          subject: 'Hot Price : Your Verification token',
                                          text: text
                                        };
                                        _context5.next = 5;
                                        return regeneratorRuntime.awrap(transporter.sendMail(mailOptions, function _callee4(error, info) {
                                          return regeneratorRuntime.async(function _callee4$(_context4) {
                                            while (1) {
                                              switch (_context4.prev = _context4.next) {
                                                case 0:
                                                  if (error) {
                                                    console.log(error);
                                                  } else {
                                                    console.log('Email sent: ' + info.response);
                                                    resolve(token);
                                                  }

                                                case 1:
                                                case "end":
                                                  return _context4.stop();
                                              }
                                            }
                                          });
                                        }));

                                      case 5:
                                      case "end":
                                        return _context5.stop();
                                    }
                                  }
                                });
                              }).then(function _callee9(value) {
                                var apiAuthData;
                                return regeneratorRuntime.async(function _callee9$(_context9) {
                                  while (1) {
                                    switch (_context9.prev = _context9.next) {
                                      case 0:
                                        apiAuthData = {
                                          eml: email,
                                          tkn: token
                                        };
                                        _context9.next = 3;
                                        return regeneratorRuntime.awrap(fs.readFile(__dirname + '/../public/JSONFiles/apiAuthData.json', 'utf-8', function _callee8(err, data) {
                                          var array;
                                          return regeneratorRuntime.async(function _callee8$(_context8) {
                                            while (1) {
                                              switch (_context8.prev = _context8.next) {
                                                case 0:
                                                  if (!err) {
                                                    _context8.next = 2;
                                                    break;
                                                  }

                                                  throw err;

                                                case 2:
                                                  array = JSON.parse(data);
                                                  array.push(apiAuthData);
                                                  array = JSON.stringify(array);
                                                  _context8.next = 7;
                                                  return regeneratorRuntime.awrap(fs.open(__dirname + '/../public/JSONFiles/apiAuthData.json', 'w', function _callee7(err, fd) {
                                                    return regeneratorRuntime.async(function _callee7$(_context7) {
                                                      while (1) {
                                                        switch (_context7.prev = _context7.next) {
                                                          case 0:
                                                            _context7.next = 2;
                                                            return regeneratorRuntime.awrap(fs.writeFile(fd, array, 'utf-8', function _callee6(err) {
                                                              return regeneratorRuntime.async(function _callee6$(_context6) {
                                                                while (1) {
                                                                  switch (_context6.prev = _context6.next) {
                                                                    case 0:
                                                                      _context6.next = 2;
                                                                      return regeneratorRuntime.awrap(fs.close(fd, function (err) {
                                                                        if (err) throw err;
                                                                      }));

                                                                    case 2:
                                                                      if (!err) {
                                                                        _context6.next = 4;
                                                                        break;
                                                                      }

                                                                      throw err;

                                                                    case 4:
                                                                    case "end":
                                                                      return _context6.stop();
                                                                  }
                                                                }
                                                              });
                                                            }));

                                                          case 2:
                                                          case "end":
                                                            return _context7.stop();
                                                        }
                                                      }
                                                    });
                                                  }));

                                                case 7:
                                                case "end":
                                                  return _context8.stop();
                                              }
                                            }
                                          });
                                        }));

                                      case 3:
                                      case "end":
                                        return _context9.stop();
                                    }
                                  }
                                });
                              }));

                            case 1:
                            case "end":
                              return _context10.stop();
                          }
                        }
                      });
                    }));

                  case 1:
                  case "end":
                    return _context11.stop();
                }
              }
            });
          });
          res.redirect('/auth/validate-token/');

        case 10:
        case "end":
          return _context12.stop();
      }
    }
  });
});
router.post('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      return res.redirect('/');
    }

    res.clearCookie(SESS_NAME);
    res.redirect('/');
  });
});
router.get('/validate-token', function (req, res, next) {
  res.render('tokenize');
});
router.post('/store-token', function _callee14(req, res, next) {
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(fs.readFile(__dirname + '/../public/JSONFiles/apiAuthData.json', 'utf-8', function _callee13(err, data) {
            var array, index, user;
            return regeneratorRuntime.async(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    if (!err) {
                      _context13.next = 2;
                      break;
                    }

                    throw err;

                  case 2:
                    array = JSON.parse(data);
                    console.log(array.length);
                    index = array.length - 1;

                  case 5:
                    if (!(index >= 0)) {
                      _context13.next = 24;
                      break;
                    }

                    console.log(array[index]);

                    if (!(array[index].eml === req.session.email)) {
                      _context13.next = 21;
                      break;
                    }

                    console.log("done");
                    _context13.next = 11;
                    return regeneratorRuntime.awrap(User.init());

                  case 11:
                    user = _context13.sent;

                    if (!(array[index].tkn === req.body.token)) {
                      _context13.next = 19;
                      break;
                    }

                    _context13.next = 15;
                    return regeneratorRuntime.awrap(user.update({
                      api_token: req.body.token,
                      admin_id: Math.random()
                    }, {
                      where: {
                        email: array[index].eml
                      }
                    }));

                  case 15:
                    token = req.session.token = req.body.token;
                    res.redirect('http://localhost:3000');
                    _context13.next = 20;
                    break;

                  case 19:
                    res.redirect('/');

                  case 20:
                    return _context13.abrupt("break", 24);

                  case 21:
                    index--;
                    _context13.next = 5;
                    break;

                  case 24:
                  case "end":
                    return _context13.stop();
                }
              }
            });
          }));

        case 2:
        case "end":
          return _context14.stop();
      }
    }
  });
});
module.exports = router;