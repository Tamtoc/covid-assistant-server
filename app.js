require('dotenv').config();

const Server = require('./components/server');

const server = new Server();

server.listen();