"use strict";

var Sequelize = require('../public/javascripts/db').Sequelize;

var sequelize = require('../public/javascripts/db').sequelize;

function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Provider = sequelize.define('providers', {
            // Model attributes are defined here
            id_provider: {
              primaryKey: true,
              type: Sequelize.BIGINT(20),
              allowNull: false
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
            tableName: 'providers' // Other model options go here

          });
          _context.next = 3;
          return regeneratorRuntime.awrap(Provider.sync());

        case 3:
          return _context.abrupt("return", Provider);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports.init = init;