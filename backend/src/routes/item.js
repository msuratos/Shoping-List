const express = require('express');
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        const { userid } = req.body;

        db.get('items').find({ userid: userid }).then((items) => {
            res.json(items);
        })
    })
    .post(async (req, res) => {
        const { userid, categoryid, item } = req.body;
        const items = db.get('items');

        try {
            let db_category = await items.findOneAndUpdate(
                { categoryid: categoryid, userid: userid },
                { $push: { items: item }});
        }
        catch (exception) {
            console.log(exception);
            res.statusMessage = 'Failed to update items';
            res.status(500).json(exception);

            return res.end();
        }

        return res.sendStatus(200);
    });

module.exports = router;