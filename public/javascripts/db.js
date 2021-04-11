const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mariadb://localhost:3306/Testing?user=root&password=yh')

async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
module.exports.connect = connect;
