const express = require('express')
const router = express.Router()
const User = require('../controller/user')

/* User Routes */
router.get('/user', User.listUser)
router.post('/register', User.createUser)
router.post('/login', User.login)
router.delete('/user/:username', User.deleteUser)

/* Post Routes */

// Get posts
router.get('/post')
router.get('/post/:postId')

// Post ask or answer
router.post('/post/question')
router.post('/post/answer/:postId')

// Votes
router.get('/vote/question/:postId')
router.get('/vote/answer/:postId/:answerId')

// Delete ask or answer
router.delete('/post/question/:postId')
router.delete('/post/answer/:postId/:answerId')

module.exports = router