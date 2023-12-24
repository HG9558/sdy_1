<template>
  <div class="home-menu-container">
    <div class="content-item">
      <img class="show-picture" :src="siteImgMap.headerMenuIos" alt="">
      <slot name="ios-qrCode"></slot>
    </div>
    <div class="content-item">
      <img class="show-picture" :src="siteImgMap.headerMenuAndroid" alt="">
      <slot name="android-qrCode"></slot>
    </div>

  </div>
</template>

<script>
import siteImgMap from '@/configs/siteImgMap'
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
			siteImgMap,
		}
  }
};
</script>

<style lang="scss" scoped>
@import "../css/HomeMenu.scss";
</style>
