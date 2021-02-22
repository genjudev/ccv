import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Ninja from "./components/Ninja"
import List from "./components/List"
import store from "./store";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUserNinja, faClipboard, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(faTwitter, faUserNinja, faClipboard, faShareAlt);
Vue.config.productionTip = false

Vue.use(VueRouter);
const router = new VueRouter( {
  mode: 'history',
  routes: [
    { name: "list", path: '/:shortId', component: List },
    { path: '/', component: Ninja},
    
  ]
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
