const { generateJWT } = require('../../helpers/generate-jwt');
const authStore = require('./auth.store');

const login = async ( req, res ) => {

    const { email, password } = req.body;

    const { status, user } = await authStore.authenticateUser( email, password );

    if ( status == 400 ) {
        return res.status(400).json({
            msg: 'Email or password are incorrects'
        });
    }
    if ( status == 500 ) {
        res.status(500).json({
            msg: 'Talk to the administrator'
        });
    }

    const token = await generateJWT( user.id );

    res.json({
        user,
        token
    });

} 

const reviewToken = ( req, res ) => {

    if ( req.user ) {
        res.json({
            ok: true,
            user: req.user,
            msg: 'Valid token'
        })
    }

}

module.exports = {
    login,
    reviewToken
}

