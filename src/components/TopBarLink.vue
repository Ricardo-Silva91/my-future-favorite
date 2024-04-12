<template>
  <div class="top-bar-link">
    <a v-if="!routerLink" :href="path" class="top-bar-link__link" target="_blank">
      {{ label }}
    </a>
    <RouterLink v-else :to="routerLink || ''" class="top-bar-link__link">
      {{ label }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps<{
  label: string
  path?: string
  routerLink?: string
}>()
</script>

<style scoped lang="scss">
.top-bar-link {
  margin-left: 2rem;
  transition: transform 500ms ease-in-out;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

.top-bar-link__link {
  color: rgba(201, 201, 201, 0.933);
  text-decoration: none;
}

@keyframes link-hover {
  0% {
    transform: scale(100%);
  }
  50% {
    transform: scale(110%);
  }
  100% {
    transform: scale(100%);
  }
}
</style>
