"use strict";

var Sequelize = require('../public/javascripts/db').Sequelize;

var sequelize = require('../public/javascripts/db').sequelize;

function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Group = sequelize.define('groups', {
            // Model attributes are defined here
            id_group: {
              primaryKey: true,
              type: Sequelize.BIGINT(20),
              allowNull: false
            },
            category_id: {
              type: Sequelize.BIGINT(20),
              allowNull: false
            },
            provider_id: {
              type: Sequelize.BIGINT(20) // allowNull defaults to true

            },
            name: {
              type: Sequelize.STRING // allowNull defaults to true

            }
          }, {
            timestamps: false,
            tableName: 'groups' // Other model options go here

          });
          _context.next = 3;
          return regeneratorRuntime.awrap(Group.sync());

        case 3:
          return _context.abrupt("return", Group);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports.init = init;