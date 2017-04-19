import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Isi from '@/components/Isi'
import Login from '@/components/Login'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/isi',
      name: 'Isi',
      component: Isi
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
      props: true
    }
  ]
})
