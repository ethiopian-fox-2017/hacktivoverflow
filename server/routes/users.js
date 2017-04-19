var express = require('express');
var router = express.Router();
var User = require('../controllers/userController')

router.post('/', User.signup);
router.get('/', User.getUsers);

router.delete('/:userId', User.deleteUser);
router.put('/:userId', User.editUser);
router.get('/:userId', User.findOneUser)

module.exports = router;
