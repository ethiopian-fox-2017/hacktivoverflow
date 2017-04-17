const mongoose = require('mongoose')
const uri = 'mongodb://ridho:ayamgoreng@cluster0-shard-00-00-gf0ez.mongodb.net:27017,cluster0-shard-00-01-gf0ez.mongodb.net:27017,cluster0-shard-00-02-gf0ez.mongodb.net:27017/hacktivoverflow?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

mongoose.connect(uri)

mongoose.connection.on('connected',function(){
  console.log('database sudah terhubung');
})

mongoose.connection.on('error', function(err){
  console.log('ada yang error gan', err);
})

mongoose.connection.on('disconnected', function() {
  console.log('Database tidak terhubung');
})

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
