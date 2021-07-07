const socketHelper = async ( socket, io ) => {

    socket.on('connected', (name) => {
        const welcome = "Bienvenido " + name + "! ¿Que te gustaría conocer?:";
        const option1 = "1. ¿Cuantas personas han entrado a mi hogar el día de hoy?";
        const option2 = "1. ¿Cuantas personas han entrado a mi hogar el día de hoy?";
        const option3 = "3. Gracias";
        const option4 = "4. Adios";
        const option5 = "5. Hola";
        io.emit('messages', { id: null, message: welcome });
        io.emit('messages', { id: null, message: option1 });
        io.emit('messages', { id: null, message: option2 });
        io.emit('messages', { id: null, message: option3 });
        io.emit('messages', { id: null, message: option4 });
        io.emit('messages', { id: null, message: option5 });
    })

    socket.on('message', (id, message) => {
        io.emit('messages', {id, message});
    })

}

module.exports = {
    socketHelper
}