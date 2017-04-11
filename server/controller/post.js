const Post = require('../models/post')
const User = require('../models/user')

module.exports = {

  ask : (req, res)=> {
    let newPost = Post({
      userId : req.params.username,
      title: req.body.title,
      content: req.body.content
    })
    newPost.save((err, post)=> {
        if(err) {
          res.send({success: false, msg: 'Error adding post data'})
        } else {
          console.log('Data added')
          User.update({_id: post.userId},{$push: {postId: post._id}}, {safe: true, upsert: true}).exec((error, result)=> {
            if(error) {
              console.log('Error update')
              res.send({success: false, msg: 'Error updating user data'})
            } else {
              console.log('User data updated')
              res.send({success: true, data: post, msg: 'Post created'})
            }
          })
        }
    })
  },
  answer : (req, res)=> {
    Post.findOne({_id: req.params.postId}, (err, post)=> {
      if(err) {
        res.send({success: false, msg: 'Error find post'})
      } else {
        post.answers.push({
          userId : req.params.username,
          title: req.body.title,
          content: req.body.content
        })
        console.log('Answer created')
        res.send({success: true, data: null, msg: 'Create answer success'})
      }
    })
  },
  getQuestions : (req, res)=> {
    Post.find({})
      // .populate('userId votes')
      .exec((err, posts)=> {
      if(err) {
        res.send({success: false, msg: 'Error getting data from database'})
      } else {
        res.send({success: true, data: posts, msg: ''}
      }
    })
  },
  getOneQuestion : ()=> {
    Post.findOne({_id: req.params.postId})
      .populate('userId votes')
      .exec((err, post)=> {
        if(err){
          res.send({success: false, msg: 'Error getting data'})
        } else {
          res.send({success: true, data: post, msg: ''})
        }
      })
  },
  deletePost : (req, res)=> {
    Post.findByIdAndRemove(req.params.postId, (err, post)=> {
      if(err) {
        res.send({success: false, msg: 'Delete data failed'})
      } else {
        console.log('Post deleted')
        User.update({username: post.userId}, { $pullAll : {postId: post._id} }).exec((error, result)=> {
          if(error) {
            console.log('Error update user data')
            res.send({success: false, msg: 'User update data failed'})
          } else {
            console.log('Post deleted')
            res.send({success: true, data: null, msg: 'Post deleted'})
          }
        })
      }
    })
  },
  deleteAnswer : ()=> {
    Post.findOne({})
  }
  editPost : (req, res)=> {
    Post.findOne({})
  }
}