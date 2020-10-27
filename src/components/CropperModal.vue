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
        

        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step
              :complete="e1 > 1"
              step="1"
            >
              Previsualización de imagen actual
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="e1 > 2"
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
                        <clipper-upload v-model="imgURL">
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

                <v-row>
                  <v-col class="align-center" cols="12">
                    <clipper-fixed class="my-clipper"
                                    ref="clipper"
                                    :src="imgURL"
                                    @load="load"
                                    @error="error"
                                    preview="my-preview">
                        <div class="placeholder" slot="placeholder">
                            No hay imagen seleccionada
                        </div>
                    </clipper-fixed>
                  </v-col>

                  <v-col class="align-center" cols="12">
                    <clipper-preview name="my-preview"
                                     class="my-clipper my-clipper-rounded">
                        <div class="placeholder" slot="placeholder">
                            Previsualización 1
                        </div>
                    </clipper-preview>
                  </v-col>

                  <v-col class="align-center" cols="12">
                    <clipper-preview name="my-preview"
                                     class="my-clipper">
                        <div class="placeholder" slot="placeholder">
                            Previsualización 2
                        </div>
                    </clipper-preview>
                  </v-col>
                </v-row>
              </v-card>

              <v-btn text @click="e1 -= 1">
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
      dialog: {
        type: Boolean,
        required: false,
        default: false
      },
      originalImage: {
        required: true
      },
      originalName: {
        required: false,
        default: ''
      },
      originalLazy: {
        required: false,
        default: '../assets/default_lazy.png'
      }
    },
    data () {
      return {
        testImage: '../assets/default_800x600.png',
        show: false,
        msgStep1: 'Así se ve tu imagen actual, puedes subir una nueva.',
        msgStep2:
            'Mueve la imagen para centrarla, puedes hacer scroll ' +
            'para aumentar o disminuir su tamaño.',
        imgURL: '',
        resultURL: '',
        rangeMin: 0,
        rangeMax: 10,


        //ATRIBUTOS TRAS REFACTORIZAR

        e1: 1, // Almacena el paso del menú actual
      }
    },
    methods: {
      /**
       * Lanza el evento al padre con los datos del modal actualizado.
       */
      eventUpdateData() {
         let data = {dialog: !this.dialog}
         this.$emit('modal_cropper_update_data', data);
      },
      /**
       * Cierra el modal.
       */
      closeModal() {
        this.eventUpdateData();
      },
      /**
       * Procesa el guardado de la imagen en el servidor.
       */
      save() {
        // TODO → Procesar guardado
        this.closeModal();
      },

      /**
       * Cuando se carga correctamente la imagen.
       */
      load() {
        // Lleva al segundo paso.
        this.e1 = 2;

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