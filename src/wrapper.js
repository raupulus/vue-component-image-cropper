import CropperModal from './components/CropperModal.vue';
import CropperImage from './components/CropperImage.vue';
import VueRx from 'vue-rx'
import VuejsClipper from 'vuejs-clipper'
import axios from 'axios';
import VueAxios from 'vue-axios';

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('v-image-cropper-modal', CropperModal);
  Vue.component('v-component-image-cropper', CropperImage);
}

// Create module definition for Vue.use()
const plugin = {
  install,
  VueRx,
  VueAxios,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);

  GlobalVue.use(VuejsClipper, {
    components: {
      //clipperBasic: true,
      clipperUpload: true,
      clipperFixed: true,
      clipperPreview: true,
      //clipperRange: true,
    }
  })
}

// To allow use as module (npm/webpack/etc.) export component
export default {CropperImage, CropperModal};