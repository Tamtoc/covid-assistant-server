const socketHelper = async ( socket, io ) => {

    socket.on('connected', (name) => {
        const welcome = `Bienvenido ${name} ! ¿Que te gustaría conocer?:   
        1. ¿Cuantas personas han entrado a mi hogar el día de hoy? 
        2. ¿Cuándo fue la última ves que alguien entró a mi casa?
        3. Gracias
        4. Adios
        5. Hola`;
        io.emit('messages', { id: null, message: welcome })
    })

    socket.on('message', (id, message) => {
        io.emit('messages', {id, message});
    })

}

module.exports = {
    socketHelper
}