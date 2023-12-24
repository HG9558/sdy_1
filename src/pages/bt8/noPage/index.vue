<template>
  <div class="no-page-container">
    <div class="notice-container">
      <div class="level-one">哎呀亲...您访问的页面出错了！</div>
      <div class="level-two">您输入的网址有误或者链接已经过期。</div>
      <router-link tag="div" to="/" class="return-home">返回</router-link>
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
  background-image: url("./img/no_page.png");
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .notice-container {
    position: absolute;
    top: 61%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    @include flex(center, column);
    .level-one {
      color: #333;
      font-size: 50px;
    }
    .level-two {
      color: #564b64;
      font-size: 30px;
      margin: 25px 0 62px;
    }
    .return-home {
      background: linear-gradient(0deg, rgba(77, 97, 141, 0.2), rgba(77, 97, 141, 0.2)), #9BABD8;
      width: 209px;
      height: 69px;
      @include flex(center);
      font-size: 34px;
      border-radius: 15px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>