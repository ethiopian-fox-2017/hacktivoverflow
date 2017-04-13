'use strict'

var express = require('express');
var router = express.Router();
var controlQuest = require('../controller/questController')

router.get('/', controlQuest.getQuests);

router.get('/:title', controlQuest.getOneQuest);

router.post('/', controlQuest.createQuests);

router.put('/', controlQuest.updateQuests);

router.delete('/', controlQuest.delQuests);

module.exports = router;