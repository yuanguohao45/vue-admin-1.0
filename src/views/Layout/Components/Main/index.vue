<template>
  <div id="main-wrap">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#main-wrap {
  position: fixed;
  top: 75px;
  left: $navMenu;
  right: 0;
  bottom: 0;
  border: 30px solid #ccc;
  border-bottom: none;
  border-right: none;
  -webkit-box-sizing: border;
}
</style>