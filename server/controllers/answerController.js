var Thread = require('../models/threadModel');
var User   = require('../models/userModel');
var Answer = require('../models/answerModel');

var answer={}

// controller answer
answer.add = (req,res,next) => {
  Answer.create({
    "content"    : req.body.content,
    "author"     : req.params.userid,
    "thread"     : req.params.threadid,
    "createdAt"  : new Date(),
    "updatedAt"  : new Date()
  }, (err,result) => {
    if(err){
      res.send(err);
    } else {
      res.send(result);
    }
  });
}
answer.findAll = (req,res,next) => {
  Answer
  .find()
  .populate('author')
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
  .findOne({
    _id : req.params.id
  },(error,answer) => {
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
      updatedAt  : new Date()
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
answer.voteup = (req,res,next) => {
  Answer.findOne({
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
          Answer.findByIdAndUpdate({
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
answer.votedown = (req,res,next) => {
  Answer.findOne({
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
          Answer.findByIdAndUpdate({
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
module.exports = answer
