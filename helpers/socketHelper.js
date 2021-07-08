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
        const { data } = await sensorStore.getData( 10000, 0 );

        switch (message) {
            case "¿Cuantas personas han entrado a mi hogar el día de hoy?":
                let dd;
                let mm;
                let yyyy;
                let date = [];
                let c = 0;
                let recordDate;
                data.map((record) => {
                    let currentDate = new Date();

                    recordDate = new Date(record.createdAt + '');
                    date[0] = recordDate.getDate();
                    date[1] = recordDate.getMonth()+1;
                    date[2] = recordDate.getFullYear();


                    dd = currentDate.getDate()-1;
                    mm = currentDate.getMonth()+1;
                    yyyy = currentDate.getFullYear();
                    if ( dd == date[0] && mm == date[1] && yyyy == date[2] ) c++;

                });
                io.emit('messages', { id: null, message: `Han entrado ${c} persona(s) a tu hogar el día de hoy` })
                break;
            case "¿Cuándo fue la última ves que alguien entró a mi casa?":
                let lastRecord = data[data.length - 1];
                let recordDate = new Date(lastRecord.createdAt + '');

                let date = [];
                date[0] = recordDate.getDate();
                date[1] = recordDate.getMonth();
                date[2] = recordDate.getFullYear();
                let lastRecord = date[0] + '/' + date[1] + '/' + date[2]; 
                io.emit('messages', { id: null, message: `La fecha en que la última persona entró a su casa es ${lastRecord}` })
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