const { DataTypes } = require('sequelize');
const { dbConnection } = require('../../database/config');

const User = dbConnection().define('User', {

    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER_ROLE'
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    img: {
        type: DataTypes.STRING
    },
    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

});

module.exports = User;