"use strict";

var Sequelize = require('../public/javascripts/db').Sequelize;

var sequelize = require('../public/javascripts/db').sequelize;

function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Feedback = sequelize.define('feedbacks', {
            // Model attributes are defined here
            id_feedback: {
              primaryKey: true,
              type: Sequelize.BIGINT(20),
              allowNull: false,
              autoIncrement: true
            },
            user_id: {
              type: Sequelize.BIGINT(20),
              allowNull: false
            },
            subject: {
              type: Sequelize.STRING // allowNull defaults to true

            },
            text: {
              type: Sequelize.STRING // allowNull defaults to true

            }
          }, {
            timestamps: false,
            tableName: 'feedbacks' // Other model options go here

          });
          _context.next = 3;
          return regeneratorRuntime.awrap(Feedback.sync());

        case 3:
          return _context.abrupt("return", Feedback);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports.init = init;