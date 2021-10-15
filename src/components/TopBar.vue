<template>
  <div class="top-bar">
    <TopBarLink label="How it works" path="#" />
    <TopBarLink label="Submit new artist" path="#" />
    <!-- <a href="#" class="top-bar__link">How it works</a>
    <a href="#" class="top-bar__link">Submit new artist</a> -->
  </div>
</template>

<script>
import TopBarLink from './TopBarLink.vue'
export default {
  components: { TopBarLink },
  name: 'TopBar',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-bar {
  display: flex;
  justify-content: flex-end;
  color: white;
  padding: 2rem 1rem;
}
</style>
