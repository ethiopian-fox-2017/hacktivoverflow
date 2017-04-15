var express  = require('express');
var router   = express.Router();
var thread   = require('../controllers/threadController');
var user     = require('../controllers/userController');
var answer   = require('../controllers/answerController');
var passport = require('passport');
var check    = require('../helper/verify.js')

/* thread routing */
router.post('/thread/:userid', check.verify, thread.add);
router.get('/thread', check.verify, thread.findAll);
router.get('/thread/:id', check.verify, thread.findOne);
router.delete('/thread/:id', check.verify, thread.delete);
router.put('/thread/:id', check.verify, thread.update);

/* user routing. */
router.post('/user', user.add);
router.get('/user', user.findAll);
router.get('/user/:id', user.findOne);
router.delete('/user/:id', check.verify, user.delete);
router.put('/user/:id', check.verify, user.update);
router.post('/signup', user.signup);
router.post('/signin', passport.authenticate('local',{ session: false }), user.login);

/* answer routing. */
router.post('/answer/:userid/:threadid', check.verify, answer.add)
router.get('/answer', check.verify, answer.findAll);
router.delete('/answer/:id', check.verify, answer.delete);

module.exports = router;
