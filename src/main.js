import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//import VueTailwind from 'vue-tailwind'
//import settings from './plugins/tailwind-settings'

// Importo componentes de forma global

import VueRx from 'vue-rx'
import VuejsClipper from 'vuejs-clipper'
/*
import {
  clipperBasic, 
  clipperUpload, 
  clipperFixed, 
  clipperPreview, 
  clipperRange
} from 'vuejs-clipper';
*/

//https://www.npmjs.com/package/vuejs-clipper
//https://timtnleeproject.github.io/vuejs-clipper/#/examples/quick-start
//https://timtnleeproject.github.io/vuejs-clipper/#/examples/profile-photo

Vue.config.productionTip = false

//Vue.use(VueTailwind, settings)

/*

Vue.component("clipper-basic", clipperBasic);
Vue.component("clipper-upload", clipperUpload);
Vue.component("clipper-fixed", clipperFixed);
Vue.component("clipper-preview", clipperPreview);
Vue.component("clipper-range", clipperRange);
*/

Vue.use(VueRx);

Vue.use(VuejsClipper, {
  components: {
    //clipperBasic: true,
    clipperUpload: true,
    clipperFixed: true,
    clipperPreview: true,
    //clipperRange: true,
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
