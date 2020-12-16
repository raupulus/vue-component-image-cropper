<template>
    <div class="v-component-image-cropper-modal modal fixed absolute inset-x-0 shadow-xl w-full h-full top-0 left-0 flex items-center justify-center transition duration-700"
         :class="dialog ? '' : 'opacity-0'"
         v-show="dialog"
    >
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      
      <div class="modal-container bg-white w-screen h-screen mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="modal-content py-4 text-left px-6">
          
          <!-- Título -->
          <div class="flex justify-between items-center pb-3">
            <div class="text-2xl font-bold w-full text-center">
              Subir nueva imagen
            </div>

            <div class="modal-close cursor-pointer z-50 bg-indigo-400 hover:bg-indigo-300 p-2 rounded" 
                 @click="closeModal();">
              <svg class="fill-current text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="22" 
                  height="22" 
                  viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          <!--Body-->
          <div>
            <!-- Step 1 -->
            <div class="step1" v-show="current_step == 1">
              <div class="w-full mx-auto flex">
                  <div class="flex-1 p-2">  
                    <img class="mx-auto bg-black"
                         :src="originalImage"
                    />
                  </div>

                  <div class="flex-1 p-2">
                    <img class="mx-auto rounded-full bg-black"
                         :src="originalImage"
                    />
                  </div>
              </div>

              <div class="w-full mx-auto">
                  <div class="my-cropper-upload-errors text-center">
                      Tienes que seleccionar una imágen válida en
                      formato png, jpg o gif.
                  </div>

                  <div class="flex justify-center pt-2">
                    <button class="cursor-pointer modal-close px-2 py-3 ring-4 ring-indigo-300 bg-indigo-500 rounded text-white hover:bg-indigo-400">
                        <clipper-upload v-model="selectImage">
                            Seleccionar nueva imagen
                        </clipper-upload>
                    </button>
                  </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="step2" v-show="current_step == 2">
              <div class="w-full mx-auto flex flex-col md:flex-row items-center justify-items-center">
                  <div class="flex-1 p-2">  
                    <clipper-fixed class="my-clipper mx-auto"
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
                  </div>

                  <div class="flex-1 p-2">
                    <clipper-preview name="my-preview"
                                     class="my-clipper my-clipper-rounded mx-auto">
                        <div class="placeholder" slot="placeholder">
                            Previsualización 1
                        </div>
                    </clipper-preview>
                  </div>

                  <div class="flex-1 p-2">
                    <clipper-preview name="my-preview"
                                     class="my-clipper mx-auto">
                        <div class="placeholder" slot="placeholder">
                            Previsualización 2
                        </div>
                    </clipper-preview>
                  </div>
              </div>

              <!-- Buttons -->
              <div class="flex justify-center pt-2">
                <button class="cursor-pointer px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                        @click="current_step -= 1"
                >
                  Atrás
                </button>
                
                <button class="cursor-pointer modal-close px-2 py-3 ring-4 ring-indigo-300 bg-indigo-500 rounded text-white hover:bg-indigo-400"
                  @click="save"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
          
          <!--Footer-->
          <div class="flex justify-center pt-2">
            
          </div>
          
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'CropperImageModal',
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

      uploadImageToApi: function() {
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
  .v-component-image-cropper-modal {
    position: fixed !important;
    top: 0;
    left: 0;
  }

  .my-cropper-upload-errors {
    color: #ff0000;
  }

  .my-clipper {
    max-width: 300px;
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