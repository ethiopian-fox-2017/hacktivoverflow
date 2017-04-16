const Thread   = require('../models/threadModel');
const User     = require('../models/userModel');
const Answer   = require('../models/answerModel');
const passHash = require('password-hash');
const jwt      = require('jsonwebtoken');
require('dotenv').config()

var user={}

user.add = (req,res,next) => {
  let password = passHash.generate(req.body.password);
  User.create({
    "username"  : req.body.username,
    "password"  : password,
    "joined_at" : new Date()
  }, (err,result) => {
    if(err){
      res.send(err);
    } else {
      res.send(result);
    }
  });
}
user.findAll = (req,res,next) => {
  User.find({

  },(error,result) => {
    if(error){
      res.send(error);
    } else {
      res.send(result);
    }
  });
}
user.findOne = (req,res,next) => {
  User
  .findOne({
    _id : req.params.id
  },(error,result) => {
    if(error){
      res.send(error);
    } else {
      res.send(result);
    }
  });
}
user.update = (req,res,next) => {
  User.findOneAndUpdate({
    _id : req.params.id
  },{
    "username"  : req.body.username,
    "password"  : req.body.password
  }, (err,result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
}
user.delete = (req,res,next) => {
  User.findOneAndRemove({
    _id : req.params.id
  },(err,result) => {
    if (err) {
      res.send(err);
    } else {
      Thread.remove({
        author : req.params.id
      },(err,result) => {
        if (err) {
          res.send(err);
        } else {
          Answer.remove({
            author : req.params.id
          },(err,result) => {
            if (err) {
              res.send(err);
            } else {
              res.send(result)
            }
          });
        }
      });
    }
  });
}
user.signup = (req,res,next) => {
  let password = passHash.generate(req.body.password);
  User.create({
    "username"  : req.body.username,
    "password"  : password,
    "joined_at" : new Date()
  }, (err,result) => {
    if(err){
      res.send(err);
    } else {
      res.send(result);
    }
  });
}
user.login = (req,res,next) => {
  res.send({
    user: req.user,
    token: jwt.sign({id:user._id, username:user.username}, process.env.SECRETKEYS),
    isLogin: true
  });
}

module.exports = user
