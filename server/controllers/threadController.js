var Thread = require('../models/threadModel');
var User   = require('../models/userModel');
var Answer = require('../models/answerModel');

var thread={}

// controller thread
thread.add = (req,res,next) => {
  Thread.create({
    "title"      : req.body.title,
    "content"    : req.body.content,
    "author"     : [req.params.userid],
    "created_at" : new Date()
  }, (err,result) => {
    if(err){
      res.send(err);
    } else {
      res.send(result)
    }
  });
}
thread.findAll = (req,res,next) => {
  Thread
  .find()
  .populate('author')
  .exec((error,result) => {
    if(error){
      res.send(error);
    } else {
      res.send(result);
    }
  });
}
thread.findOne = (req,res,next) => {
  Thread.findOne({
    _id : req.params.id
  },(err,result) => {
    if (err) {
      res.send (err);
    } else {
      res.send (result);
    }
  });
}
thread.update = (req,res,next) => {
  Thread.findByIdAndUpdate({
    _id : req.params.id
  },{
    $set: {
      title     : req.body.title,
      content   : req.body.content,
      update_at : new Date()
    }
  },
  {
    new:true
  }
  , (err,result) => {
    if (err) {
      res.send (err);
    } else {
      res.send (result);
    }
  });
}
thread.delete = (req,res,next) => {
  Thread.findOneAndRemove({
    _id : req.params.id
  }, (err,result) => {
    if (err) {
      res.send(err);
    } else {
      Answer.remove({
        thread : req.params.id
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
module.exports = thread
