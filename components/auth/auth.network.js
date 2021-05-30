const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('./auth.controller');

const router = Router();

router.post('/login', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty()
], login);

module.exports = router;