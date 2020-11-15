require('dotenv').config();
const db = require('monk')(process.env.MONGODB_CONNECTION);

db.then(() => {
    console.log('Successfully connected to mongodb');
});

module.exports = db;