const jwt = require('jsonwebtoken');

const User = require('../components/user/user.model');

const validateJWT = async ( req, res, next ) => {

    const token = req.header('Authorization');

    if ( !token ) {
        return res.status(401).json({
            msg: 'There is not token in the request'
        });
    }

    try {
        
        const { id } = jwt.verify( token, process.env.PRIVATEKEY );

        const user = await User.findOne({
            where: { id: id, state: true }
        });

        if ( !user ) {
            return res.status(401).json({
                msg: 'invalid Token'
            });
        }

        req.user = user;

        next();

    } catch (error) {

        res.status(401).json({
            msg: 'invalid Token'
        });
        
    }

}

module.exports = {
    validateJWT
}