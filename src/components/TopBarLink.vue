<template>
  <div class="top-bar-link">
    <a :href="path" class="link">
      {{ label }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'TopBarLink',
  props: {
    label: String,
    path: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.top-bar-link {
  margin-left: 1rem;
  transition: opacity 250ms ease-in-out;
}

.link {
  color: inherit;
  text-decoration: none;
}

.top-bar-link:hover {
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
