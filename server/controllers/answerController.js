var Thread = require('../models/threadModel');
var User   = require('../models/userModel');
var Answer = require('../models/answerModel');

var answer={}

// controller answer
answer.add = (req,res,next) => {
  Answer.create({
    "content"    : req.body.content,
    "created_by" : [req.params.userid],
    "thread"     : [req.params.threadid],
    "created_at" : new Date()
  }, (err,result) => {
    if(err){
      res.send(err);
    } else {
      User.findOneAndUpdate({
        _id : req.params.userid
      },{
        $push: {"answer": result._id}
      },{
        safe: true,
        upsert: true,
        new : true}
      ,(err,user) => {
        if (err) {
          res.send (err);
        } else {
          Thread.findOneAndUpdate({
            _id : req.params.threadid
          },{
            $push: {"answer": result._id}
          },{
            safe: true,
            upsert: true,
            new : true}
          ,(err,thread) => {
            if (err) {
              res.send (err);
            } else {
              res.send(thread)
            }
          });
        }
      });
    }
  });
}
answer.findAll = (req,res,next) => {
  Answer
  .find()
  .populate('created_by', ['username'])
  .exec((error,answer) => {
    if(error){
      res.send(error);
    } else {
      res.send(answer);
    }
  });
}
answer.findOne = (req,res,next) => {
  Answer
  .findOne({_id : req.params.id})
  .populate('created_by', ['username'])
  .exec((error,answer) => {
    if(error){
      res.send(error);
    } else {
      res.send(answer);
    }
  });
}
answer.update = (req,res,next) => {
  Answer.findByIdAndUpdate({
    _id : req.params.id
  },{
    $set: {
      content   : req.body.content,
      update_at : new Date()
    }
  },
  {
    new:true
  }
  , (err,answer) => {
    if (err) {
      res.send (err);
    } else {
      res.send (answer);
    }
  });
}
answer.delete = (req,res,next) => {
  Answer.findOneAndRemove({
    _id : req.params.id
  },(err,result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

module.exports = answer
