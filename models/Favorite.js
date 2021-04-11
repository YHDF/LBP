const Sequelize = require('../public/javascripts/db').Sequelize;
const sequelize = require('../public/javascripts/db').sequelize;
async function init() {
    Favorite = sequelize.define('favourites', {
        // Model attributes are defined here
        id_favourite:{
            primaryKey : true,
            type: Sequelize.BIGINT(20),
            allowNull: false,
            autoIncrement : true,
        },
        user_id: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        product_id: {
            type: Sequelize.STRING,
            // allowNull defaults to true
        },
        name: {
            type: Sequelize.STRING,
            // allowNull defaults to true
        },
        image: {
            type: Sequelize.STRING,
            // allowNull defaults to true
        },
        link: {
            type: Sequelize.STRING,
            // allowNull defaults to true
        },
        price: {
            type: Sequelize.FLOAT,
            // allowNull defaults to true
        },
        available: {
            type: Sequelize.BIGINT(20),
            // allowNull defaults to true
        },
    }, {
        timestamps: false,
        tableName: 'favourites'
        // Other model options go here
    });
    await Favorite.sync();
    return Favorite;
}

module.exports.init = init;