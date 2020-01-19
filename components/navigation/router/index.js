import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: () => import('../src/Navigation') },
    { path: '/test', component: () => import('../src/Test')},
    // { path: '/HSSE/Dashboard', component: () => import('D:\Workspace\parcel-project\Views\HSSE\Dashboard')},
    { path: '/HSSE/Dashboard', component: () => import('../../../Views/HSSE/Dashboard')},
    { path: '*', redirect: '/' }
  ]
})

export default router