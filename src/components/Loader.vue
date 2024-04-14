<script setup lang="ts"></script>

<template>
  <div class="loader">
    <span class="loader__ripple"></span>
    <span class="loader__ripple"></span>
  </div>
</template>

<style scoped lang="scss">
$ripple-size: 4rem;

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  width: $ripple-size;
  height: $ripple-size;

  &__ripple {
    position: absolute;
    border: 6px solid $color-primary-purple;
    border-radius: 50%;
    animation: ripple-animation 1.8s ease-out infinite;

    &:nth-child(2) {
      animation-delay: -0.6s;
    }
  }
}

@keyframes ripple-animation {
  from {
    opacity: 1;
    width: 0;
    height: 0;
  }
  to {
    opacity: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
