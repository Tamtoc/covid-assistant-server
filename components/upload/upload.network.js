const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateFileToUpload } = require('../../middlewares');
const { putImage, getImage } = require('./upload.controller');
const { validTables } = require('../../helpers/db-validators');

const router = Router();

router.put('/:table/:id', [
    validateFileToUpload,
    check('table').custom( c => validTables( c, ['users'] ) ),
    validateFields
], putImage );

router.get('/:table/:id', [
    check('table').custom( c => validTables( c, ['users'] ) ),
    validateFields
], getImage);

module.exports = router;