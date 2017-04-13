var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./user');

var voteSchema = new Schema({
	vote_title: String,
	total_vote: Number,
	user: [{type: Schema.Types.ObjectId, ref:'User'}]
	// available_at: [{type: Schema.Types.ObjectId, ref:'Restaurants'}]
});
var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;