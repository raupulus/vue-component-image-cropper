import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//import VueTailwind from 'vue-tailwind'
//import settings from './plugins/tailwind-settings'

// Importo componentes de forma global
import CropperModal from './components/CropperModal.vue'

// Importo cropper y dependencias.

import VueRx from 'vue-rx'

import {
  clipperBasic, 
  clipperUpload, 
  clipperFixed, 
  clipperPreview, 
  clipperRange
} from 'vuejs-clipper';

//https://www.npmjs.com/package/vuejs-clipper
//https://timtnleeproject.github.io/vuejs-clipper/#/examples/quick-start
//https://timtnleeproject.github.io/vuejs-clipper/#/examples/profile-photo

Vue.config.productionTip = false

//Vue.use(VueTailwind, settings)
Vue.component("v-image-cropper-modal", CropperModal);


Vue.component("clipper-basic", clipperBasic);
Vue.component("clipper-upload", clipperUpload);
Vue.component("clipper-fixed", clipperFixed);
Vue.component("clipper-preview", clipperPreview);
Vue.component("clipper-range", clipperRange);

Vue.use(VueRx);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
