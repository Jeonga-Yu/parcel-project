import Vue from 'vue'
import App from './App.vue'
import store from './store'
// import 'babel-polyfill'
import '@fortawesome/fontawesome-free/css/all.css'


// new Vue({store, render: createElement => createElement(App)}).$mount('#app')

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
