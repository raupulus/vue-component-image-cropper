import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//import VueTailwind from 'vue-tailwind'
//import settings from './plugins/tailwind-settings'

// Importo cropper y dependencias.

import VueRx from 'vue-rx'

import {
  clipperBasic, 
  clipperUpload, 
  clipperFixed, 
  clipperPreview, 
  clipperRange
} from 'vuejs-clipper';

Vue.config.productionTip = false

//Vue.use(VueTailwind, settings)

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
