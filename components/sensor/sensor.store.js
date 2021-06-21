const sensorModel = require('./sensor.model');

const getData = async (limit, from) => {
    limit = Number( limit );
    from = Number( from );

    const [ total, data ] = await Promise.all([
        sensorModel.count(),
        sensorModel.findAll({
            offset: from,
            limit
        })
    ]);

    return {
        data,
        total,
    };
}

const postData = async ( data ) => {
    try {

        const newData = await sensorModel.create( data ); 

        return {
            status: 201,
            newData
        }
        
    } catch (error) {
        console.log( error );
        return {
            status: 500
        }
    }
}

module.exports = {
    getData,
    postData
}
