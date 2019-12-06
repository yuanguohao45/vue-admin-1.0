<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import {
  reactive,
  ref,
  onMounted,
  toRefs,
  computed
} from "@vue/composition-api";

export default {
  name: "SvgIcon",
  props: ["iconClass", "className"],
  setup(props, context) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() =>
      props.className ? `svg-icon ${props.className}` : `svg-icon`
    );
    return {
      iconName,
      svgClass
    };
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>