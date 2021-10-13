<template>
  <a :href="path" class="link">
    {{ label }}
  </a>
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
.link {
  margin-left: 1rem;
}
</style>
