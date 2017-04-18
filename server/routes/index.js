var express = require('express'),
    router = express.Router(),
    Question = require('../controllers/questions'),
    User = require('../controllers/users')

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
      })

      .post('/questions', Question.post)

      .delete('/questions/:id', Question.delete)

      .get('/questions/:id', Question.getById)

      .post('/users/register', User.register)

      .post('/users/login', User.signin)

      .get('/users', User.getAll)

      .get('/questions', Question.grabAll)

      .post('/questions/:id/votes', Question.giveVote)

      .post('/questions/:id/answers', Question.giveAnswer)

      .post('/questions/:id/answers/votes',Question.answerGiveVotes)

      .get('/questions/:id/delete', Question.deleteQuestion)

      .get('/profile/:token', User.getProfile)

      .put('/questions/:id', Question.updateQuestion)




module.exports = router;
