<template>
  <div
    :class="{
      'card': true,
      'card--visible': visible
    }"
  > 
    <a class="card__link" :href="item.uri" :title="title" :aria-label="title">
      <h3>{{ item.name }}</h3>
      <img :src="item.images[0].url"/>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data: () => ({
    visible: false,
  }),
  props: {
    item: Object,
    title: String,
    revealTimeout: {
      type: Number,
      default: 100
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.visible = true;

    }, this.revealTimeout);
  }
}
</script>

<style scoped lang="scss">
h3 {
  text-align: center;
  color:  $color-text-grey;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card {
  opacity: 0;
  transition: opacity 1000ms ease-in-out;

  &--visible {
    opacity: 1;
    animation-name: float;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
}

.card__link {
  height: 100%;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 500ms ease-in-out;

  &:hover {
    opacity: 0.5;
  }
}

img {
  max-width: 100%;
  max-height: calc(100% - 4rem);
  object-fit: cover;
}

@keyframes float {
	0% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-10px);
	}
	100% {
		transform: translateY(0px);
	}
}
</style>
