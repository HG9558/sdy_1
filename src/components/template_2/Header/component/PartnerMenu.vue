<template>
  <div :class="['partner_component_container', site]">
    <img
      class="animate__animated animate__fadeInUpBig partner-img"
      :src="
        useSiteImgPath(`${envState.vite_current_site}/base/${envState.cur_lang}/${envState.vite_theme}_android.png`)
      " />
    <div class="partner-context">
      <div class="partner-title_one">{{ $t_c('是成为传奇？') }}</div>
      <div class="partner-title_two">{{ $t_c('还是成为传奇的歌颂者？') }}</div>
      <div class="notice">
        <div
          :class="['btn', globalState.language]"
          v-for="(item, index) in baseMenuData.partnerMenu.btnList"
          :key="index">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSiteImgPath, useSite } from '@/hook/usePath';
// import { useEnvState, useGlobalState } from '@/stores';
import { baseMenuData } from 'static_data/game_data';

const globalState = useGlobalState();
const envState = useEnvState();
const site = useSite();
</script>

<style lang="scss" scoped>
.partner_component_container {
  height: 100%;
  @include flex(space-evenly);
  font-size: 16px;
  .partner-img {
    height: 230px;
  }
  .partner-context {
    margin-left: 63px;
    color: var(--h_11);
    .partner-title_one {
      font-size: 30px;
      font-weight: 500;
    }
    .partner-title_two {
      font-size: 26px;
      margin: 10px 0 32px;
      color: var(--h_12);
    }
    .notice {
      @include flex();
      .btn {
        min-width: 140px;
        padding: 0 15px;
        height: 36px;
        margin-right: 42px;
        line-height: 36px;
        text-align: center;
        background: var(--h_13);
        color: var(--h_14);
        border-radius: 18px;

        &:not(.zh, .zh_tw) {
          font-size: 13px;
          margin-right: 10px;
        }
        &.vi {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
