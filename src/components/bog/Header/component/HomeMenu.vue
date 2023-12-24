<template>
  <div class="home-menu-container">
    <div class="content-item">
      <img class="show-picture" src="../img/menu/special_ios.png" alt="">
      <slot name="ios-qrCode"></slot>
    </div>
    <div class="content-item">
      <img class="show-picture" src="../img/menu/special_android.png" alt="">
      <slot name="android-qrCode"></slot>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "HomeMenu"
}
</script>

<style scoped>
</style>

<script>
export default {
  name: "DropMenuHome",
  props: {
    isLogin: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/HomeMenu.scss";
</style>
