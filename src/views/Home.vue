<template>
  <div class="home">
    <v-component-image-cropper />
  </div>
</template>

<script>
// @ is an alias to /src
import CropperImage from '@/components/CropperImage.vue';

export default {
  name: 'Home',
  components: {
    'v-component-image-cropper': CropperImage
  }
}
</script>
