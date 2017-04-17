const express = require('express')
const router = express.Router()
const User = require('../controller/user')
const Post = require('../controller/post')

/* User Routes */
router.get('/user', User.listUser)
router.get('/user/:username', User.findOneUser)
router.post('/register', User.register)
router.post('/login', User.login)
router.delete('/user/:username', User.deleteUser)

/* Post Routes */

// Get posts
router.get('/post', Post.getQuestions)
router.get('/post/:postId', Post.getOneQuestion)

// Post ask or answer
router.post('/post/question', Post.ask)
router.post('/post/answer/:postId', Post.answer)

// Votes
router.post('/vote/question/:postId', Post.vote)
router.post('/vote/answer/:postId/:answerId', Post.voteAnswer)

// Delete ask or answer
router.delete('/post/question/:postId', Post.deletePost)
router.delete('/post/answer/:postId/:answerId', Post.deleteAnswer)

module.exports = router