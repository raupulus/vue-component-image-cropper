<template>
<div class="box-component">
  <div class="title color-red">
    <h1>{{ this.messages.title }}</h1>
  </div>

  <div class="image">
    <img src="./assets/vue.png" title="Vue Component" />
  </div>

  <div class="subtitle color-orange">
    <p>
      {{ this.messages.subtitle }}  
    </p>
  </div>  
</div>
</template>

<script>
export default {
  /*
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  }
  */
 data() {
    return {
      images: {
        vue: './assets/vue.png'
      },
      messages: {
        title: 'Hello World!',
        subtitle: 'This is a component!'
      },

      intervals: {
        id_1: null
      }
    }
  },
  created() {
    //
  },
 mounted() {
   console.log('Component mounted');
   
   this.intervals.id_1 = setInterval(() => {
        console.log('Interval in action!');
    }, 65000);
 },
 /*
 computed() {
   return {

   }
 },
 */
 methods: {
   //
 },
 filters: {
    roundTo2Decimals(num) {
      return Math.round(num * 100) / 100;
    }
 }
};
</script>

<style lang="scss" scoped>
.box-component {
  width: 100%;
  text-align: center;
}

.title h1 {
  font-size: 3rem;
}

.subtitle {
  font-size: 2rem;
}

.image img {
  max-width: 200px;
}

/* Colores */
.color-red {
  color: #ff0000;
}
.color-blue {
  color: #2bf7ff;
}
.color-yellow {
  color: #fcff6b;
}
.color-orange {
  color: #ffc568;
}
</style>