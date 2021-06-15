const { Router } = require('express');

const { postData } = require('./sensor.controller');

const router = Router();

router.post('/', postData);

module.exports = router;