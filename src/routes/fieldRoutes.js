const express = require('express');

const router = express.Router();

const {
    getFieldData
} = require('../controllers/fieldController');

router.get('/:location', getFieldData);

module.exports = router;