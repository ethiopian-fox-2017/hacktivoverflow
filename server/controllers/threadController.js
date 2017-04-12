var Thread = require('../models/threadModel');
var User   = require('../models/userModel');

var thread={}

// controller thread
thread.add = (req,res,next) => {
  Thread.create({
    "title"      : req.body.title,
    "content"    : req.body.content,
    "author"     : [req.params.id],
    "created_at" : new Date()
  }, (err,result) => {
    if(err){
      res.send(err);
    } else {
      User.findOneAndUpdate({
        _id : req.params.id
      },{
        $push: {"thread": result._id}
      },{
        safe: true,
        upsert: true,
        new : true}
      ,(err,user) => {
        if (err) {
          res.send (err);
        } else {
          res.send (user);
        }
      });
    }
  });
}
thread.findAll = (req,res,next) => {
  Thread
  .find()
  .populate('author', ['username'])
  .exec((error,thread) => {
    if(error){
      res.send(error);
    } else {
      res.send(thread);
    }
  });
}
thread.findOne = (req,res,next) => {
  Thread.findOne({
    _id : req.params.id
  },(err,thread) => {
    if (err) {
      res.send ('Thread not found');
    } else {
      res.send (thread);
    }
  })
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
  , (err,thread) => {
    if (err) {
      res.send (err);
    } else {
      res.send (thread);
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
      let userid = result.author;
      let threadid = result._id;
      User.findOne({
        _id : userid
      }, (err,user) => {
        if (err) {
          res.send(err);
        } else {
          console.log(user.thread)
          let threadArr = user.thread.filter((value) => {
            return value.toString() !== threadid.toString()
          })
          User.update({
            _id : userid
          },{
            "thread" : threadArr
          },(err,result) => {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          })
        }
      })
    }
  });
}

module.exports = thread
