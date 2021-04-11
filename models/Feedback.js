const Sequelize = require('../public/javascripts/db').Sequelize;
const sequelize = require('../public/javascripts/db').sequelize;
async function init() {
    Feedback = sequelize.define('feedbacks', {
        // Model attributes are defined here
        id_feedback:{
            primaryKey : true,
            type: Sequelize.BIGINT(20),
            allowNull: false,
            autoIncrement : true,
        },
        user_id: {
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        subject: {
            type: Sequelize.STRING,
            // allowNull defaults to true
        },
        text: {
            type: Sequelize.STRING,
            // allowNull defaults to true
        },
    }, {
        timestamps: false,
        tableName: 'feedbacks'
        // Other model options go here
    });
    await Feedback.sync();
    return Feedback;
}

module.exports.init = init;