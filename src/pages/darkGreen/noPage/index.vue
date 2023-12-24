<template>
  <div class="no-page-container">
		<img class="error-img" src="./img/no_page.png" alt="">
    <div class="notice-container">
      <div class="level-one">{{$t('哎呀亲...您访问的页面出错了！')}}</div>
      <div class="level-two">{{$t('您输入的网址有误或者链接已经过期。')}}</div>
      <router-link tag="div" to="/" class="return-home">{{$t('返回')}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "noPge"
}
</script>

<style scoped lang="scss">
.no-page-container {
	@include common-bg;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
	.error-img {
		display: block;
		margin: 0 auto;
		width: 968px;
		height: 600px;
	}
  .notice-container {
    position: absolute;
    top: 61%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    @include flex(center, column);
    .level-one {
			color: #FFFFFF;
      font-size: 50px;
    }
    .level-two {
			color: #C8D2D2;
      font-size: 30px;
      margin: 25px 0 62px;
    }
    .return-home {
			background: #27553F;
      width: 163px;
      height: 54px;
      @include flex(center);
			font-size: 24px;
			border-radius: 15px;
			color: #FFFFFF;
      cursor: pointer;
    }
  }
}
</style>
