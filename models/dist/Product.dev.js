"use strict";

var Sequelize = require('../public/javascripts/db').Sequelize;

var sequelize = require('../public/javascripts/db').sequelize;

function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Product = sequelize.define('products', {
            // Model attributes are defined here
            id: {
              primaryKey: true,
              type: Sequelize.BIGINT(20),
              allowNull: false
            },
            group_id: {
              type: Sequelize.BIGINT(20),
              allowNull: false
            },
            name: {
              type: Sequelize.STRING,
              allowNull: false
            },
            image: {
              type: Sequelize.STRING // allowNull defaults to true

            },
            price: {
              type: Sequelize.FLOAT // allowNull defaults to true

            },
            link: {
              type: Sequelize.STRING // allowNull defaults to true

            },
            visits: {
              type: Sequelize.BIGINT(20),
              allowNull: false
            },
            best: {
              type: Sequelize.BIGINT(20),
              allowNull: true
            }
          }, {
            timestamps: false,
            tableName: 'products' // Other model options go here

          });
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.sync());

        case 3:
          return _context.abrupt("return", Product);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports.init = init;