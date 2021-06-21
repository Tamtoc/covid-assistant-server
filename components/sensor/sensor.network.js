const { Router } = require('express');

const { getData, postData } = require('./sensor.controller');

const router = Router();

router.get('/', getData );

router.post('/', postData);

module.exports = router;