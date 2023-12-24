<template>
  <div class="layout-container">
    <div class="layout_center_main">
      <div class="slogan-container">
        <img class="slogan_img mb-4" :src="siteImgMap.logo" alt="">
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import siteImgMap from '@/configs/siteImgMap'

export default {
  name: 'Layout.vue',
  data() {
    return {
      siteImgMap,
    }
  },
}
</script>

<style scoped lang="scss">
@import "../css/Layout.scss";

.layout-container /deep/ {
  .mobileArea-select .el-popover__reference {
    position: absolute;
    left: 40px;
    height: 100%;
  }
}
</style>
