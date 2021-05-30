const { Sequelize } = require('sequelize');

const dbConnection = () => {


    const db = new Sequelize('covid-assistant', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        // logging: false,
    });

    return db;
}

module.exports = {
    dbConnection
}