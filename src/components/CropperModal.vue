<template>
  <div class="container mx-auto">
    <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center"
         :class="dialog ? '' : 'opacity-0'"
         v-show="dialog"
    >
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      
      <div class="modal-container bg-white w-screen h-screen mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="modal-content py-4 text-left px-6">
          
          <!-- Título -->
          <div class="flex justify-between items-center pb-3">
            <div class="text-2xl font-bold w-full">
              Título del modal
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
            Contenido
          </div>
          
          <!--Footer-->
          <div class="flex justify-center pt-2">
            <button class="cursor-pointer px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                    @click="closeModal(); console.log('test1')"
            >
              Cerrar
            </button>
            
            <button class="cursor-pointer modal-close px-2 py-3 ring-4 ring-indigo-300 bg-indigo-500 rounded text-white hover:bg-indigo-400"
              @click="closeModal(); console.log('test2')"
            >
              Guardar
            </button>
          </div>
          
        </div>
      </div>
    </div>
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