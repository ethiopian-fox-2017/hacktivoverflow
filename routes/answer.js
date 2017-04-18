'use strict'

var express = require('express');
var router = express.Router();
var controlAns = require('../controller/ansController')

router.get('/', controlAns.getAnswers);

router.get('/:title', controlAns.getOneAnswer);

router.post('/', controlAns.createAnswers);

router.put('/', controlAns.updateAnswers);

router.delete('/', controlAns.delAnswers);

module.exports = router;