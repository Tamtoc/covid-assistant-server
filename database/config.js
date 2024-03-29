const { Sequelize } = require('sequelize');

const dbConnection = () => {


    const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.HOST,
        dialect: 'mysql',
        port:process.env.DB_PORT
        // logging: false,
    });

    return db;
}

module.exports = {
    dbConnection
}