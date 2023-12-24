<template>
  <div :class="['qr-container', site]">
    <div class="qr-wrapper">
      <img :src="qrInfo.url" alt="" />
    </div>
    <div class="level">
      <span>{{ $t_c('支付金额:') }}</span>
      <span class="white"> {{ qrInfo.depositAmount }} {{ envState.vite_currency_map.value }} </span>
    </div>
    <div class="level">{{ $t_c('请使用支付宝或二维码支付') }}</div>
    <div class="rule">
      <div>{{ $t_c('1、禁止保存二维码图片私下支付，如私下支付可能会导致 无法上分。') }}</div>
      <div>{{ $t_c('2、请严格按照页面显示的金额转账，请勿修改金额，否则 会导致慢到帐的情况。') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useImgPath, useSite } from '@/hook/usePath';
// import { useEnvState } from '@/stores';

const site = useSite();
const envState = useEnvState();
defineProps<{
  qrInfo: DepositType.Info;
}>();

const codeImg = `url(${useImgPath('base/login_sm_code_container.png')})`;
</script>

<style scoped lang="scss">
.qr-container {
  @include flex(center, column);

  .white {
    color: var(--u_c_21);
  }

  .qr-wrapper {
    width: 130px;
    height: 130px;
    background-image: v-bind(codeImg);
    background-size: 100% 100%;
    @include flex(center);
    margin-bottom: 10px;

    img {
      width: 120px;
    }
  }

  .level {
    font-size: 14px;
    font-weight: 500;
    color: var(--u_c_17);

    span:first-child {
      margin-right: 5px;
    }
  }

  .rule {
    color: var(--u_c_30);
    font-size: 14px;
    margin-top: 22px;
    line-height: 20px;
    @include flex(flex-start, column, wrap, flex-start);
    padding: 0 50px;
    text-align: left;
  }
}

//- 002
.qr-container {
  &.template_2_002 {
    .qr-wrapper {
      img {
        width: 110px;
        height: 110px;
      }
    }
  }
}
</style>
