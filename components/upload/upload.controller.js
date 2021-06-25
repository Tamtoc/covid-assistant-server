const path = require('path');
const fs = require('fs');

const { uploadFile } = require('../../helpers/upload-file');

const User = require('../user/user.model');

const putImage = async ( req, res ) => {

    const { id, table } = req.params;

    let model;

    switch ( table ) {
        case 'users':
            model = await User.findByPk ( id )
            if ( !model ) {
                return res.status(400).json({
                    msg: `ID ${ id } not exists`
                });
            }
            break;     
        default:
            return res.status(500).json({
                msg: 'Not valid'
            });
    }

    // Limpiar imagen previa
    if ( model.img ) {

        // Si existe el archivo lo borramos
        const pathImage = path.join( __dirname, '../../uploads', table, model.img );
        if ( fs.existsSync( pathImage ) ) {
            fs.unlinkSync( pathImage );
        }

    }

    const name = await uploadFile( req.files, undefined, table);
    model.img = name;

    await model.save();

    res.json( model );

}

const getImage = async ( req, res ) => {

    const { id, table } = req.params;

    let model;

    switch ( table ) {
        case 'users':
            model = await User.findByPk( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `ID ${ id } not exists`
                });
            }
            break;     
        default:
            return res.status(500).json({
                msg: 'Not valid'
            });
    }

    // Limpiar imagen previa
    if ( model.img ) {

        // Si existe el archivo lo borramos
        const pathImage = path.join( __dirname, '../../uploads', table, model.img );
        if ( fs.existsSync( pathImage ) ) {
            return res.sendFile( pathImage );
        }

    }

    const pathImage = path.join( __dirname, '../../public/assets/without-image.png' );
    res.sendFile( pathImage );

}

module.exports = {
    putImage,
    getImage
}
