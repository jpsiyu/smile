import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import init from '@/init'


import '@/plugins/axios'
import '@/plugins/element'
import "@/plugins/shh"

import "@/assets/color.css"

Vue.config.productionTip = false

init().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
