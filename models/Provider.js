const Sequelize = require('../public/javascripts/db').Sequelize;
const sequelize = require('../public/javascripts/db').sequelize;
async function init() {
    Provider = sequelize.define('providers', {
        // Model attributes are defined here
        id_provider:{
            primaryKey : true,
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        admin_id:{
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },

    }, {
        timestamps: false,
        tableName: 'providers'
        // Other model options go here
    });
    await Provider.sync();
    return Provider;
}

module.exports.init = init;