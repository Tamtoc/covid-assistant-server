const socketHelper = async ( socket, io ) => {

    socket.on('connected', (name) => {
        const welcome = "Bienvenido " + name + "! ¿Que te gustaría conocer?: \t" + 
        "1. ¿Cuantas personas han entrado a mi hogar el día de hoy?\t" +
        "2. ¿Cuándo fue la última ves que alguien entró a mi casa?\t" +
        "3. Gracias\t" +
        "4. Adios\t" +
        "5. Hola";
        io.emit('messages', { id: null, message: welcome })
    })

    socket.on('message', (id, message) => {
        io.emit('messages', {id, message});
    })

}

module.exports = {
    socketHelper
}