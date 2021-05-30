const userModel = require('./user.model');

const getUsers = async ( limit, from ) => {

    limit = Number( limit );
    from = Number( from );

    const query = { state: true };

    const [ total, users ] = await Promise.all([
        userModel.count({
            where: query
        }),
        userModel.findAll({
            where: query,
            offset: from,
            limit
        })
    ]);

    return {
        users,
        total,
        limit,
        from
    };

}

const getUser = async ( id ) => {

    const query = { id: id, state: true };

    try {
        
        const user = await userModel.findOne({
            where: query
        });

        if ( user ) {
            return {
                status: 200,
                user
            };
        } else {
            return {
                status: 404
            };
        }

    } catch (error) {

        console.log( error );
        res.status(500).json({
            msg: 'Talk to the administrator'
        });
        
    }

}

const postUser = async ( user ) => {

    try {

        const emailExists = await userModel.findOne({
            where: {
                email: user.email
            }
        });

        if ( emailExists ) {
            return {
                status: 400
            }
        }

        const newUser = await userModel.create( user ); 

        return {
            status: 201,
            newUser
        }
        
    } catch (error) {

        console.log( error );
        return {
            status: 500
        }

    }

} 

const putUser = async ( id, data ) => {

    const query = { id: id, state: true };

    try {
        
        const user = await userModel.findOne({
            where: query
        });

        if ( !user ) {
            return {
                status: 404
            }
        }

        await user.update( data );

        return {
            status: 200,
            user
        }

    } catch (error) {

        console.log( error );
        return {
            status: 500
        }
        
    }

}

const deleteUser = async ( id ) => {

    const query = { id: id, state: true };

    try {

        const user = await userModel.findOne({
            where: query
        });
        
        if ( !user ) {
            return {
                status: 404
            }
        }

        await user.update({
            state: false
        });

        return {
            status: 200,
            user
        }

    } catch (error) {

        console.log( error );
        return {
            status: 500
        }
        
    }

}

module.exports = {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
}


