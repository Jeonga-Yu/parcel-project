import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: () => import('../src/Navigation') },
    { path: '/test', component: () => import('../src/Test')},
    { path: '*', redirect: '/' }
  ]
})

export default router