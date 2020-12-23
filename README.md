# Vue Image Cropper

## Features and Work In Progress

- [x] Set start image path (prop: image_path)
- [x] Set preview rounded (prop: rounded)
- [x] Set width of result (prop: width)
- [x] Set preview width (prop: preview_width)
- [x] Set preview input name (prop: input_name)
- [x] Set Aspect Ratio 1, 1/2, 1/4, 16/9, 21/9... (prop: aspect_ratio)
- [x] Set API url (prop: api_url)
- [ ] Set Lazy Image path
- [ ] Upload to API
- [ ] Set enable API upload


## Project setup
```
npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

## Compiles and minifies for production
```
npm run build
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Http Project

```html
<script src="https://unpkg.com/vue"></script>
<script src="./CropperImage.umd.js"></script>


<div id="app">
  <v-cropper-image></v-cropper-image>
</div>

<script>
new Vue({
  components: {
    "v-cropper-image": CropperImage
  }
}).$mount('#app')
</script>
```

## Laravel

```php
require('vue-component-image-cropper/dist/CropperImage.umd.min.js');

const app = new Vue({
    el: '#app',
    components: {
        'v-cropper-image': CropperImage
    }
});
```