<template>
  <v-app justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="closeModal"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Subir imagen</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="closeModal"
            >
              Cerrar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        

        <v-stepper v-model="current_step">
          <v-stepper-header>
            <v-stepper-step
              :complete="current_step > 1"
              step="1"
            >
              Previsualización de imagen actual
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="current_step > 2"
              step="2"
            >
              Seleccionar imagen
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>

            <!--Paso 1-->
            <v-stepper-content step="1">
              <v-card class="mb-12">

                <v-row>
                  <v-col class="align-center" cols="6">  
                    <v-img class="margin-auto"
                            contain
                            fab
                            :lazy-src="this.originalLazy"
                            max-width="500"
                            :src="this.originalImage"
                          ></v-img>
                  </v-col>

                  <v-col class="align-center" cols="6">
                    <v-img class="margin-auto rounded-circle"
                            :lazy-src="this.originalLazy"
                            max-width="500"
                            :src="this.originalImage"
                          ></v-img>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="align-center" cols="12">
                    <v-btn>
                        <clipper-upload v-model="selectImage">
                            Seleccionar nueva imagen
                        </clipper-upload>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>

            </v-stepper-content>

            <!-- Paso 2 -->
            <v-stepper-content step="2">
               <v-card class="mb-12">

                <v-row justify="center">
                  <v-col xs="8" sm="10" md="3" align-self="center">
                    <clipper-fixed class="my-clipper"
                                    ref="clipper"
                                    :src="selectImage"
                                    @load="load"
                                    @error="error"
                                    :round="round"
                                    :ratio="ratio"
                                    preview="my-preview">
                        <div class="placeholder" slot="placeholder">
                            Selecciona una Imagen
                        </div>
                    </clipper-fixed>
                  </v-col>

                  <v-col xs="8" sm="10" md="3" align-self="center">
                    <clipper-preview name="my-preview"
                                     class="my-clipper my-clipper-rounded">
                        <div class="placeholder" slot="placeholder">
                            Previsualización 1
                        </div>
                    </clipper-preview>
                  </v-col>

                  <v-col xs="8" sm="10" md="3" align-self="center">
                    <clipper-preview name="my-preview"
                                     class="my-clipper">
                        <div class="placeholder" slot="placeholder">
                            Previsualización 2
                        </div>
                    </clipper-preview>
                  </v-col>
                </v-row>
              </v-card>

              <v-btn text @click="current_step -= 1">
                Atrás
              </v-btn>

              <v-btn
                color="primary"
                @click="save"
              >
                Guardar
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  export default {
    props: {
      // Indica si el modal está abierto.
      dialog: {
        type: Boolean,
        required: false,
        default: false
      },

      // Imagen con la que se comienza.
      originalImage: {
        required: true
      },

      // Nombre de la imagen original.
      originalName: {
        required: false,
        default: ''
      },

      // Miniatura mientras carga la imagen.
      originalLazy: {
        required: false,
        default: '../assets/default_lazy.png'
      },

      // Indica el ancho, la altura se calcula según relación de aspecto.
      width: {
        type: Number,
        required: false,
        default: 400
      }, 

      // Indica la relación de aspecto 1, 4/3, 16:9, 21:9....
      ratio: {
        type: Number,
        required: false,
        default: 1
      },

      // Indica si el selector de recorte será redondo.
      round: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data () {
      return {
        current_step: 1, // Almacena el paso del menú actual.
        selectImage: '',  // Imagen seleccionada.
        resultImage: '',  // Almacena la imagen como resultado.
        resultName: '',  // Almacena el nombre original de la imagen subida.
      }
    },
    methods: {
      /**
       * Lanza el evento al padre con los datos del modal actualizado.
       */
      eventUpdateData() {
         let data = {
           dialog: !this.dialog,
           image: this.resultImage,
           name: this.resultName,
         };

         this.$emit('modal_cropper_update_data', data);
      },
      /**
       * Cierra el modal.
       */
      closeModal() {
        this.current_step = 1;
        this.eventUpdateData();
      },

      /*      
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
       * Procesa el guardado de la imagen en el servidor.
       */
      save() {
        console.log('save()');

        const clipper = this.$refs.clipper;

        //clipper.options.wPixel = this.width;

        // Recorta la imagen fijando el ancho y por tanto proporción sobre este.
        const canvas = clipper.clip({wPixel: this.width});

        // La imagen que ha resultado.
        this.resultImage = canvas.toDataURL("image/jpeg", 1);
        
        // El nombre de la imagen subida desde el cliente.
        //this.resultName = canvas.
        
        
        console.log(canvas);
        console.log(this.resultImage);
        console.log(this.selectImage);
        
        //this.uploadImage();




        this.closeModal();
      },

      /**
       * Cuando se carga correctamente la imagen.
       */
      load() {
        // Lleva al segundo paso.
        this.current_step = 2;

        /*  
        let step1 = document.getElementsByClassName('my-clipper-step1')[0];
        let step2 = document.getElementsByClassName('my-clipper-step2')[0];

        let boxError = document.getElementById('my-cropper-upload-errors');

        if (step1 && step2) {
            console.log(step1);
            step1.setAttribute('hidden', 'true');
            step2.removeAttribute('hidden');

            boxError.setAttribute('class', 'hidden');

        }
        */
      },

      /**
       * Cuando no se carga la imagen o es otro tipo de archivo.
       */
      error() {
          //let step1 = document.getElementsByClassName('my-clipper-step1')[0];
          //let step2 = document.getElementsByClassName('my-clipper-step2')[0];

          //let boxError = document.getElementById('my-cropper-upload-errors');

          //boxError.removeAttribute('hidden');
      },
   },
  }
</script>

<style lang="scss" scoped>
.align-center {
    text-align: center;
}

.align-top {
    vertical-align: top;
}

.v-dialog__container {
  display: block;
}

.align-center {
    text-align: center;
}

.margin-auto {
  margin: auto;
}
</style>

<style lang="scss">
.my-clipper-rounded,
.my-clipper-rounded > div,
.my-clipper-rounded > .wrap,
.my-clipper-rounded .placeholder {
  border-radius: 50%;
}
</style>