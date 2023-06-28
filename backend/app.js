const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/errors');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Enable CORS credentials (cookies, authorization headers, etc.)
  }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

const admin = require('./routes/admin');
const user = require('./routes/user');
const form = require('./routes/form');
const formDetails = require('./routes/formDetails');
const apiLogger = require('./middleware/apiLogger');

app.use(apiLogger);
app.use('/api/v1', admin);
app.use('/api/v1', user);
app.use('/api/v1', form);
app.use('/api/v1', formDetails);


// middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
