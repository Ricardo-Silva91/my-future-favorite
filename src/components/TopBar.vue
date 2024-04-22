<template>
  <header class="top-bar">
    <div class="top-bar__left">
      <a href="/">
        <button-svg class="top-nar__logo"></button-svg>
      </a>
    </div>
    <div class="top-bar__right">
      <TopBarLink label="How it works" routerLink="/about" />
      <TopBarLink label="Submit new artist" routerLink="/submit" />
    </div>
  </header>
</template>

<script setup lang="ts">
import ButtonSvg from './svg-components/ButtonSvg.vue'
import TopBarLink from './TopBarLink.vue'
</script>

<style scoped lang="scss">
.top-bar {
  position: absolute;
  width: calc(100% - 2rem);
  top: 0;
  left: 0;
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
