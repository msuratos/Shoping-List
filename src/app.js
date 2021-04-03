require('dotenv').config();

const express = require('express');
const cookies = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rootRoute = require('./routes/root-route');

const db = require('./config/db')
const app = express();
const port = process.env.PORT;
const path = __dirname + '/build/';

app.use(express.static(path));
app.use(helmet());
app.use(cookies());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1', rootRoute);

app.listen(port, () => {
    console.log(`Backend API for Shopping List is listening at http://localhost:${port}`);
});