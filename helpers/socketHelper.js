const sensorStore = require('../components/sensor/sensor.store');

const socketHelper = async ( socket, io ) => {

    socket.on('connected', (name) => {
        const welcome = "Bienvenido " + name + "! ¿Que te gustaría conocer?: \n" + 
        "1. ¿Cuantas personas han entrado a mi hogar el día de hoy? \n" +
        "2. ¿Cuándo fue la última ves que alguien entró a mi casa? \n" +
        "3. Gracias \n" +
        "4. Adios \n" +
        "5. Hola";
        io.emit('messages', { id: null, message: welcome })
    })

    socket.on('message', async (id, name, message) => {

        io.emit('messages', {id, name, message});

        switch (message) {
            case "¿Cuantas personas han entrado a mi hogar el día de hoy?":
                const { data, total } = await sensorStore.getData( 10000, 0 );
                const dates = [];
                let c = 0;
                data.map((record) => {
                    let fullDate = record.createdAt + '';
                    let date = fullDate.split('T')[0];
                    let currentDate = new Date();
                    date = date.split('-');
                    // date = date[2]+ '-' + date[1] + '-' + date[0];
                    let dd = currentDate.getDate();
                    let mm = currentDate.getMonth()+1;
                    let yyyy = currentDate.getFullYear();
                    if ( dd == date[2] && mm == date[1] && yyyy == date[0] ) c++;

                });
                io.emit('messages', { id: null, message: `Han entrado ${c} persona(s) a tu hogar el día de hoy` })
                break;
            case "¿Cuándo fue la última ves que alguien entró a mi casa?":
            
                break;    
            case "Gracias":
                io.emit('messages', { id: null, message: "Estoy para servirte :3" })
                break;  
            case "Adios":
                io.emit('messages', { id: null, message: `Hasta pronto ${name}!` })
                break;  
            case "Hola":
                io.emit('messages', { id: null, message: `Hola ${name}!` })
                break; 
            case "Opciones":
                io.emit('messages', { id: null, message: "Las opciones que tengo son: \n" + 
                "1. ¿Cuantas personas han entrado a mi hogar el día de hoy? \n" +
                "2. ¿Cuándo fue la última ves que alguien entró a mi casa? \n" +
                "3. Gracias \n" +
                "4. Adios \n" +
                "5. Hola" })
                break;     
            default:
                break;
        }
    })

}

module.exports = {
    socketHelper
}