<template>
  <div class="container mx-auto">
    <div class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    
    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      
      <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
        <span class="text-sm">(Esc)</span>
      </div>

      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold">Simple Modal!</p>
          <div class="modal-close cursor-pointer z-50">
            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div>

        <!--Body-->
        <p>Modal content can go here</p>
        <p>...</p>
        <p>...</p>
        <p>...</p>
        <p>...</p>

        <!--Footer-->
        <div class="flex justify-end pt-2">
          <button class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">Action</button>
          <button class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">Close</button>
        </div>
        
      </div>
    </div>
  </div>

<!--
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
                  <v-col id="my-cropper-upload-errors" 
                         cols="12" 
                         class="text-center">
                      Tienes que seleccionar una imágen válida en
                      formato png, jpg o gif.
                  </v-col>

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


              <v-row class="align-center" justify="center">
                <v-col cols="12" align-self="center">
                  <v-btn text @click="current_step -= 1">
                    Atrás
                  </v-btn>

                  <v-btn
                    color="primary"
                    @click="save"
                  >
                    Guardar
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

      </v-card>
    </v-dialog>
-->    
  </div>
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
        default: '@/assets/default_lazy.png'
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
      },

      // Indica si se subirá a una api.
      has_api: {
        type: Boolean,
        required: false,
        default: false
      },

      // Contiene la dirección de la api.
      api_url: {
        type: String,
        required: false,
        default: null
      }
    },
    data () {
      return {
        current_step: 1, // Almacena el paso del menú actual.
        showErrors: false, // Indica si muestra errores
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

      uploadImageToApi: async function() {
          console.log('uploadImage');
        /*      

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
        */
      },

      /**
       * Procesa el guardado de la imagen en el servidor.
       */
      save() {
        console.log('save()');

        const clipper = this.$refs.clipper;

        // Recorta la imagen fijando el ancho y por tanto proporción sobre este.
        const canvas = clipper.clip({wPixel: this.width});

        // La imagen que ha resultado.
        this.resultImage = canvas.toDataURL("image/jpeg", 1);
        
        // El nombre de la imagen subida desde el cliente.
        // TODO → Conseguir nombre del archivo original.
        //this.resultName = canvas.
        
        console.log(canvas);
        console.log(this.resultImage);
        console.log(this.selectImage);

        // Inicia la subida al servidor en caso de que proceda.
        if (this.has_api) {
          this.uploadImageToApi();
        }

        this.closeModal();
      },

      /**
       * Cuando se carga correctamente la imagen.
       */
      load() {
        // Lleva al segundo paso.
        this.current_step = 2;
        this.showErrors = false;
      },

      /**
       * Cuando no se carga la imagen o es otro tipo de archivo.
       */
      error() {
          this.showErrors = true;  
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

#my-cropper-upload-errors {
  color: #ff0000;
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