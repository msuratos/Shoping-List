const express = require('express');
const authRoute = require('./auth');
const itemRoute = require('./item');
const verifyToken = require('../verify-token');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API - 🛒');
});

router.use('/auth', authRoute);
router.use('/item', [verifyToken, itemRoute]);

module.exports = router;