const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const router = require('../network/routes');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Conexión a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        router( this.app );  
          
    }

    async connectDB() {

        try {
            
            const db = await dbConnection();
            await db.authenticate();

            console.log('database online');
            
        } catch (error) {
            
            throw new Error( 'Error when starting database: ' + error );

        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') ); // con use() añadimos el middleware

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('servidor corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server;