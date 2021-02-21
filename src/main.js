import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Ninja from "./components/Ninja"
import List from "./components/List"

Vue.config.productionTip = false

Vue.use(VueRouter);
const router = new VueRouter( {
  mode: 'history',
  routes: [
    { path: '/:shortId', component: List },
    { path: '/', component: Ninja},
    
  ]
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
