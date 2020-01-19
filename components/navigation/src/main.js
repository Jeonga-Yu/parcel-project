import Vue from 'vue'
import App from './App.vue'
import VueRouter from '../router'

new Vue({
    router: VueRouter,
    render: createElement => createElement(App)
}).$mount('#app')