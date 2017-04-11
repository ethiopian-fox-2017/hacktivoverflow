const User = require('../models/user')
const pwHash = require('password-hash')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

  register : (req, res)=> {
    let newUser = User({
      username: req.body.username,
      password: pwHash.generate(req.body.password)
    })
    newUser.save((err, user)=> {
        if(err) {
          res.send({success: false, msg: 'User failed to register'})
        } else {
          console.log(`${req.body.username} added into Database`)
          res.send({success: true, data: user, msg: 'Register success'})
        }
    })
  },
  login : (req, res)=> {
    user.findOne({ username: req.body.username}, (err, user)=> {
      if(err) {
        res.send({success: false, msg: 'User not found'})
      } else {
        if(pwHash.verify(req.body.password, user.password)) {
          let token = jwt.sign({id: user._id, username: user.username}, process.env.SECRET_KEY)
          res.send({success: true, data: token, msg: 'Login success'})
        } else {
          res.send({success: false, msg: 'Login failed'})
        }
      }
    })
  },
  listUser : (req, res)=> {
    User.find({})
      // .populate('questionId answerId voteId')
      .exec((err, users)=> {
      if(err) {
        res.send({success: false, msg: 'User failed to register'})
      } else {
        res.send({success: true, data: users, msg: ''})
      }
    })
  },
  deleteUser : (req, res)=> {
    User.findByIdAndRemove(req.params.objectId, (err, user)=> {
      if(err){
        res.send({success: false, msg: 'User delete failed'})
      } else {
        console.log('Delete user success')
        res.send({success: true, data: user, msg: ''})
      }
    })
  },
  editUser : (req, res)=> {
    User.findOne({_id: req.params.objectId}, (err, user)=> {
      if(err) {
        res.send({success: false, msg: 'User not found'})
      } else {
        user.username = req.body.username ? req.body.username : user.username
        user.password = req.body.password ? pwHash.generate(req.body.password) : user.password
        user.save((err, data)=> {
          if(err) {
            res.send({success: false, msg: 'User update failed'})
          } else {
            res.send({success: true, data: user, msg: ''})
          }
        })
      }
    })
  }
}