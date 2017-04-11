const express = require('express')
const router = express.Router()
const User = require('../controller/user')

/* Routes */
router.get('/user', User.listUser)
router.post('/user', User.createUser)
router.put('/user/:objectId', User.editUser)
router.delete('/user/:objectId', User.deleteUser)

module.exports = router