const user = require('../components/user/user.network');
const auth = require('../components/auth/auth.network');

const routes = function( server ) {

    server.use( '/users', user );
    server.use( '/auth', auth );

}

module.exports = routes;