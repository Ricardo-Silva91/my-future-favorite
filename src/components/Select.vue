<template>
  <div :class="['select', `select--${open ? 'open' : 'closed'}`]">
    <div class="select__lid" @click="toggleOpen()">{{ label }}</div>
    <div class="select__options">
      <div
        v-for="(option, index) in options"
        class="select__options__option"
        :key="option.value"
        :value="index"
        @click="handleChange(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Select',
  props: {
    options: Array<{ label: string; value: string }>,
    id: String,
    label: String
  },
  emits: ['valueChange'],
  data: () => ({
    open: false
  }),
  computed: {
    translateValue() {
      return this.open ? 40 : 1
    }
  },
  methods: {
    toggleOpen() {
      this.open = !this.open
    },
    handleChange(newVal: string) {
      this.$emit('valueChange', newVal)
      this.toggleOpen()
    }
  }
}
</script>

<style scoped lang="scss">
.select {
  color: $color-text-grey;
  text-align: center;
  display: flex;
  justify-content: center;
  max-width: 100%;

  &--open {
    & .select__lid {
      position: absolute;
      visibility: hidden;
      opacity: 0;
      transition: all 0ms ease-in-out;
    }

    & .select__options {
      visibility: visible;
      opacity: 1;
      max-width: initial;
      max-height: 200px;
      overflow-y: auto;

      scrollbar-color: $color-primary-purple transparent;
      scrollbar-width: thin;
    }
  }
}

.select__lid {
  position: relative;
  height: fit-content;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: $color-black;

  border: 10px solid;
  border-image-slice: 1;
  border-width: 1px;
  border-image-source: linear-gradient(to left, $color-primary-purple, $color-primary-purple-light);

  transition: all 500ms ease-in-out;

  &:hover {
    border-image-source: linear-gradient(
      to left,
      $color-primary-purple-light,
      $color-primary-purple
    );
  }
}

.select__options {
  visibility: hidden;
  transition: all 300ms ease-in-out;
  opacity: 0;
  max-width: 0;
  max-height: 0;
  overflow: hidden;

  &__option {
    position: relative;
    padding: 0.5rem 1rem;
    cursor: pointer;
    background-color: $color-black;
    transition: all 250ms ease-in-out;
    margin: 0.5rem;

    &:hover {
      opacity: 0.5;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 50%;
      content: ' ';
      width: 25%;
      height: 1px;
      opacity: 0.5;
      background-color: $color-text-grey;
      transform: translate(-50%, 0);
    }
  }
}
</style>
