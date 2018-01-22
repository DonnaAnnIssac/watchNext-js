import Vue from 'vue'
import App from './App'
// import router from './router'

Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue()

new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
