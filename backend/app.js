const express = require('express');
const app=express();
const path = require('path');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/errors');
var bodyParser = require('body-parser')

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
const admin = require('./routes/admin');
const user = require('./routes/user');
const form = require('./routes/form');
const formDetails = require('./routes/formDetails');

app.use('/api/v1',admin);
app.use('/api/v1',user);
app.use('/api/v1',form);
app.use('/api/v1',formDetails);
app.use(cors({ origin: "*", credentials: true }));


//middleware to handle errors
app.use(errorMiddleware);
module.exports = app;