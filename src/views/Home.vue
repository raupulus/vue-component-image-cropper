<template>
  <div class="home">
    <div class="box-image-cropper">
      <v-component-image-cropper preview_width="100" />
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
