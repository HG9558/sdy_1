<template>
  <div class="home-menu-container">
    <div class="content-item">
      <img
        class="show-picture"
        :src="
          useSiteImgPath(`${envState.vite_current_site}/base/${envState.cur_lang}/${envState.vite_theme}_ios.png`)
        " />
      <slot name="ios-qrCode"></slot>
    </div>
    <div class="content-item">
      <img
        class="show-picture android"
        :src="
          useSiteImgPath(`${envState.vite_current_site}/base/${envState.cur_lang}/${envState.vite_theme}_android.png`)
        " />
      <slot name="android-qrCode"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSiteImgPath } from '@/hook/usePath';
// import { useEnvState } from '@/stores';

const envState = useEnvState();
</script>

<style lang="scss" scoped>
.home-menu-container {
  @include flex();
  box-sizing: border-box;
  padding: 0 40px;
  width: 100%;
  .content-item {
    @include flex(flex-start);
    .show-picture {
      width: 218px;
    }
  }
}
</style>
