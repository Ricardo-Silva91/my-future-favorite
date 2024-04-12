<template>
  <div class="get-artist-button">
    <ButtonSvg class="get-artist-button__button"></ButtonSvg>
  </div>
</template>

<script setup lang="ts">
import ButtonSvg from './svg-components/ButtonSvg.vue'
</script>

<style scoped lang="scss">
.get-artist-button {
  position: relative;
  animation: glow 3s infinite;
  overflow: visible;
  min-width: 10rem;
  height: 10rem;
  transition: transform 500ms ease-in-out;
}

.get-artist-button:hover {
  transform: scale(1.05);
}

.get-artist-button__button {
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  fill: rgba(116, 112, 112, 0.542);
  cursor: pointer;
}

@keyframes glow {
  0% {
    filter: drop-shadow(5px 5px 50px $color-play-shadow)
      drop-shadow(-5px -5px 50px $color-play-shadow);
  }
  50% {
    filter: drop-shadow(5px 5px 50px $color-play-shadow-light)
      drop-shadow(-5px -5px 50px $color-play-shadow-light);
  }
  100% {
    filter: drop-shadow(5px 5px 50px $color-play-shadow)
      drop-shadow(-5px -5px 50px $color-play-shadow);
  }
}
</style>
