const Sequelize = require('../public/javascripts/db').Sequelize;
const sequelize = require('../public/javascripts/db').sequelize;
async function init() {
    Session = sequelize.define('Session', {
        // Model attributes are defined here
        sid:{
            primaryKey : true,
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        data: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
    }, {
        timestamps: false,
        tableName: 'Session'
        // Other model options go here
    });
    await Session.sync();
    return Session;
}

module.exports.init = init;