<template>
  <div class="empty-container">
    <img :width="imgWidth" :src="useImgPath('base/common_empty.png')" alt="" />
    <span class="empty_txt">{{ txt }}</span>
  </div>
</template>

<script setup lang="ts">
import { useImgPath } from '@/hook/usePath';

withDefaults(
  defineProps<{
    txt?: string;
    imgWidth?: number;
  }>(),
  {
    imgWidth: 200,
  }
);
</script>

<style lang="scss">
.empty-container {
  width: 100%;
  @include flex(center, column);
  .empty_txt {
    font-weight: 400;
    font-size: 14px;
    color: var(--m_12);
    margin-top: 11px;
  }
}
</style>
