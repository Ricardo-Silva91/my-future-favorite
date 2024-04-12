<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from './components/TopBar.vue'
import { onMounted } from 'vue'
import { submitBandcampBand } from './utilities/fetchers'
// import HelloWorld from './components/HelloWorld.vue'

onMounted(() => {
  // submitBandcampBand('https://moodymann.bandcamp.com/music')
})
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <TopBar />
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.content {
  margin-top: $header-height;
}
</style>
