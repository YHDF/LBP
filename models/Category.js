const Sequelize = require('../public/javascripts/db').Sequelize;
const sequelize = require('../public/javascripts/db').sequelize;
async function init() {
    Category = sequelize.define('categories', {
        // Model attributes are defined here
        id_category : {
            type: Sequelize.BIGINT(20),
            allowNull: false,
            primaryKey : true
        },
        admin_id:{
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, 
    {
        timestamps: false,
        tableName: 'categories'
        // Other model options go here
    },
    {
        hooks : {
            afterDestroy : (categories, options) => {
                return 'sucess';
            }
        }
    },
    );
    await Category.sync();
    return Category;
}

module.exports.init = init;