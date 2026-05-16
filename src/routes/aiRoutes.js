const express = require('express');

const router = express.Router();

const {
    diagnoseDisease,
    consultAI
} = require('../controllers/aiController');

router.post('/diagnose', diagnoseDisease);

router.post('/consult', consultAI);

module.exports = router;