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
          res.send(err)
        } else {
          console.log(`${req.body.username} added into Database`)
          res.send(user)
        }
    })
  },
  login : (req, res)=> {
    user.findOne({username: req.body.username}, (err, user)=> {
      if(err) {
        res.send(err)
      } else {
        if(pwHash.verify(req.body.password, user.password)) {
          let token = jwt.sign({username: user.username}, process.env.SECRET_KEY)
          res.set({'Authorization', 'Bearer '+token}).send('Login Success')
        } else {
          res.send('Login Failed')
        }
      }
    })
  },
  listUser : (req, res)=> {
    User.find({})
      .populate('postId')
      .exec((err, users)=> {
      if(err) {
        res.send(err)
      } else {
        res.send(users)
      }
    })
  },
  deleteUser : (req, res)=> {
    User.findOneAndRemove({username: req.params.username}, (err, user)=> {
      if(err){
        res.send(err)
      } else {
        console.log('Delete user success')
        res.send(user)
      }
    })
  }
}