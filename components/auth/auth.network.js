const { Router } = require('express');
const { check } = require('express-validator');

const { login, reviewToken } = require('./auth.controller');
const { validateJWT } = require('../../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty()
], login);

router.post('/review', validateJWT, reviewToken );

module.exports = router;