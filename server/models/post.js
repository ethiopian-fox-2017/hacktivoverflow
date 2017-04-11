const mongoose = require('mongoose')
let Schema = mongoose.Schema

let answerSchema = new Schema({
  userId: {type: String, ref: 'User'},
  title: String,
  content: String,
  votes: [{type: Schema.Types.ObjectId, ref: 'Vote'}]
})

let postSchema = new Schema({
  userId: {type: String, ref: 'User'},
  title: String,
  content: String,
  votes: [{type: Schema.Types.ObjectId, ref: 'Vote'}]
  answers: [answerSchema]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post