const express = require('express');
const itemRoute = require('./item');
const categoryRoute = require('./category');
const verifyToken = require('../verify-token');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API - 🛒');
});

router.use('/item', [verifyToken, itemRoute]);
router.use('/category', [verifyToken, categoryRoute])

module.exports = router;