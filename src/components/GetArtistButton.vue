<template>
  <div class="wrapper">
    <ButtonSvg class="frame"></ButtonSvg>
  </div>
</template>

<script>
import ButtonSvg from './svg-components/ButtonSvg.vue';

export default {
  name: 'GetArtistButton',
  components: {
    ButtonSvg
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  position: relative;
  animation: glow 3s infinite;
  overflow: visible;
  min-width: 10rem;
  height: 10rem;
  transition: transform 500ms ease-in-out;
}

.wrapper:hover {
  transform: scale(1.05);
}

.frame {
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  fill: rgba(116, 112, 112, 0.542);
  cursor: pointer;
}

@keyframes glow{
  0%{
    /* box-shadow: 5px 5px 50px rgb(64, 20, 146),-5px -5px 50px rgb(64, 20, 146); */
    filter: drop-shadow(5px 5px 50px rgb(64, 20, 146)) drop-shadow(-5px -5px 50px rgb(64, 20, 146));
  }
  
  50%{
    /* box-shadow: 5px 5px 50px rgb(140, 69, 182),-5px -5px 50px rgb(140, 69, 182); */
    filter: drop-shadow(5px 5px 50px rgb(140, 69, 182)) drop-shadow(-5px -5px 50px rgb(140, 69, 182));
  }
  100%{
    /* box-shadow: 5px 5px 50px rgb(64, 20, 146),-5px -5px 50px rgb(64, 20, 146); */
    filter: drop-shadow(5px 5px 50px rgb(64, 20, 146)) drop-shadow(-5px -5px 50px rgb(64, 20, 146));
  }
}
</style>
