const userModel = require('../user/user.model');

const bcryptjs = require('bcryptjs');

const authenticateUser = async ( email, password ) => {

    const query = { email: email, state: true };

    try {

        const user = await userModel.findOne({
            where: query
        });

        if ( !user ) {
            return {
                status: 400
            }
        }
    
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return {
                status: 400
            }
        }
    
        return {
            status: 200,
            user
        }
        
    } catch (error) {
        return {
            status: 500
        }
    }

}

module.exports = {
    authenticateUser
}