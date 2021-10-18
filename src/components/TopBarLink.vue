<template>
  <div class="top-bar-link">
    <a :href="path" class="link" target="_blank">
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
  margin-left: 2rem;
  transition: transform 500ms ease-in-out;
  text-transform: uppercase;
  font-weight: bold;
}

.link {
  color: rgba(201, 201, 201, 0.933);
  text-decoration: none;
}

.top-bar-link:hover {
  opacity: 0.5;
  transform: scale(1.05);
}

@keyframes link-hover {
  0% { transform: scale(100%); }
  50% { transform: scale(110%); }
  100% { transform: scale(100%); }
}
</style>
