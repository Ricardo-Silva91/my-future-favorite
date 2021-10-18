<template>
  <div class="top-bar">
    <div class="top-bar__left">
      <a href="/">
        <button-svg class="frame"></button-svg>
      </a>
    </div>
    <div class="top-bar__right">
      <TopBarLink label="How it works" path="#" />
      <TopBarLink label="Submit new artist" path="#" />
    </div>
  </div>
</template>

<script>
import ButtonSvg from './svg-components/ButtonSvg.vue'
import TopBarLink from './TopBarLink.vue'
export default {
  components: { TopBarLink, ButtonSvg },
  name: 'TopBar',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 2rem;
}

.top-bar__left {
  position: relative;
  width: 3rem;
  height: 3rem;
}


.frame {
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  fill: rgba(116, 112, 112, 0.542);
  cursor: pointer;
}

.top-bar__right {
  display: flex;
  justify-content: flex-end;
}
</style>
