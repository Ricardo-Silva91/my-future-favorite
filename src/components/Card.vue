<template>
  <div
    :class="{
      card: true,
      'card--visible': visible
    }"
  >
    <a
      class="card__link"
      :href="item.url"
      :title="item.title"
      :aria-label="item.title"
      target="_blank"
    >
      <h3>{{ item.name }}</h3>
      <img :src="item.image" />
    </a>
  </div>
</template>

<script setup lang="ts">
import type { ICardItem } from '@/interfaces/data.interface'
import { onMounted, ref } from 'vue'

const visible = ref(false)

const props = defineProps<{
  item: ICardItem
  revealTimeout: number
}>()

onMounted(() => {
  setTimeout(() => {
    visible.value = true
  }, props.revealTimeout)
})
</script>

<style scoped lang="scss">
h3 {
  text-align: center;
  color: $color-text-grey;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card {
  opacity: 0;
  transition: opacity 1000ms ease-in-out;

  &--visible {
    opacity: 1;
    animation-name: float;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
}

.card__link {
  height: 100%;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 500ms ease-in-out;

  &:hover {
    opacity: 0.5;
  }
}

img {
  width: 100%;
  height: calc(100% - 4rem);
  object-fit: cover;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
