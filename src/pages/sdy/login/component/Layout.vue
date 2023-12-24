<template>
  <div class="layout-container">
    <div class="layout_center_main">
      <div class="slogan-container">
        <img class="slogan_img mb-4" src="../img/brand_logo.png" alt="">
        <div data-v-c45561b6="" class="logo-title"> 昇日于洋 得源在心 </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout.vue',
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
