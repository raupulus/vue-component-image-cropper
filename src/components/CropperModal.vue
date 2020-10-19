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
              Nombre del paso 1
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="e1 > 2"
              step="2"
            >
              Nombre del paso 2
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
              Nombre del paso 3
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!--Paso 1-->
            <v-stepper-content step="1">
              <v-card class="mb-12">

                <v-row>
                  <v-col class="align-center" cols="6">
                    <v-img class="margin-auto rounded-circle"
                            :lazy-src="this.originalLazy"
                            max-width="500"
                            :src="this.originalImage"
                          ></v-img>
                    <!--
                    <b-img rounded="circle"
                            fluid
                            :src="originalImage"
                            alt="Avatar Original redondeado"></b-img>
                    -->        
                  </v-col>

                  <v-col class="align-center" cols="6">
                    <v-img class="margin-auto"
                            contain
                            fab
                            :lazy-src="this.originalLazy"
                            max-width="500"
                            :src="this.originalImage"
                          ></v-img>
                    <!--
                    <b-img rounded
                            fluid
                            :src="originalImage"
                            alt="Avatar original cuadrado"></b-img>
                    -->       
                  </v-col>
                </v-row>
              
              </v-card>

              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                Siguiente
              </v-btn>

              <v-btn text @click="closeModal">
                Cerrar
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>

              <v-btn
                color="primary"
                @click="e1 += 1"
              >
                Siguiente
              </v-btn>

              <v-btn text @click="e1 -= 1">
                Atrás
              </v-btn>

              <v-btn text @click="closeModal">
                Cerrar
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>

              <v-btn
                color="primary"
                @click="save"
              >
                Guardar
              </v-btn>

              <v-btn text @click="e1 -= 1">
                Atrás
              </v-btn>

              <v-btn text @click="closeModal">
                Cerrar
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
        default: 'https://picsum.photos/id/11/10/6'
      }
    },
    data () {
      return {
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
      }
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