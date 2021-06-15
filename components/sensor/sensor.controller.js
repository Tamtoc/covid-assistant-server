const postData = async ( req, res ) => {
    console.log('Information from sensor: ' + req.body.dato + ' Second: ' + req.body.segundo);
    res.json({
        dato: req.body.dato,
        segundo: req.body.segundo
    });
}

module.exports = {
    postData
}
