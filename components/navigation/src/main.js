import Vue from 'vue'
import App from './App.vue'
import VueRouter from '../router'
import nav from './navigation.json'

new Vue({
    router: VueRouter,
    nav: nav,
    render: createElement => createElement(App)
}).$mount('#app')