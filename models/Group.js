const Sequelize = require('../public/javascripts/db').Sequelize;
const sequelize = require('../public/javascripts/db').sequelize;
async function init() {
    Group = sequelize.define('groups', {
        // Model attributes are defined here
        id_group:{
            primaryKey : true,
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        category_id: {
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        provider_id: {
            type: Sequelize.BIGINT(20)
            // allowNull defaults to true
        },
        name: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
    }, {
        timestamps: false,
        tableName: 'groups'
        // Other model options go here
    });
    await Group.sync();
    return Group;
}

module.exports.init = init;