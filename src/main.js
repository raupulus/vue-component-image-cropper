import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import Component from './Component.vue'
import CropperModal from './components/CropperModal.vue';

Vue.config.productionTip = false

Vue.component("v-image-cropper-modal", CropperModal);

new Vue({
  vuetify,
  render: h => h(Component),
}).$mount('#app')
