const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const port = 3000 || process.env.PORT

/* App Config */
mongoose.Promise = global.Promise
mongoose.connect('mongodb://andras:'+process.env.MONGO_PW+'@hacktivoveflow-shard-00-00-j1amx.mongodb.net:27017,hacktivoveflow-shard-00-01-j1amx.mongodb.net:27017,hacktivoveflow-shard-00-02-j1amx.mongodb.net:27017/hacktivoverflow?ssl=true&replicaSet=hacktivoveflow-shard-0&authSource=admin')
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