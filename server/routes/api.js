var express = require('express');
var router  = express.Router();
var thread  = require('../controllers/threadController');
var user    = require('../controllers/userController');
var answer  = require('../controllers/answerController');

/* thread routing */
router.post('/thread/user/:id', thread.add);
router.get('/thread', thread.findAll);
router.get('/thread/:id', thread.findOne);
router.delete('/thread/:id', thread.delete);
router.put('/thread/:id', thread.update);

/* user routing. */
router.post('/user', user.add);
router.get('/user', user.findAll);
router.get('/user/:id', user.findOne);
router.delete('/user/:id', user.delete);
router.put('/user/:id', user.update);

/* answer routing. */
router.post('/answer/:userid/:threadid', answer.add)
router.get('/answer', answer.findAll);
router.delete('/answer/:id', answer.delete);

module.exports = router;
