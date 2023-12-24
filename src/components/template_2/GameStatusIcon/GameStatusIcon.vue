<template>
  <div class="icon-container">
    <div :class="['status', 'try', { big: hasIcon }]" v-if="isTry === 1 && availableWh === 1 && !userState.token">
      <img width="10" class="try_img" :src="useImgPath(`base/try_icon.png`)" alt="" />
      <span :class="[globalState.language, 'try']">{{ $t_c('可试玩') }}</span>
    </div>

    <div :class="['status', 'wh', { big: hasIcon }]" v-if="availableWh === 2">
      <img width="10" :src="useImgPath(`base/wh_icon.png`)" />
      <span :class="[globalState.language]">{{ $t_c('维护中') }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useImgPath } from '@/hook/usePath';
// import { useUserState, useGlobalState } from '@/stores';

const userState = useUserState();
const globalState = useGlobalState();

withDefaults(
  defineProps<{
    isTry?: number;
    availableWh?: number;
    hasIcon?: boolean;
    iconType?: string;
  }>(),
  {
    isTry: -1,
    availableWh: -1,
    hasIcon: true,
    iconType: '',
  }
);
</script>

<style lang="scss" scoped>
.icon-container {
  margin-top: 10px;

  .status {
    position: relative;
    @include flex(center);
    border: 1px solid var(--h_u_18);
    border-radius: 13px 0;
    padding: 2px 0px 2px 5px;
    span {
      font-size: 12px;
      transform: scale(0.8);
      width: 40px;
      color: var(--h_u_21);
      &.en {
        width: 90px;
      }
      &.ms {
        width: 90px;
      }
      &.vi {
        width: 75px;
      }
    }
    &.try {
      border: 1px solid var(--h_u_19);
      span {
        color: var(--h_u_20);
        &.ms {
          width: 130px;
        }
        &.vi {
          width: 112px;
        }
        &.en {
          width: 30px;
        }
      }
    }
  }
}
</style>
