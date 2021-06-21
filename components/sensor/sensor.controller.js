const sensorStore = require('./sensor.store');

const getData = async ( req, res ) => {
    const { limit = 10, from = 0 } = req.query;

    const { data, total } = await sensorStore.getData( limit, from );

    res.json({
        data,
        total
    });
}

const postData = async ( req, res ) => {
    console.log('Information from sensor: ' + req.body.dato + ' Second: ' + req.body.segundo);

    const { dato, segundo } = req.body;

    if ( !dato || !segundo ) {
        return res.status(400).json({
            msg: 'Incorrect data'
        }); 
    }

    const data = { dato, segundo };

    let { status, newData } = await sensorStore.postData( data );
    if ( status == 500 ) {
        return res.status(500).json({
            msg: 'Talk to the administrator'
        });
    }

    res.json({
        data:newData
    });
}

module.exports = {
    getData,
    postData
}
