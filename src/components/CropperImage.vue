<template>
  <div class="v-component-image-cropper">
    
    <input type="hidden" :name="input_name" :value="inputValue" />

    <div class="w-auto mx-auto">
      <div @mouseover="showModalButton = true"
           @mouseout="showModalButton = false"
           @click="toggleModal"
           class="cursor-pointer"
      >
        <img :src="image.src"
            :alt="image.name" 
            class="mx-auto bg-black"
            :class="rounded ? 'rounded-full' : ''"
            :width="preview_width"
        />
      </div>

      <div class="block -mt-11 cursor-pointer">
        <span class="px-2 py-2 cursor-pointer transition transition-delay-1000 border border-yellow-800 bg-yellow-400 text-white rounded ease hover:bg-blue-300"
              @click="toggleModal"
              v-show="showModalButton"
        >
          Editar
        </span>
      </div>
    </div>

    <!-- Modal con los pasos para cambiar imagen -->
    <v-image-cropper-modal 
      :dialog="modal.dialog"
      v-on:modal_cropper_update_data="onChangeModalCropperData"
      :originalImage="image.src"
      :originalLazy="image.lazy"
      :has_api="api.has_api"
      :api_url="api.url"
      :ratio="aspect_ratio"
      :width="width"
      ></v-image-cropper-modal>

  </div>
</template>

<script>

import CropperModal from './CropperModal.vue'

export default {
  name: 'CropperImage',
  components: {
    'v-image-cropper-modal': CropperModal
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
  mounted() {
    console.log('Component mounted');

    if (this.image_path) {
      this.image.src = this.image_path;
    }

    if (this.image_lazy_path) {
      this.image.lazy = this.image_lazy_path;
    }

    if (this.api_url) {
      this.api.has_upload = true;
      this.api.url = this.api_url;
    }
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
      api: {
        has_upload: false,
        url: null,
      }
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
}
.v-component-image-cropper .v-application--wrap {
  min-height: 20px !important;
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
</style>