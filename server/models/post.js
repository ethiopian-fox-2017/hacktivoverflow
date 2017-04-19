const mongoose = require('mongoose')
let Schema = mongoose.Schema

let answerSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  content: String,
  votes: [{
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    count: {type: Number, enum: [1,-1]}
  }]
})

let postSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  content: String,
  votes: [{
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    count: {type: Number, enum: [1,-1]}
  }],
  answers: [answerSchema]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post