const Sequelize = require('../public/javascripts/db').Sequelize;
const sequelize = require('../public/javascripts/db').sequelize;
async function init() {
    User = sequelize.define('users', {
        // Model attributes are defined here
        id : {
            primaryKey : true,
            type : Sequelize.BIGINT(20),
            allowNull : false,
            autoIncrement : true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        password: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        api_token: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        admin_id: {
            type: Sequelize.BIGINT(20)
            // allowNull defaults to true
        },
    }, {
        timestamps: false,
        tableName: 'users'
        // Other model options go here
    });
    await User.sync();
    return User;
}

module.exports.init = init;