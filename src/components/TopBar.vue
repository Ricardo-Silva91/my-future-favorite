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
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: white;
}

a {
  color: inherit;
  text-decoration: none;
  transition: opacity 250ms ease-in-out;
}

a:hover {
  opacity: 0.5;
  animation-name: link-hover;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
}

@keyframes link-hover {
  0% { transform: scale(100%); }
  50% { transform: scale(110%); }
  100% { transform: scale(100%); }
}
</style>
