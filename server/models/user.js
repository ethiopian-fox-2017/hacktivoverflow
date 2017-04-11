const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let userSchema = new Schema({
  username: {type: String, unique: true, uniqueCaseInsensitive: true, required: true},
  password: {type: String, required: true},
  questionId: [{type: Schema.Types.ObjectId, ref: 'Question'}],
  answerId: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  voteId: [{type: Schema.Types.ObjectId, ref: 'Vote'}]
})
userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User