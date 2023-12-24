<template>
  <div class="common-title-container">
    <div :class="['common_title_header', globalState.language]">
      {{ titleTxt }}
      <span class="common_title_sub_txt" v-if="isShowSubTitle && subTxt">{{ subTxt }}</span>
    </div>
    <img :src="useImgPath(`home/other/${imgSrc}.png`)" alt="" />
  </div>
</template>

<script setup lang="ts">
import { useImgPath } from '@/hook/usePath';
// import { useGlobalState } from '@/stores';
import { computed } from 'vue';

const theme = sessionStorage.getItem('VITE_THEME') || import.meta.env.VITE_THEME;
const isShowSubTitle = computed(() => theme === '004');
const globalState = useGlobalState();

defineProps<{
  titleTxt: string;
  imgSrc: string;
  subTxt: string;
}>();
</script>

<style lang="scss" scoped>
.common-title-container {
  position: relative;
  @include flex(flex-start, column);

  .common_title_header {
    font-weight: 500;
    font-size: 32px;
    color: var(--home_32);
    text-shadow: var(--home_33);
  }
  img {
    width: 100%;
  }
}
</style>
