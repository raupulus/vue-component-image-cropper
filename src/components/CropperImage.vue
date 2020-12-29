<template>
  <div class="v-component-image-cropper">
    
    <input type="hidden" :name="input_name" :value="inputValue" />

    <div class="w-auto mx-auto center"  
         @mouseover="showModalButton = true"
         @mouseout="showModalButton = false">
      <div class="cursor-pointer"
           @click="toggleModal"
      >
        <img :src="image.src"
            :alt="image.name"
            :title="image.name"
            :data-id="image.id"
            class="mx-auto bg-black border-2 border-black shadow-md"
            :style="rounded ? 'border-radius: 50%;' : ''"
            :width="preview_width"
        />
      </div>

      <div class="v-component-image-cropper-button-open-modal -mt-12 cursor-pointer center rounded-full">
          <svg class="icon-open-modal svg-icon cursor-pointer transition transition-delay-1000 rounded rounded-full ease" 
               viewBox="0 0 16 16"
               @click="toggleModal"
              :style="showModalButton ? 'opactiy: 1;' : 'opacity: 0;'">
            <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
            <path fill-rule="evenodd" d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
          </svg>
      </div>
    </div>

    <!-- Modal con los pasos para cambiar imagen -->
    <v-image-cropper-modal 
      :dialog="modal.dialog"
      v-on:modal_cropper_update_data="onChangeModalCropperData"
      :originalImage="image.src"
      :originalLazy="image.lazy"
      :api_url="api_url"
      :api_token="api_token"
      :api_id="api_id"
      :csrf_token="csrf_token"
      :ratio="aspect_ratio"
      :width="width"
      ></v-image-cropper-modal>

  </div>
</template>

<script>

import VueRx from 'vue-rx'

import CropperModal from './CropperModal.vue'

export default {
  name: 'CropperImage',
  components: {
    'VueRx': VueRx,
    'v-image-cropper-modal': CropperModal,
  },
  props: {
    // Indica si el avatar de previsualización es redondo.
    rounded: {
      type: Boolean,
      required: false,
      default: true
    },
    
    // Ruta hacia la imagen con la que se comienza.
    image_path: {
      required: false,
      default: null
    },

    image_lazy_path: {
      required: false,
      default: null
    },

    // Nombre del campo input dónde se almacenará la imagen..
    input_name: {
      required: false,
      default: 'image-cropped'
    },

    // Api URL
    api_url: {
      required: false,
      default: null
    },

    // Token Bearer para conectar a la api
    api_token: {
      required: false,
      default: null
    },

    // Id para relacionarlo en el backend de la api (usuario, slide, post...).
    api_id: {
      required: false,
      default: 0
    },

    // Token CSRF en caso de ser necesario.
    csrf_token: {
        required: false,
        default: null
      },

    // Nombre para ser usado de alt y quizá de previsualización en el futuro
    name: {
      required: false,
      default: ''
    },

    // El ancho en píxeles para la imagen resultante.
    width: {
      required: false,
      default: 400
    },

    // Las proporciones 1, 3/4, 16:9, 21:9...
    aspect_ratio: {
      required: false,
      default: 1
    },

    // El ancho del icono para previsualizar en píxeles o porcentaje.
    preview_width: {
      required: false,
      default: 100
    },
  },
  created() {
    //
  },
  beforeMount() {
    if (this.image_path) {
      this.image.src = this.image_path;
    }

    if (this.name) {
      this.image.name = this.name;
    }

    if (this.image_lazy_path) {
      this.image.lazy = this.image_lazy_path;
    }
  },
  mounted() {
    console.log('Component mounted');
  },
  data () {
    return {
      showModalButton: false, // Muestra el botón que llevará al modal.

      inputValue: '',  // Valor del input

      modal: {
        dialog: false,  // Indica si muestra el modal abierto.
      },
      image: {
        name: 'Default Image',
        lazy: require('../assets/default_lazy.png'),
        src: require('../assets/default_800x600.png')
      },
    }
  },
  methods: {
    toggleModal: function () {
      this.modal.dialog = !this.modal.dialog;
      
      console.log('Al abrir modal:');
      console.log(this.modal);
    },

    onChangeModalCropperData: function (data) {
      this.modal = data;
      
      console.log('Al cambiar datos del modal:');
      console.log(this.modal);

      if (data.image) {
        this.image.src = data.image;
        this.inputValue = data.image;
      }

      if (data.name) {
        this.image.name = data.name;
      }
    },
  },
 /*
 computed() {
   return {

   }
 },
 */
  filters: {
    roundTo2Decimals(num) {
      return Math.round(num * 100) / 100;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/tailwind.css';


.v-component-image-cropper {
  margin: auto;
  text-align: center;
  width: 100%;
}

.v-component-image-cropper .v-application--wrap {
  min-height: 20px !important;
}

.v-component-image-cropper-button-open-modal .icon-open-modal {
  display: block;
  margin: -20px auto 0 auto;
  padding: 8px !important;
  width: 45px;
  background-color: #fff;
  border: 4px solid darkslategray;
  border-radius: 9999px;
}

.align-center {
  text-align: center;
}

.align-top {
  vertical-align: top;
}
.ml--15 {
  margin-left: -15px;
}
.avatar-icon {
  left: auto;
  bottom: 5px !important;
  height: 25px;
  width: 25px;
}

.rounded-full {
  border-radius: 9999px !important;
}
</style>