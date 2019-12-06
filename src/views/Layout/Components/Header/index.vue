<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="info" className="info"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="@/assets/images/face.jpeg" alt="">
        管理员
      </div>
      <div class="pull-left header-icon">
        <svg-icon iconClass="exit" className="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "Header",
  setup(props, context) {
    /**
     * 函数
     */
    const navMenuState = () => {
      context.root.$store.commit("SET_ISCOLLAPSE");
    };
    return {
      navMenuState
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  height: 75px;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  line-height: 75px;
  @include webkit(transition, all 0.3s ease 0s);
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    width: 32px;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50%;
  }
}
</style>