const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const index = require('./routes/index');
const users = require('./routes/users');
const questions = require('./routes/questions');


const mongoose = require('mongoose');
const cors = require('cors')
//mongoose.connect('mongodb://localhost/hacktivoverflow2') //to connect with localhost
mongoose.connect('mongodb://admin:admin123@ds163010.mlab.com:63010/hacktivoverflow')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/', index);
app.use('/users', users);
app.use('/questions', questions)

app.listen(3000, function(){
  console.log('App is now listening on port 3000');
})

mongoose.connection.on('connected', function(){
  console.log('Mongoose is connected');
})

module.exports = app;
