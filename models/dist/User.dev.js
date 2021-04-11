"use strict";

var Sequelize = require('../public/javascripts/db').Sequelize;

var sequelize = require('../public/javascripts/db').sequelize;

function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          User = sequelize.define('users', {
            // Model attributes are defined here
            id: {
              primaryKey: true,
              type: Sequelize.BIGINT(20),
              allowNull: false,
              autoIncrement: true
            },
            name: {
              type: Sequelize.STRING,
              allowNull: false
            },
            email: {
              type: Sequelize.STRING // allowNull defaults to true

            },
            password: {
              type: Sequelize.STRING // allowNull defaults to true

            },
            api_token: {
              type: Sequelize.STRING // allowNull defaults to true

            },
            admin_id: {
              type: Sequelize.BIGINT(20) // allowNull defaults to true

            }
          }, {
            timestamps: false,
            tableName: 'users' // Other model options go here

          });
          _context.next = 3;
          return regeneratorRuntime.awrap(User.sync());

        case 3:
          return _context.abrupt("return", User);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports.init = init;