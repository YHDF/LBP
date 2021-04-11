"use strict";

var Sequelize = require('../public/javascripts/db').Sequelize;

var sequelize = require('../public/javascripts/db').sequelize;

function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Session = sequelize.define('Session', {
            // Model attributes are defined here
            sid: {
              primaryKey: true,
              type: Sequelize.BIGINT(20),
              allowNull: false
            },
            data: {
              type: Sequelize.STRING // allowNull defaults to true

            }
          }, {
            timestamps: false,
            tableName: 'Session' // Other model options go here

          });
          _context.next = 3;
          return regeneratorRuntime.awrap(Session.sync());

        case 3:
          return _context.abrupt("return", Session);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports.init = init;