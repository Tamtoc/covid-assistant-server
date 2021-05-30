const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, hasRole } = require('../../middlewares');

const { emailExists, userExistsById } = require('../../helpers/db-validators');

const { getUsers, postUser, putUser, deleteUser, getUser } = require('./user.controller');

const router = Router();

router.get( '/', getUsers );

router.get( '/:id', getUser );

router.post( '/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('first_name', 'first name is required').not().isEmpty(),
    check('last_name', 'last name is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( emailExists ),
    check('password', 'The password must have a minimum of 6 characters').isLength({ min:6 }),
    validateFields
], postUser );

router.put( '/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id').custom( userExistsById ),
    validateFields
], putUser );

router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id').custom( userExistsById ),
    validateFields
], deleteUser );

module.exports = router;