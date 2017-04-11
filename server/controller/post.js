const Post = require('../models/post')
const User = require('../models/user')

module.exports = {

  createPost : (req, res)=> {
    let newPost = Post({
      userId : req.params.userId,
      title: req.body.title,
      content: req.body.content,
      postType : req.body.postType,
    })
    newPost.save((err, post)=> {
        if(err) {
          res.send({success: false, msg: 'Error saving data into database'})
        } else {
          User.update({_id: post.userId},{$push: {postId: post._id}}, {safe: true, upsert: true}).exec(()=> {
            console.log(`${req.body.username} added into Database`)
            res.send({success: true, data: post, msg: 'Post created'})
          })
        }
    })
  },
  getPost : (req, res)=> {
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
  deletePost : (req, res)=> {
    Post.findByIdAndRemove(req.params.objectId, (err, post)=> {
      if(err){
        res.send({success: false, msg: 'Error deleting data in database'})
      } else {
        User.update({_id : post.userId}, {$pullAll: {postId : post._id}}).exec(()=> {
          console.log('Data deleted in Database')
          res.send({success: true, data: post, msg: '')
        })
      }
    })
  },
  editPost : (req, res)=> {
    Post.findOne({_id: req.params.objectId}, (err, user)=> {
      if(err) {
        res.send(err)
      } else {
        user.username = req.body.username ? req.body.username : user.username
        user.password = req.body.password ? pwHash.generate(req.body.password) : user.password
        User.save()
      }
    })
  }
}