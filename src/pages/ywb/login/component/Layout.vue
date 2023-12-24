<template>
  <div class="layout-container">
    <div class="layout_center_main">
      <div class="slogan-container">
        <img class="slogan_img" :src="siteImgMap.logo" alt="">
<!--        <div data-v-c45561b6="" class="logo-title"> 昇日于洋 得源在心 </div>-->
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
    left: 60px;
    height: 100%;
  }
}
</style>
