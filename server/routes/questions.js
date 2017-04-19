var express = require('express');
var router = express.Router();
var Question = require('../controllers/questionController')
var Answer = require('../controllers/answerController')
var Check = require('../helpers/authentication')
var Current = require('../helpers/current')

//add authentication middleware before each questions and answers method!
////// Questions //////
router.post('/', Check.isLoggedIn, Question.addQuestion); //parameter: title, content, userId untuk me-refer siapa author nya
router.get('/', Check.isLoggedIn, Question.getQuestions); //getting all questions in Isi.vue
router.get('/current', Current.showCurrentUser); //getting currently signed in username
router.get('/:questionId', Check.isLoggedIn, Question.getOneQuestion); //getting detailed info of questions in Detail.vue
router.put('/up/:questionId', Check.isLoggedIn, Question.upvoteQuestion); //upvoting a Question
router.put('/down/:questionId', Check.isLoggedIn, Question.downvoteQuestion); //downvoting a Question
router.delete('/:questionId', Check.isLoggedIn, Question.deleteQuestion);
router.get('/list/:authorId', Check.isLoggedIn, Question.getQuestionsByAuthor);
router.put('/:questionId', Question.editQuestion);

////// Answers //////
router.put('/:questionId/answers', Check.isLoggedIn, Answer.answering); //Answering a Question, parameter yang dikirim di body: username[_id]. content
// router.post('/:questionId/answers', Answer.answering)
router.put('/answers/up/:questionId', Check.isLoggedIn, Answer.upvoteAnswer); //upvoting an Answer
router.put('/answers/down/:questionId', Check.isLoggedIn, Answer.downvoteAnswer); //downvoting an Answer

module.exports = router;
