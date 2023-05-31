const sequelize = require('sequelize');
const connection = new sequelize('book_api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: '-03:00'
}); 


module.exports = connection;
