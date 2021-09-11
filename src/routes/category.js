const express = require('express');
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        const { category, userid } = req.body;
        const items = db.get('items');
        const db_category = await items.find({ category: category, userid: userid });

        if (db_category.length !== 0) {
            const error = {
                Error: `Category '${category}' for user '${userid}' alredy exists. Please enter a unique category`
            };

            res.json(error);
            res.statusMessage = "Category already exists";
            res.statusCode = 500;

            return res.end();
        }
        else {
            try {
                const item = await items.insert({ categoryid: uuidv4(), category: category, userid: userid, items: [] });
                return res.json(item);
            }
            catch (exception) {
                console.log(err);				
                res.statusMessage = `Could not insert '${category}' to database.`;
                res.status(500);
            }
            finally {
                db.close();
            }

        }
    });

module.exports = router;