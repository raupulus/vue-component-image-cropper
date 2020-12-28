<template>
  <div class="home">
    <div class="box-image-cropper">
      <v-component-image-cropper 
        api_url="http://localhost:8000/panel/user/ajax/avatar/upload"
        name="Avatar por Defecto"
        api_id="5"
        preview_width="150" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CropperImage from '@/components/CropperImage.vue';

export default {
  name: 'Home',
  components: {
    'v-component-image-cropper': CropperImage,
  }
}
</script>


<style scoped>
</style>