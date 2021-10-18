<template>
  <div class="top-bar">
    <div class="top-bar__left">
      <a href="/">
        <button-svg class="top-nar__logo"></button-svg>
      </a>
    </div>
    <div class="top-bar__right">
      <TopBarLink label="How it works" path="https://github.com/Ricardo-Silva91/my-future-favorite/blob/main/README.md" />
      <TopBarLink label="Submit new artist" path="https://github.com/Ricardo-Silva91/my-future-favorite/blob/main/docs/how-to-submit.md" />
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


.top-nar__logo {
  width: 100%;
  height: 100%;
  fill: rgba(116, 112, 112, 0.542);
  cursor: pointer;
}

.top-bar__right {
  display: flex;
  justify-content: flex-end;
}
</style>
