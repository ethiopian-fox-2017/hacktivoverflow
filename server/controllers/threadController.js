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
    "createdAt"  : new Date(),
    "updatedAt"  : new Date()
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
      updatedAt : new Date()
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
thread.voteup = (req,res,next) => {
  Thread.findOne({
    _id : req.params.id
  },
  (err,result) => {
    if (err) {
      res.send (err);
    } else {
      let voteup = result.upvote.map(instance => {
        return instance == req.params.userid
      })
      let votedown = result.downvote.map(instance => {
        return instance == req.params.userid
      })
      if (voteup.length == 0 && votedown.length == 0) {
          Thread.findByIdAndUpdate({
            _id : req.params.id
          },{
            $push: {
              upvote   : req.params.userid
            }
          },
          {
            safe    :true,
            upsert  :true,
            new     :true
          }
          , (err,result) => {
            if (err) {
              res.send (err);
            } else {
              res.send (result);
            }
          });
      } else {
        res.send(false)
      }
    }
  })
}
thread.votedown = (req,res,next) => {
  Thread.findOne({
    _id : req.params.id
  },
  (err,result) => {
    if (err) {
      res.send (err);
    } else {
      let voteup = result.upvote.map(instance => {
        return instance == req.params.userid
      })
      let votedown = result.downvote.map(instance => {
        return instance == req.params.userid
      })
      if (voteup.length == 0 && votedown.length == 0) {
          Thread.findByIdAndUpdate({
            _id : req.params.id
          },{
            $push: {
              downvote   : req.params.userid
            }
          },
          {
            safe    :true,
            upsert  :true,
            new     :true
          }
          , (err,result) => {
            if (err) {
              res.send (err);
            } else {
              res.send (result);
            }
          });
      } else {
        res.send(false)
      }
    }
  })
}
module.exports = thread
