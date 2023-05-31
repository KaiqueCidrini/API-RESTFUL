const sequelize = require('sequelize');
const connection = require('../database/database');

const Users = connection.define('users', {
    name: {
        type: sequelize.STRING,
        allowNull: false 
    }, email: {
        type: sequelize.STRING,
        allowNull: false 
    }, password: {
        type: sequelize.STRING,
        allowNull: false
    }
});

module.exports = Users;