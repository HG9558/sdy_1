<template>
  <div class="layout-container">
    <div class="layout_center_main">
      <div>
        <div class="slogan-container">
          <img class="slogan_img" :src="siteImgMap.logo" alt="">
        </div>
        <slot></slot>
      </div>
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
.new-year-c {
  width: 940px;
  background: rgba(48, 3, 3, 0.8);
  backdrop-filter: blur(2px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
}
</style>
