const userStore = require('./user.store');

const bcryptjs = require('bcryptjs');

const getUsers = async ( req, res ) => {

    const { limit = 10, from = 0 } = req.query;

    const { users, total } = await userStore.getUsers( limit, from );

    res.json({
        users,
        total
    });

}

const getUser = async ( req, res ) => {

    const { id } = req.params;

    const { status, user } = await userStore.getUser( id );

    if ( status == 404 ) {
        res.status(404).json({
            msg: 'Does not exist user with id ' + id
        });
    }

    res.json({
        user
    });

}

const postUser = async ( req, res ) => {

    const { email, password, first_name, last_name } = req.body;

    if ( !email || !password || !first_name || !last_name ) {
        return res.status(400).json({
            msg: 'Incorrect data'
        }); 
    }

    const user = { email, password, first_name, last_name };

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    let { status, newUser } = await userStore.postUser( user );
    if ( status == 400 ) {
        return res.status(400).json({
            msg: 'Already exists the email'
        });
    }
    if ( status == 500 ) {
        return res.status(500).json({
            msg: 'Talk to the administrator'
        });
    }

    res.json({
        user:newUser
    });
}

const putUser = async ( req, res ) => {

    const { id:uid } = req.params;
    const { id, email, password, state, createdAt, updatedAt, ...rest } = req.body;

    if ( password ) {

        const salt = bcryptjs.genSaltSync();    
        rest.password = bcryptjs.hashSync( password, salt );

    } 

    const { status, user } = await userStore.putUser( uid, rest );

    if( status == 404 ) {
        return res.status(404).json({
            msg: 'Does not exist user with the id ' + uid
        });
    }
    if ( status == 500 ) {
        res.status(500).json({
            msg: 'Talk to the administrator'
        });
    }

    res.json({ 
        user 
    });

}

const deleteUser = async ( req, res ) => {

    const { id } = req.params;

    const { state, user } = await userStore.deleteUser( id );

    if ( state == 404 ) {
        return res.status(404).json({
            msg: 'Does not exist user with the id ' + id
        });
    } 
    if ( state == 500 ) {
        res.status(500).json({
            msg: 'Talk to the administrator'
        });
    }

    res.json({ 
        user 
    });

}

module.exports = {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
}