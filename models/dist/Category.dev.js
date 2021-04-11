"use strict";

var Sequelize = require('../public/javascripts/db').Sequelize;

var sequelize = require('../public/javascripts/db').sequelize;

function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Category = sequelize.define('categories', {
            // Model attributes are defined here
            id_category: {
              type: Sequelize.BIGINT(20),
              allowNull: false,
              primaryKey: true
            },
            admin_id: {
              type: Sequelize.BIGINT(20),
              allowNull: false
            },
            name: {
              type: Sequelize.STRING,
              allowNull: false
            }
          }, {
            timestamps: false,
            tableName: 'categories' // Other model options go here

          }, {
            hooks: {
              afterDestroy: function afterDestroy(categories, options) {
                return 'sucess';
              }
            }
          });
          _context.next = 3;
          return regeneratorRuntime.awrap(Category.sync());

        case 3:
          return _context.abrupt("return", Category);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports.init = init;