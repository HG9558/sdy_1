<template>
  <div :class="['no-page-container', site]">
    <div class="notice-container">
      <div class="level-one">{{ $t_c('哎呀亲...您访问的页面出错了！') }}</div>
      <div :class="['level-two']">{{ $t_c('您输入的网址有误或者链接已经过期。') }}</div>
      <router-link to="/" class="return-home">{{ $t_c('返回') }}</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useImgPath, useSite } from '@/hook/usePath';

const bg = `url(${useImgPath('base/404.png')})`;
const site = useSite();
</script>

<style scoped lang="scss">
.no-page-container {
  background-image: v-bind(bg);
  background-size: 848px 504px;
  background-repeat: no-repeat;
  background-position: center 10%;
  height: 1080px;
  width: 100%;
  box-sizing: border-box;

  .notice-container {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    @include flex(center, column);

    .level-one {
      color: var(--m_13);
      font-size: 50px;
      letter-spacing: 0.045em;
    }

    .level-two {
      color: var(--m_5);
      font-size: 30px;
      margin: 15px 0 30px;
    }

    .return-home {
      background: var(--m_6);
      width: 209px;
      height: 69px;
      @include flex(center);
      font-size: 34px;
      border-radius: 15px;
      color: var(--m_7);
      cursor: pointer;
    }
  }
  //- 二号皮肤差异
  &.template_2_002 {
    .level-two {
      color: var(--m_12) !important;
    }
  }
}
</style>
