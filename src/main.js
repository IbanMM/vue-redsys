import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueCryptojs from 'vue-cryptojs'

Vue.config.productionTip = false

Vue.use(VueCryptojs)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
