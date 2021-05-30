const User = require('../components/user/user.model');

const emailExists = async ( email ) => {

    const exists = await User.findOne({ 
        where: { email }
    });

    if ( exists ) {
        throw new Error('The email already exists');
    }

}

const userExistsById = async ( id ) => {

    const exists = await User.findByPk( id );
    if ( !exists ) {
        throw new Error('The ID does not exists');
    }

}

module.exports = {
    emailExists,
    userExistsById
}