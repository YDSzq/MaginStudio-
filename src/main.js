import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store/index.js'
import axios from 'axios'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(elementui)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
