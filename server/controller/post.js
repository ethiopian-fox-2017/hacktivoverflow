const Post = require('../models/post')
const User = require('../models/user')
const Help = require('../helpers/verify')

module.exports = {

  ask : (req, res)=> {
    let decoded = Help.decode(req.headers.token)
    let newPost = Post({
      user : decoded.id,
      title: req.body.title,
      content: req.body.content
    })
    newPost.save((err, post)=> {
        if(err) {
          res.send(err)
        } else {
          console.log('Data added')
          User.update({_id: decoded.id},{$push: {postId: post._id}}, {new: true, safe: true, upsert: true}).exec((error, result)=> {
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
          user : decoded.id,
          content: req.body.content
        })
        post.save((err)=> {
          if(err) {
            console.log(err)
            res.send(err)
          } else {
            console.log('Answer created')
            res.send('Answer created')
          }
        })
      }
    })
  },
  vote: (req, res)=> {
    let decoded = Help.decode(req.headers.token)
    Post.findById(req.params.postId, (err, post)=> {
      if(err) {
        res.send(err)
      } else {
        if(post.votes.some((vote)=> {return vote.user == decoded.id})) {
          res.status(403).send('You only can vote once')
        } else {
          Post.update({_id: post._id}, {$push: {votes: {count: req.body.count, user: decoded.id}}}, {new: true})
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
        if(answer.votes.some((vote)=> {return vote.user == decoded.id})) {
          res.send('You already voted')
        } else {
          Post.findOneAndUpdate({_id: req.params.postId , 'answers._id': req.params.answerId}, {
            $push: {'answers.$.votes': {user: decoded.id, count: req.body.count}}
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
  getOneQuestion : (req,res)=> {
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
        console.log(post.user)
        User.update({_id: post.user}, { $pullAll : [{postId: post._id}] }).exec((error, result)=> {
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