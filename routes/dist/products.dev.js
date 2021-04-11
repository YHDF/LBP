"use strict";

var express = require('express');

var router = express.Router();

var Product = require('../models/Product');

var Category = require('../models/Category');

var User = require('../models/User');

var Provider = require('../models/Provider');

var cors = require('cors');
/*************************************************    PRODUCTS ROUTER    ************************************************************/

/******enabling CORS for Front End Server************/


router.use(cors({
  origin: 'http://localhost:3000'
}));
/****************************************************/

/* GET home page. */

router.get('/all', function _callee(req, res, next) {
  var product, products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Product.init());

        case 2:
          product = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(product.findAll());

        case 5:
          products = _context.sent;
          res.json(products);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/category', function _callee2(req, res, next) {
  var category, categories, user, users, admin_names, category_arr, n;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Category.init());

        case 2:
          category = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(category.findAll());

        case 5:
          categories = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(User.init());

        case 8:
          user = _context2.sent;
          _context2.next = 11;
          return regeneratorRuntime.awrap(user.findAll());

        case 11:
          users = _context2.sent;
          admin_names = [];
          categories.forEach(function (element) {
            users.forEach(function (elt) {
              if (elt.admin_id === element.admin_id) {
                admin_names.push(elt.name);
                return false;
              }
            });
          });
          category_arr = [];

          for (n = 0; n < categories.length; n++) {
            category_arr.push({
              "categories": categories[n],
              "admin_name": admin_names[n]
            });
          }

          res.send(category_arr);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/provider', function _callee3(req, res, next) {
  var provider, providers, user, users, admin_names, provider_arr, n;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Provider.init());

        case 2:
          provider = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(provider.findAll());

        case 5:
          providers = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(User.init());

        case 8:
          user = _context3.sent;
          _context3.next = 11;
          return regeneratorRuntime.awrap(user.findAll());

        case 11:
          users = _context3.sent;
          admin_names = [];
          providers.forEach(function (element) {
            users.forEach(function (elt) {
              if (elt.admin_id === element.admin_id) {
                admin_names.push(elt.name);
                return false;
              }
            });
          });
          provider_arr = [];

          for (n = 0; n < providers.length; n++) {
            provider_arr.push({
              "providers": providers[n],
              "admin_name": admin_names[n]
            });
          }

          res.send(provider_arr);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/modifycategory', function _callee4(req, res, next) {
  var cat, category;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          cat = req.body;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Category.init());

        case 3:
          category = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(category.update({
            name: cat.category
          }, {
            where: {
              id_category: cat.catid
            }
          }));

        case 6:
          res.json({
            "message": "succes"
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.post('/modifycategory', function _callee5(req, res, next) {
  var cat, category;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          cat = req.body;
          console.log("this is" + cat);
          _context5.next = 4;
          return regeneratorRuntime.awrap(Category.init());

        case 4:
          category = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(category.update({
            name: cat.category
          }, {
            where: {
              id_category: cat.catid
            }
          }));

        case 7:
          res.json({
            "message": "succes"
          });

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router["delete"]('/deletecategory', function _callee6(req, res, next) {
  var cat_id, category, result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          cat_id = req.query[0];
          console.log(cat_id);
          _context6.next = 4;
          return regeneratorRuntime.awrap(Category.init());

        case 4:
          category = _context6.sent;
          _context6.next = 7;
          return regeneratorRuntime.awrap(category.destroy({
            where: {
              id_category: cat_id
            }
          }));

        case 7:
          result = _context6.sent;
          console.log("desroy result is " + result);
          res.json({
            "message": "succes"
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router.post('/modifyprovider', function _callee7(req, res, next) {
  var prov, provider;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          prov = req.body;
          console.log("this is prov : " + prov.prov_id);
          _context7.next = 4;
          return regeneratorRuntime.awrap(Provider.init());

        case 4:
          provider = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(provider.update({
            name: prov.provider
          }, {
            where: {
              id_provider: prov.prov_id
            }
          }));

        case 7:
          res.json({
            "message": "succes"
          });

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  });
});
module.exports = router;