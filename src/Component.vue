<template>
  <v-app>
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
                rounded
                size="100">
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                    />
                        
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

        <!--
            Añadir bloque de paginación paso a paso
            https://vuetifyjs.com/en/components/steppers/
        -->
    </v-container>

    <!-- Modal con los pasos para cambiar imagen -->
    <v-image-cropper-modal 
      :dialog="this.modal.dialog"
      v-on:modal_cropper_update_data="onChangeModalCropperData"
      :originalImage="this.image.src"
      :originalLazy="this.image.lazy"
      ></v-image-cropper-modal>

  </v-app>
</template>

<script>
//https://www.npmjs.com/package/vuejs-clipper
//https://timtnleeproject.github.io/vuejs-clipper/#/examples/quick-start
//https://timtnleeproject.github.io/vuejs-clipper/#/examples/profile-photo

//import Vue from 'vue'
import 'vuejs-clipper';
//import axios from 'axios';

//import VueAxios from "vue-axios";

export default {
  props: [
    'user_id',
    'username',
    'image_path'
  ],
  created() {
    //
  },
  mounted() {
    console.log('Component mounted');
  },
  data () {
    return {
      show: false,
      msgStep1: 'Así se ve tu imagen actual, puedes subir una nueva.',
      msgStep2:
          'Mueve la imagen para centrarla, puedes hacer scroll ' +
          'para aumentar o disminuir su tamaño.',
      imgURL: './assets/',
      resultURL: '',
      imgOriginal: this.image,
      originalName: '',
      rangeMin: 0,
      rangeMax: 10,

      // Atributos nuevos desde refactorización del componente.
      showModalButton: false, // Muestra el botón que llevará al modal.
      modal: {
        dialog: true,  // Indica si muestra el modal abierto.
      },
      image: {
        name: '',
        lazy: 'https://picsum.photos/id/11/10/6',
        src: 'https://picsum.photos/id/11/500/300'
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
      },
      /*
      getResult: function () {
          console.log('getResult');
          const canvas = this.$refs.clipper.clip();  //call component's clip method
          this.resultURL = canvas.toDataURL("image/jpeg", 1);  //canvas->image
          this.uploadImage();
      },
      uploadImage: async function() {
          console.log('uploadImage');
          axios.post(
              '/panel/user/ajax/avatar/upload',
              {
                  image: this.resultURL,
                  user_id: this.user_id
              }
          ).then(response => {
              if (!response.data.error) {
                  console.log(response);
                  this.imgOriginal = response.data.data.new_image;
              }
          });

          // Cierro el modal
          this.$bvModal.hide('v-modal-avatar-image-crop');
      },
      */

      /**
       * Cuando se carga correctamente la imagen.
       */
      /*
      load: function() {
          let step1 = document.getElementsByClassName('my-clipper-step1')[0];
          let step2 = document.getElementsByClassName('my-clipper-step2')[0];

          let boxError = document.getElementById('my-cropper-upload-errors');

          if (step1 && step2) {
              console.log(step1);
              step1.setAttribute('hidden', 'true');
              step2.removeAttribute('hidden');

              boxError.setAttribute('class', 'hidden');

          }
      },
      */

      /**
       * Cuando no se carga la imagen o es otro tipo de archivo.
       */
      /*
      error: function() {
          //let step1 = document.getElementsByClassName('my-clipper-step1')[0];
          //let step2 = document.getElementsByClassName('my-clipper-step2')[0];

          let boxError = document.getElementById('my-cropper-upload-errors');

          boxError.removeAttribute('hidden');
      },
      back: function() {
          let step1 = document.getElementsByClassName('my-clipper-step1')[0];
          let step2 = document.getElementsByClassName('my-clipper-step2')[0];

          step2.setAttribute('hidden', 'true');
          step1.removeAttribute('hidden');
      }
      */
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
v-app {
  background-color: red;
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