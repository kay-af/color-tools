const express = require('express');
const controller = require('../controllers/controllers_v1');

const router = express.Router();

router.get('/lookup', controller.lookup);

module.exports = router;