"use strict";

var _require = require('express'),
    json = _require.json;

var express = require('express');

var sequelize = require('sequelize');

var fs = require('fs');

var router = express.Router();

var User = require('../../models/User');

var db = require('../../public/javascripts/db');

var Product = require('../../models/Product');

var Category = require('../../models/Category');

var Group = require('../../models/Group');

var Provider = require('../../models/Provider');

var Favorite = require('../../models/Favorite');

var Feedback = require('../../models/Feedback');

var email;
router.post('/store-token', function _callee2(req, res, next) {
  var user, email, values;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.init());

        case 2:
          user = _context2.sent;
          email = req.body.email;
          fs.readFile(__dirname + '/../../public/JSONFiles/apiAuthData.json', 'utf-8', function _callee(err, data) {
            var index;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!err) {
                      _context.next = 2;
                      break;
                    }

                    throw err;

                  case 2:
                    values = JSON.parse(data);

                    for (index = values.length - 1; index >= 0; index--) {
                      if (values[index].eml !== email) {
                        values.splice(index, 1);
                      }
                    }

                    if (!(values[values.length - 1].tkn === req.body.token)) {
                      _context.next = 10;
                      break;
                    }

                    _context.next = 7;
                    return regeneratorRuntime.awrap(user.update({
                      api_token: req.body.token
                    }, {
                      where: {
                        email: email
                      }
                    }));

                  case 7:
                    res.json({
                      "message": "email verified successfully"
                    });
                    _context.next = 11;
                    break;

                  case 10:
                    res.json({
                      "message": "email failed to verify"
                    });

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/loadlogin', function _callee3(req, res, next) {
  var user, users;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          email = req.query.email;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.init());

        case 3:
          user = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(user.findAll({
            where: {
              email: email
            }
          }));

        case 6:
          users = _context3.sent;
          return _context3.abrupt("return", res.json({
            email: users[0].email,
            name: users[0].name,
            token: users[0].api_token
          }));

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get('/user', function _callee4(req, res, next) {
  var user, favorite, feedback, users, feedbacks, favorites;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          token = req.query.api_token;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.init());

        case 3:
          user = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Favorite.init());

        case 6:
          favorite = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(Feedback.init());

        case 9:
          feedback = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(user.findOne({
            where: {
              api_token: token
            }
          }));

        case 12:
          users = _context4.sent;
          _context4.next = 15;
          return regeneratorRuntime.awrap(feedback.count({
            where: {
              user_id: users.id
            }
          }));

        case 15:
          feedbacks = _context4.sent;
          _context4.next = 18;
          return regeneratorRuntime.awrap(favorite.count({
            where: {
              user_id: users.id
            }
          }));

        case 18:
          favorites = _context4.sent;
          return _context4.abrupt("return", res.json({
            User: users,
            Favs: favorites,
            Feeds: feedbacks
          }));

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.get('/favourite', function _callee5(req, res, next) {
  var user, users, favorite, favorites;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          token = req.query.api_token;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.init());

        case 3:
          user = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(user.findOne({
            where: {
              api_token: token
            }
          }));

        case 6:
          users = _context5.sent;
          _context5.next = 9;
          return regeneratorRuntime.awrap(Favorite.init());

        case 9:
          favorite = _context5.sent;
          _context5.next = 12;
          return regeneratorRuntime.awrap(favorite.findAll({
            where: {
              user_id: users.id
            }
          }));

        case 12:
          favorites = _context5.sent;
          return _context5.abrupt("return", res.json({
            favourits: favorites
          }));

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router.post('/favourite', function _callee6(req, res, next) {
  var user, users, product, products, favorite;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          token = req.body.api_token;
          product_id = req.body.product_id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(User.init());

        case 4:
          user = _context6.sent;
          _context6.next = 7;
          return regeneratorRuntime.awrap(user.findOne({
            where: {
              api_token: token
            }
          }));

        case 7:
          users = _context6.sent;
          _context6.next = 10;
          return regeneratorRuntime.awrap(Product.init());

        case 10:
          product = _context6.sent;
          _context6.next = 13;
          return regeneratorRuntime.awrap(product.findOne({
            where: {
              id: product_id
            }
          }));

        case 13:
          products = _context6.sent;
          _context6.next = 16;
          return regeneratorRuntime.awrap(Favorite.init());

        case 16:
          favorite = _context6.sent;
          _context6.next = 19;
          return regeneratorRuntime.awrap(favorite.create({
            user_id: users.id,
            product_id: products.id,
            name: products.name,
            image: products.image,
            link: products.link,
            price: products.price,
            available: 1
          }));

        case 19:
          return _context6.abrupt("return", res.json({
            "success": "Favorite created succesfully"
          }));

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router["delete"]('/favourite', function _callee7(req, res, next) {
  var user, users, favorite;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          token = req.query.api_token;
          favorite_id = req.query.favourite_id;
          _context7.next = 4;
          return regeneratorRuntime.awrap(User.init());

        case 4:
          user = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(user.findOne({
            where: {
              api_token: token
            }
          }));

        case 7:
          users = _context7.sent;
          _context7.next = 10;
          return regeneratorRuntime.awrap(Favorite.init());

        case 10:
          favorite = _context7.sent;
          _context7.next = 13;
          return regeneratorRuntime.awrap(favorite.destroy({
            where: {
              id_favourite: favorite_id,
              user_id: users.id
            }
          }));

        case 13:
          return _context7.abrupt("return", res.json({
            "success": "Favorite deleted succesfully"
          }));

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  });
});
router.get('/feedback', function _callee8(req, res, next) {
  var user, users, feedback, feedbacks;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          token = req.query.api_token;
          _context8.next = 3;
          return regeneratorRuntime.awrap(User.init());

        case 3:
          user = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(user.findOne({
            where: {
              api_token: token
            }
          }));

        case 6:
          users = _context8.sent;
          _context8.next = 9;
          return regeneratorRuntime.awrap(Feedback.init());

        case 9:
          feedback = _context8.sent;
          _context8.next = 12;
          return regeneratorRuntime.awrap(feedback.findAll({
            where: {
              user_id: users.id
            }
          }));

        case 12:
          feedbacks = _context8.sent;
          return _context8.abrupt("return", res.json({
            feedbacks: feedbacks
          }));

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  });
});
router.post('/feedback', function _callee9(req, res, next) {
  var user, users, feedback;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          token = req.body.api_token;
          subject = req.body.subject;
          text = req.body.text;
          _context9.next = 5;
          return regeneratorRuntime.awrap(User.init());

        case 5:
          user = _context9.sent;
          _context9.next = 8;
          return regeneratorRuntime.awrap(user.findOne({
            where: {
              api_token: token
            }
          }));

        case 8:
          users = _context9.sent;
          _context9.next = 11;
          return regeneratorRuntime.awrap(Feedback.init());

        case 11:
          feedback = _context9.sent;
          _context9.next = 14;
          return regeneratorRuntime.awrap(feedback.create({
            user_id: users.id,
            subject: subject,
            text: text
          }));

        case 14:
          return _context9.abrupt("return", res.json({
            "message": "Feedback created succesfully"
          }));

        case 15:
        case "end":
          return _context9.stop();
      }
    }
  });
});
router.post('/visit', function _callee10(req, res, next) {
  var product, products;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          token = req.body.api_token;
          products_id = req.body.product_id;
          _context10.next = 4;
          return regeneratorRuntime.awrap(Product.init());

        case 4:
          product = _context10.sent;
          _context10.next = 7;
          return regeneratorRuntime.awrap(product.findOne({
            where: {
              id: products_id
            }
          }));

        case 7:
          products = _context10.sent;
          _context10.next = 10;
          return regeneratorRuntime.awrap(product.update({
            visits: products.visits + 1
          }, {
            where: {
              id: products_id
            }
          }));

        case 10:
          return _context10.abrupt("return", res.json({
            "succes": "Visit Incremented succesfully"
          }));

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  });
});
router.get('/load', function _callee11(req, res, next) {
  var product, products, category, categories, group, groups, provider, providers, products_by_visits, products_by_best;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(Product.init());

        case 2:
          product = _context11.sent;
          _context11.next = 5;
          return regeneratorRuntime.awrap(product.findAll());

        case 5:
          products = _context11.sent;
          _context11.next = 8;
          return regeneratorRuntime.awrap(Category.init());

        case 8:
          category = _context11.sent;
          _context11.next = 11;
          return regeneratorRuntime.awrap(category.findAll());

        case 11:
          categories = _context11.sent;
          _context11.next = 14;
          return regeneratorRuntime.awrap(Group.init());

        case 14:
          group = _context11.sent;
          _context11.next = 17;
          return regeneratorRuntime.awrap(group.findAll());

        case 17:
          groups = _context11.sent;
          _context11.next = 20;
          return regeneratorRuntime.awrap(Provider.init());

        case 20:
          provider = _context11.sent;
          _context11.next = 23;
          return regeneratorRuntime.awrap(provider.findAll());

        case 23:
          providers = _context11.sent;
          _context11.next = 26;
          return regeneratorRuntime.awrap(product.findAll({
            order: sequelize.literal('visits DESC'),
            limit: 5
          }));

        case 26:
          products_by_visits = _context11.sent;
          _context11.next = 29;
          return regeneratorRuntime.awrap(product.findAll({
            where: {
              best: 1
            }
          }));

        case 29:
          products_by_best = _context11.sent;
          return _context11.abrupt("return", res.json({
            'products_by_visits': products_by_visits,
            'products_by_best': products_by_best,
            'products_all': products,
            'groups_all': groups,
            'categories_all': categories,
            'providers_all': providers
          }));

        case 31:
        case "end":
          return _context11.stop();
      }
    }
  });
});
module.exports = router;