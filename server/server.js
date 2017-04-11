const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000 || process.env.PORT

/* App Config */
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/hacktivoverflow')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', ()=> {
  console.log('-+- Mongo Database Connection established -+-')
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

/* App Routes */
const api = require('./routes/api')

app.use('/api', api)

/* Server Listen */
app.listen(port)
console.log(`* Listening to port ${port} *`)

/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})

/* error handler */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})