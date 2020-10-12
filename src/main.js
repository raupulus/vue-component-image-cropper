import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import Component from './Component.vue'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(Component),
}).$mount('#app')
