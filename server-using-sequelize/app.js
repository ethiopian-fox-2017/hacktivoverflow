const express           = require('express');
const bodyParser        = require('body-parser');
var path                = require('path');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// var index = require('./routes/index');
//
// app.use('/', index);

app.use('/', (req,res,next) => {
    res.send('hello');
})

app.listen(3000);
