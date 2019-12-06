<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#main-wrap {
  height: 100vh;
  .main-content {
    width: 100%;
    height: 100%;
    padding: $layoutHeader + 30 30px 0 $navMenu + 30;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .content {
      width: 100%;
      height: 100%;
      padding: 30px 30px 0 30px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #fff;
    }
  }
}
</style>