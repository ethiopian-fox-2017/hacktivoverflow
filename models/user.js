var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Answers = require('./jawaban');
var Questions = require('./pertanyaan');
var Votes = require('./vote');

var userSchema = new Schema({
	username: String,
	password: String,
	answer: [{type: Schema.Types.ObjectId, ref:'Answer'}],
	question: [{type: Schema.Types.ObjectId, ref:'Question'}],
	vote: [{type: Schema.Types.ObjectId, ref:'Vote'}]
	// available_at: [{type: Schema.Types.ObjectId, ref:'Restaurants'}]
});
var User = mongoose.model('User', userSchema);

module.exports = User;