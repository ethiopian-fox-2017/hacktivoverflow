const express = require('express')
const router = express.Router()
const User = require('../controller/user')

/* User Routes */
router.get('/user', User.listUser)
router.post('/register', User.createUser)
router.post('/login', User.login)
router.put('/user/:username', User.editUser)
router.delete('/user/:username', User.deleteUser)

/* Post Routes */

// Get posts
router.get('/post')
router.get('/post/:postId')

// Post ask or answer
router.post('/post/question/:username')
router.post('/post/answer/:username/:postId')

// Update ask or answer
router.put('/post/question/:postId')
router.put('/post/answer/:username/:postId')

// Delete ask or answer
router.delete('/post/question/:postId')
router.delete('/post/answer/:postId/:answerId')

module.exports = router