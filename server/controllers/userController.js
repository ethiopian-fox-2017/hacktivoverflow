var Thread = require('../models/threadModel');
var User   = require('../models/userModel');
var Answer = require('../models/answerModel');

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

module.exports = user
