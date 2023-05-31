const sequelize = require('sequelize');
const connection = require('../database/database');

const Books = connection.define('books', {
    title: {
        type: sequelize.STRING,
        allowNull: false 
    }, author: {
        type: sequelize.STRING,
        allowNull: false 
    }, year: {
        type: sequelize.REAL,
        allowNull: false
    }, price: {
        type: sequelize.REAL,
        allowNull: false
    }
});

module.exports = Books;