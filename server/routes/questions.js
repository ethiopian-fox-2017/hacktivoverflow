var express = require('express');
var router = express.Router();
var Question = require('../controllers/questionController')
var Answer = require('../controllers/answerController')
var Check = require('../helpers/authentication')

//add authentication middleware before each questions and answers method!
////// Questions //////
router.post('/', Check.isLoggedIn, Question.addQuestion); //parameter: title, content, userId untuk me-refer siapa author nya
router.get('/', Check.isLoggedIn, Question.getQuestions);
router.get('/:questionId', Check.isLoggedIn, Question.getOneQuestion);
router.put('/up/:questionId', Check.isLoggedIn, Question.upvoteQuestion);
router.put('/down/:questionId', Check.isLoggedIn, Question.downvoteQuestion);
router.delete('/:questionId', Question.deleteQuestion);
router.put('/:questionId', Question.editQuestion);

////// Answers //////
router.put('/:questionId/answers', Check.isLoggedIn, Answer.answering); //Answering a Question, parameter yang dikirim di body: username[_id]. content
// router.post('/:questionId/answers', Answer.answering)
router.put('/answers/up/:questionId', Check.isLoggedIn, Answer.upvoteAnswer);
router.put('/answers/down/:questionId', Check.isLoggedIn, Answer.downvoteAnswer);

module.exports = router;
