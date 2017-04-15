var Question = require('../models/question');
var User = require('../models/user');
var Answer = require('../models/answer');

var addQuestion = function (req, res) {
  Question.create({
    author: req.body.author, //insert USER ID in the Body of POSTMAN
    title: req.body.title,
    content: req.body.content
  }, function(err, result) {
    if(err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

var getQuestions = function(req,res) {
  //console.log(req.headers);
  Question.find()
  .populate('author', ['username'])
  .exec(function(err, question){
    if(err){
      res.send(err)
    } else {
      res.send(question)
    }
  })
}

var getOneQuestion = function(req, res) {
  Question.findOne({
    _id: req.params.questionId
  }, function(err, question) {
    if(err){
      res.send(err)
    } else {
      res.send(question)
    }
  })
}

var editQuestion = function(req, res) {
  Question.findOneAndUpdate({
    _id: req.params.questionId
  },{
    title: req.body.title,
    content: req.body.content
  }, function(err, question) {
    if(err) {
      res.send(err)
    } else {
      res.send('Question updated')
    }
  })
}

var deleteQuestion = function(req, res) {
  Question.findOneAndRemove({
    _id: req.params.questionId
  }, function(err, question){
    if(err){
      res.send(err)
    } else {
      res.send('Question deleted')
    }
  })
}

var upvoteQuestion = function(req, res) {
  console.log('ini question');
  console.log('decoded : ', req.body.decoded);
    Question.findOne({
      '_id': req.params.questionId
    }, function(err, result) {
      if (!err) {
        let found = result.upVotes.some(x => x == req.body.decoded.user)
        let found2 = result.downVotes.some(x => x == req.body.decoded.user)
        if(found || found2) {
          res.send({
            msg: 'Each user can only vote once per question.'
          })
        } else {
          Question.findOneAndUpdate({
            '_id': req.params.questionId
          },{
            '$push':{
              'upVotes': req.body.decoded.user
            }
          },function(err, result){
            if(err){
              res.send(err);
            } else {
              res.send({
                msg: `upvoting question: ${result.title}, success!`
              });
            }
          })
        }
      } else {
        res.send(err)
      }
    })
  }


var downvoteQuestion = function(req, res) {
    Question.findOne({
      '_id': req.params.questionId
    }, function(err, result) {
      if (!err) {
        let found = result.upVotes.some(x => x == req.body.decoded.user)
        let found2 = result.downVotes.some(x => x == req.body.decoded.user)
        if(found || found2) {
          res.send({
            msg: 'Each user can only vote once per question.'
          })
        } else {
          Question.findOneAndUpdate({
            '_id': req.params.questionId
          },{
            '$push':{
              'downVotes': req.body.decoded.user
            }
          },function(err, result){
            if(err){
              res.send(err);
            } else {
              res.send({
                msg: `downvoting question: ${result.title}, success!`
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
  addQuestion,
  getQuestions,
  getOneQuestion,
  editQuestion,
  deleteQuestion,
  upvoteQuestion,
  downvoteQuestion
}
