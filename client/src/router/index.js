import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Main from '@/components/Main'
import Navigation from '@/components/Navigation'
import Post from '@/components/Post'
import Sidebar from '@/components/Sidebar'
import Question from '@/components/Question'
import Answer from '@/components/Answer'
import Sitemap from '@/components/Sitemap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Main',
      component: Main
    },
    {
      path: '/',
      name: 'Sitemap',
      component: Sitemap
    }
  ]
})
