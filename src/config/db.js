require('dotenv').config();
const db = require('monk')(process.env.MONGODB_CONNECTION);

db.then((database) => {
    console.log('Successfully connected to mongodb', database);
}).catch((err) => console.log('Could not connect to mongodb', err));

module.exports = db;