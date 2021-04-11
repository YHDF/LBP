"use strict";

var Sequelize = require('../public/javascripts/db').Sequelize;

var sequelize = require('../public/javascripts/db').sequelize;

function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Favorite = sequelize.define('favourites', {
            // Model attributes are defined here
            id_favourite: {
              primaryKey: true,
              type: Sequelize.BIGINT(20),
              allowNull: false,
              autoIncrement: true
            },
            user_id: {
              type: Sequelize.BIGINT(20),
              allowNull: false
            },
            product_id: {
              type: Sequelize.STRING // allowNull defaults to true

            },
            name: {
              type: Sequelize.STRING // allowNull defaults to true

            },
            image: {
              type: Sequelize.STRING // allowNull defaults to true

            },
            link: {
              type: Sequelize.STRING // allowNull defaults to true

            },
            price: {
              type: Sequelize.FLOAT // allowNull defaults to true

            },
            available: {
              type: Sequelize.BIGINT(20) // allowNull defaults to true

            }
          }, {
            timestamps: false,
            tableName: 'favourites' // Other model options go here

          });
          _context.next = 3;
          return regeneratorRuntime.awrap(Favorite.sync());

        case 3:
          return _context.abrupt("return", Favorite);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports.init = init;