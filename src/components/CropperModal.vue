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
              @click="save"
            >
              Guardar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        

        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step
              :complete="e1 > 1"
              step="1"
            >
              Name of step 1
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="e1 > 2"
              step="2"
            >
              Name of step 2
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
              Name of step 3
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>

              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
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
                @click="e1 = 3"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
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
                @click="e1 = 1"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
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
      /*
      this.notifications,
      this.sound,
      this.widgets
      */
    },
    data () {
      return {
        //dialogStatus: this.dialog,
        notifications: false,
        sound: true,
        widgets: false,
        e1: 1, // Paso del menú actual
      }
    },
    methods: {
      eventUpdateData() {
         let data = {dialog: !this.dialog}
         this.$emit('modal_cropper_update_data', data);
      },
      closeModal() {
        this.eventUpdateData();
      },
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
</style>