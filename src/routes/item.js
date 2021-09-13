const express = require('express');
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        const userid = req.userId; // this came from verify-token.js

        db.get('items').find({ userid: userid }).then((items) => {
            res.json(items);
        });
    })
    .post(async (req, res) => {
        const { categoryid, item } = req.body;
        const userid = req.userId;
        const items = db.get('items');

        try {
            const db_category = await items.findOneAndUpdate(
                { categoryid: categoryid, userid: userid },
                { $push: { items: item }});

            return res.json(db_category);
        }
        catch (exception) {
            console.log(exception);
            res.statusMessage = 'Failed to update items';
            res.status(500).json(exception);

            return res.end();
        }
    });

module.exports = router;