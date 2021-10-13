<template>
  <TopBar/>
  <MainSection/>
</template>

<script>
import MainSection from './components/MainSection.vue'
import TopBar from './components/TopBar.vue'

export default {
  name: 'App',
  components: {
    TopBar,
    MainSection
  }
}
</script>

<style>
body {
  background-color: #151718;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
