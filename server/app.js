const express       = require('express');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const cors          = require('cors');
const morgan        = require('morgan');
const passHash      = require('password-hash');
const passport      = require('passport');
const passportLocal = require('passport-local');
const Strategy      = passportLocal.Strategy;
const User          = require('./models/userModel');

const api    = require('./routes/api');

const app = express();

mongoose.connect('mongodb://localhost:27017/hacktivoverflow');
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', api);

app.use(passport.initialize());

passport.use(new Strategy((username,password,callback) => {
  User.findOne({username:username}, (error,user) => {
    if(error || user == null){
      callback('username not found')
    } else {
      if(password != null && passHash.verify(password, user.password)){
        callback(null,user)
      } else {
        callback('invalid username or password')
      }
    }
  })
}));

app.listen(3000);

module.exports = app;
