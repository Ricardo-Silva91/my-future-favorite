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

<style lang="scss">
body {
  background-color: $background-color;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3 {
  text-align: center;
  color: $color-text-grey;
}
</style>
