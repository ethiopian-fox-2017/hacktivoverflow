import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Ask from '@/components/Ask'
import Question from '@/components/Question'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:username',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/ask',
      name: 'Ask',
      component: Ask
    },
    {
      path: '/question/:id',
      name: 'Question',
      component: Question
    }
  ]
})
