var User = require('../models/user')
var passwordHash = require('password-hash') //will be used for signup method
var jwt = require('jsonwebtoken') //will be used for login method
require('dotenv').config()

var signup = function(req, res, next) {
  User.create({
    username: req.body.username,
    password: passwordHash.generate(req.body.password),
  }, function(err, user) {
    if(err){
      res.send(err)
    } else {
      res.send(user)
    }
  });
}

var getUsers = function(req, res, next) {
  User.find(function(err, users) {
    if(err) {
      res.send({error: err})
    } else {
      res.send(users)
    }
  });
}

var deleteUser = function(req, res) {
  User.findByIdAndRemove(req.params.userId, function(err,user){
    if(err){
      res.send(err)
    } else {
      res.send(`User ${user.username} has been deleted`)
    }
  })
}

var editUser = function(req, res) {
  User.findOneAndUpdate({
    _id : req.params.userId
  }, {
    username: req.body.username,
    password: passwordHash.generate(req.body.password),
  }, function(err, user){
    if(err){
      res.send(err)
    } else {
      res.send(user)
    }
  })
}

var findOneUser = function(req, res) {
  User.findOne({
    _id : req.params.userId
  }, function(err, user){
    if(err){
      res.send(err)
    } else {
      res.send(user)
    }
  })
}

var login = function(req,res) {
  User.findOne({
    username: req.body.username
  }, function(err, user){
    if(err || user == null ){
      res.send({
        success: false,
        msg: 'USERNAME NOT EXIST'
      })
    } else {
      if(passwordHash.verify(req.body.password, user.password)){
        let token = jwt.sign(
          {
            user: user._id,
            username: user.username
          },
          process.env.SECRETKEYS
        )
        res.send(token)
      } else {
        res.send({
          success: false,
          msg: 'INVALID PASSWORD'
        })
      }
    }
  })
}

module.exports = {
  signup,
  getUsers,
  deleteUser,
  editUser,
  findOneUser,
  login
}
