const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        const { userid } = req.body;

        db.get('items').find({ userid: userid }).then((items) => {
            res.json(items);
        })
    });

module.exports = router;