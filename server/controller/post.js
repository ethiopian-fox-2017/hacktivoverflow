const Post = require('../models/post')
const User = require('../models/user')
const Help = require('../helpers/verify')

module.exports = {

  ask : (req, res)=> {
    let decoded = Help.decode(req.headers.token)
    let newPost = Post({
      user : decoded.username,
      title: req.body.title,
      content: req.body.content
    })
    newPost.save((err, post)=> {
        if(err) {
          res.send(err)
        } else {
          console.log('Data added')
          User.update({username: decoded.username},{$push: {postId: post._id}}, {new: true, safe: true, upsert: true}).exec((error, result)=> {
            if(error) {
              console.log('Error update')
              res.send(error)
            } else {
              console.log('User data updated with questionId')
              res.send(result)
            }
          })
        }
    })
  },
  answer : (req, res)=> {
    let decoded = Help.decode(req.headers.token)
    Post.findOne({_id: req.params.postId}, (err, post)=> {
      if(err) {
        res.send(err)
      } else {
        post.answers.push({
          user : decoded.username,
          title: req.body.title,
          content: req.body.content
        })
        console.log('Answer created')
        res.send('Answer created')
      }
    })
  },
  vote: (req, res)=> {
    let decoded = Help.decode(req.headers.token)
    Post.findById(req.params.postId, (err, post)=> {
      if(err) {
        res.send(err)
      } else {
        if(post.votes.some((vote)=> {vote.user == decoded.username})) {
          res.send('You can vote once')
        } else {
          Post.update({_id: post._id}, {$push: {count: req.body.count, user: decoded.username}}, {new: true})
            .exec((error, data)=> {
              if(error) {
                res.send(error)
              } else {
                res.send('Vote success')
              }
            })
        }
      }
    })
  },
  voteAnswer: (req, res)=> {
    let decoded = Help.decode(req.headers.token)
    Post.findById(req.params.postId, (err, post)=> {
      if(err) {
        res.send(err)
      } else {
        let answer = post.answers.id(req.params.answerId)
        if(answer.user == decoded.username) {
          res.send('You already voted')
        } else {
          Post.findOneAndUpdate({answers._id: req.params.answerId}, {
            $push: {answers.$.votes: {user: decoded.username, count: req.body.count}}
          }, {new: true}, (error, result)=> {
            if(error) {
              res.send(error)
            } else {
              res.send(result)
            }
          })
        }
      }
    })
  },
  getQuestions : (req, res)=> {
    Post.find({})
      .populate('user')
      .exec((err, posts)=> {
      if(err) {
        res.send(err)
      } else {
        res.send(posts)
      }
    })
  },
  getOneQuestion : ()=> {
    Post.findOne({_id: req.params.postId})
      .populate('user answers.user')
      .exec((err, post)=> {
        if(err){
          res.send(err)
        } else {
          res.send(post)
        }
    })
  },
  deletePost : (req, res)=> {
    Post.findByIdAndRemove(req.params.postId, (err, post)=> {
      if(err) {
        res.send(err)
      } else {
        console.log('Post deleted')
        User.update({username: post.user}, { $pullAll : {postId: post._id} }).exec((error, result)=> {
          if(error) {
            console.log('Error update user data')
            res.send(error)
          } else {
            console.log('Post deleted')
            res.send(result)
          }
        })
      }
    })
  },
  deleteAnswer : (req, res)=> {
    Post.findById(req.params.postId, (err, post)=> {
      if(err) {
        res.send(err)
      } else {
        post.answers.id(req.params.answerId).remove()
        post.save((error)=> {
          if(error) {
            res.send(error)
          } else {
            console.log('answer deleted')
            res.send(post)
          }
        })
      }
    })
  }
}