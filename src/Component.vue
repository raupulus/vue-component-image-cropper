<template>
  <span>
    <v-container fill-height fluid>
        <v-row align="center" 
               justify="center"
               no-gutters>
            <v-col class="align-center" cols="12">
                <v-avatar
                color="teal"
                rounded
                size="100">
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                    />
                </v-avatar>

                <span class="align-top">
                    <v-icon color="green darken-2">
                      mdi-image-edit
                    </v-icon>
                    Edit
                </span>

            </v-col>
        </v-row>    

        <!--
            Añadir bloque de paginación paso a paso
            https://vuetifyjs.com/en/components/steppers/
        -->
    </v-container>

    <!-- Modal con los pasos para cambiar imagen -->
    <v-image-cropper-modal></v-image-cropper-modal>
  </span>  
</template>

<script>
//https://www.npmjs.com/package/vuejs-clipper
//https://timtnleeproject.github.io/vuejs-clipper/#/examples/quick-start
//https://timtnleeproject.github.io/vuejs-clipper/#/examples/profile-photo

//import Vue from 'vue'
import 'vuejs-clipper';
import axios from 'axios';

//import VueAxios from "vue-axios";

export default {
  props: [
    'user_id',
    'username',
    'image'
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
    }
  },
  methods: {
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
      /**
       * Cuando se carga correctamente la imagen.
       */
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
      /**
       * Cuando no se carga la imagen o es otro tipo de archivo.
       */
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
.align-center {
    text-align: center;
}

.align-top {
    vertical-align: top;
}
</style>