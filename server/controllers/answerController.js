var Question = require('../models/question');
var User = require('../models/user');
var Answer = require('../models/answer');

var answering = function(req, res) {
  console.log(req.body);
  Question.findOneAndUpdate({
    _id: req.params.questionId
  },{
      $push: { answer: {user: req.body.decoded.user, content: req.body.content} }
  },{
    safe: true,
    upsert: true,
    new: true
  }, function(err, answer) {
    if(err) {
      res.send(err)
    } else {
      res.send(answer)
    }
  })
}

var upvoteAnswer = function(req, res) {
    Question.findOne({
      '_id': req.params.questionId,
      'answer._id': req.body.answer
    },{'answer.$': 1}, function(err, result) {
      if (!err) {
        let found = result.answer[0].upVotes.some(x => x == req.body.decoded.user)
        let found2 = result.answer[0].downVotes.some(x => x == req.body.decoded.user)
        if(found || found2) {
          res.send({
            msg: 'Each user can only vote once per answer.'
          })
        } else {
          Question.findOneAndUpdate({
            '_id': req.params.questionId,
            'answer._id' : req.body.answer
          },{
            '$push':{
              'answer.$.upVotes': req.body.decoded.user
            }
          },function(err,result){
            if(err){
              res.send(err);
            } else {
              res.send({
                msg: `upvoting answer success`
              });
            }
          })
        }
      } else {
        res.send(err)
      }
    })
  }

var downvoteAnswer = function(req, res) {
    Question.findOne({
      '_id': req.params.questionId,
      'answer._id': req.body.answer
    },{'answer.$': 1}, function(err, result) {
      if (!err) {
        let found = result.answer[0].upVotes.some(x => x == req.body.decoded.user)
        let found2 = result.answer[0].downVotes.some(x => x == req.body.decoded.user)
        if(found || found2) {
          res.send({
            msg: 'Each user can only vote once per answer.'
          })
        } else {
          Question.findOneAndUpdate({
            '_id': req.params.questionId,
            'answer._id' : req.body.answer
          },{
            '$push':{
              'answer.$.downVotes': req.body.decoded.user
            }
          },function(err, result){
            if(err){
              res.send(err);
            } else {
              res.send({
                msg: `downvoting answer success`
              });
            }
          })
        }
      } else {
        res.send(err)
      }
    })
  }

module.exports = {
  answering,
  upvoteAnswer,
  downvoteAnswer
}
