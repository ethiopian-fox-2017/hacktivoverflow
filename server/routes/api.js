const express = require('express')
const router = express.Router()
const User = require('../controller/user')

/* User Routes */
router.get('/user', User.listUser)
router.post('/register', User.createUser)
router.post('/login', User.login)
router.put('/user/:objectId', User.editUser)
router.delete('/user/:objectId', User.deleteUser)

/* Post Routes */
router.get('/post')
router.post('/post/:userId')
router.put('/post/:postId')
router.delete('/post/:postId')

module.exports = router