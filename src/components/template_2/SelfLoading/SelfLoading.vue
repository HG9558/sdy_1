<template>
  <div v-if="props.showLoading" :class="['loading_main', className, site]">
    <img width="180" :src="useCommonImgPath('loading_circle.gif')" alt="" />
  </div>
</template>

<script lang="ts" setup>
import { useCommonImgPath, useSite } from '@/hook/usePath';

const site = useSite();

const props = withDefaults(
  defineProps<{
    showLoading: boolean;
    className?: string;
  }>(),
  {
    className: '',
  }
);
</script>

<style scoped lang="scss">
.loading_main {
  &.discount {
    position: absolute;
    right: 0;
    width: calc(100% - 230px);
    top: 37px;
    background: var(--u_cou_9);
    height: calc(100% - 82px);
    border-radius: 10px;
    @include flex(center);
    margin-top: 0;
  }
  min-height: 300px;
  @include flex(center);
  align-items: flex-start;
  margin-top: 200px;
  &.message-load {
    top: 0;
  }
}

//-002
.loading_main {
  &.template_2_002 {
    &.discount {
      background-color: #1d2936 !important;
    }
  }
}
</style>
