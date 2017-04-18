import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(iView)

import App from './App.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import Ask from './components/Ask.vue'
import QuestionList from './components/QuestionList.vue'
import Question from './components/Question.vue'
import Profile from './components/Profile.vue'

const routes = [
  {
    path: '/'
  },
  {
    path: '/users/signup',
    component: Signup
  },
  {
    path: '/users/signin',
    component : Login
  },
  {
    path: '/questions/ask',
    component: Ask
  },
  {
    path : '/questions',
    component : QuestionList
  },
  {
    path: '/questions/:id',
    component : Question,
    props : true
  },
  {
    path : '/profile',
    component : Profile
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
