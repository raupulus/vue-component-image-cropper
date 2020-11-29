<template>
  <v-app class="v-component-image-cropper">
    
    <input type="hidden" :name="input_name" :value="inputValue"/>

    <v-container fill-height fluid>
        <v-row align="center" 
               justify="center"
               no-gutters>
            <v-col class="align-center" 
                   cols="12"
                   @mouseover="showModalButton = true"
                   @mouseout="showModalButton = false"
                   >
                <v-avatar
                color="teal"
                :rounded="!rounded"
                height="100%"
                :size="preview_width">
                    <img :src="image.src"
                         :alt="image.name" />
                        
                    <v-scale-transition>
                      <v-btn class="avatar-icon white--text"
                            color="primary"
                            fab
                            dark
                            absolute
                            bottom
                            left
                            small
                            v-show="!showModalButton"
                            @click="toggleModal">
                        <v-icon dark small>
                            mdi-image-edit
                        </v-icon>
                      </v-btn>
                    </v-scale-transition>

                    <v-scale-transition>
                      <v-btn color="primary"
                            dark
                            absolute
                            bottom
                            center
                            elevation="3"
                            small
                            v-show="showModalButton"
                            @click="toggleModal">
                          <v-icon dark small>
                              mdi-image-edit
                          </v-icon>

                            <span>
                              Editar
                            </span>
                      </v-btn>
                    </v-scale-transition>

                </v-avatar>
            </v-col>
        </v-row>
    </v-container>

    <!-- Modal con los pasos para cambiar imagen -->
    <v-image-cropper-modal 
      :dialog="this.modal.dialog"
      v-on:modal_cropper_update_data="onChangeModalCropperData"
      :originalImage="this.image.src"
      :originalLazy="this.image.lazy"
      :has_api="this.api.has_api"
      :api_url="this.api.url"
      :ratio="this.aspect_ratio"
      :width="this.width"
      ></v-image-cropper-modal>

  </v-app>
</template>

<script>
export default {
  props: {
    // Indica si el avatar de previsualización es redondo.
    rounded: {
      type: Boolean,
      required: false,
      default: false
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
        lazy: require('./assets/default_lazy.png'),
        src: require('./assets/default_800x600.png')
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
.v-component-image-cropper {
  //background-color: red;
  margin: auto;
  //min-height: 20px;
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