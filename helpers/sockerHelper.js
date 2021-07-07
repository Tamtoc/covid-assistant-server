const socketHelper = async ( socket, io ) => {

    socket.on('connected', () => {
        console.log('User connected');
    })

    socket.on('message', (id, message) => {
        io.emit('messages', {id, message});
    })

}

module.exports = {
    socketHelper
}