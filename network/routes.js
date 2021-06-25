const user = require('../components/user/user.network');
const auth = require('../components/auth/auth.network');
const sensor = require('../components/sensor/sensor.network');
const upload = require('../components/upload/upload.network');

const routes = function( server ) {

    server.use( '/users', user );
    server.use( '/auth', auth );
    server.use( '/sensor', sensor );
    server.use( '/upload', upload );

}

module.exports = routes;