const { DataTypes } = require('sequelize');
const { dbConnection } = require('../../database/config');

const Sensor = dbConnection().define('Sensor', {

    dato: {
        type: DataTypes.INTEGER,
    },
    segundo: {
        type: DataTypes.DOUBLE
    }

});

module.exports = Sensor;