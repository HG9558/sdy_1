<template>
  <div class="layout-container">
    <div class="layout_center_main">
      <div class="slogan-container">
        <img class="slogan_img" src="../img/brand_logo.png" alt="">
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
</style>