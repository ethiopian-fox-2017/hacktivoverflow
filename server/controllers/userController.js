var User = require('../models/userModel');
var Thread = require('../models/threadModel');
var user={}

user.add = (req,res,next) => {
  User.create({
    "username"  : req.body.username,
    "password"  : req.body.password,
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
  User
  .find()
  .populate('thread',['title'])
  .populate('answer',['content'])
  .exec((error,user) => {
    if(error){
      res.send(error);
    } else {
      res.send(user);
    }
  });
}
user.findOne = (req,res,next) => {
  User
  .findOne({_id : req.params.id})
  .populate('thread', ['title'])
  .exec((error,user) => {
    if(error){
      res.send(error);
    } else {
      res.send(user);
    }
  });
}
user.update = (req,res,next) => {
  User.findOneAndUpdate({
    _id : req.params.id
  },{
    "username"  : req.body.username,
    "password"  : req.body.password,
  }, (err,user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
}
user.delete = (req,res,next) => {
  User.findOneAndRemove({
    _id : req.params.id
  },(err,user) => {
    if (err) {
      res.send(err);
    } else {
      Thread.remove({
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

module.exports = user
