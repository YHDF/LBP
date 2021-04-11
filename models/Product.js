const Sequelize = require('../public/javascripts/db').Sequelize;
const sequelize = require('../public/javascripts/db').sequelize;
async function init() {
    Product = sequelize.define('products', {
        // Model attributes are defined here
        id : {
            primaryKey : true,
            type : Sequelize.BIGINT(20),
            allowNull : false,
        },
        group_id:{
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        price: {
            type: Sequelize.FLOAT
            // allowNull defaults to true
        },
        link: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        visits:{
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        best:{
            type: Sequelize.BIGINT(20),
            allowNull: true
        },

    }, {
        timestamps: false,
        tableName: 'products'
        // Other model options go here
    });
    await Product.sync();
    return Product;
}

module.exports.init = init;