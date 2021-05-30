const { Sequelize } = require('sequelize');

const dbConnection = () => {


    const db = new Sequelize('covid-assistant', 'root', process.env.DB_PASSWORD, {
        host: process.env.HOST,
        dialect: 'mysql',
        // logging: false,
    });

    return db;
}

module.exports = {
    dbConnection
}