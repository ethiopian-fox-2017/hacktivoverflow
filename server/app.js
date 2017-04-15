var express  = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var api    = require('./routes/api');

var app = express();

mongoose.connect('mongodb://localhost:27017/hacktivoverflow');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

app.listen(3000);

module.exports = app;
