import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueRx from 'vue-rx'
import Component from './Component.vue'
import CropperModal from './components/CropperModal.vue';
//import VueAxios from "vue-axios";


//https://www.npmjs.com/package/vuejs-clipper
//https://timtnleeproject.github.io/vuejs-clipper/#/examples/quick-start
//https://timtnleeproject.github.io/vuejs-clipper/#/examples/profile-photo

import {
  clipperBasic, 
  clipperUpload, 
  clipperFixed, 
  clipperPreview, 
  clipperRange
} from 'vuejs-clipper';

Vue.config.productionTip = false

Vue.component("clipper-basic", clipperBasic);
Vue.component("clipper-upload", clipperUpload);
Vue.component("clipper-fixed", clipperFixed);
Vue.component("clipper-preview", clipperPreview);
Vue.component("clipper-range", clipperRange);
Vue.component("v-image-cropper-modal", CropperModal);

Vue.use(VueRx);

new Vue({
  vuetify,
  render: h => h(Component),
}).$mount('#app')
