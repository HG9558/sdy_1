<template>
  <div class="qr-container">
    <div class="qr-wrapper">
      <!-- <qrcode class="code-img login-code" v-bind="codeData"></qrcode> -->
      <img :src="qrInfo.url" alt="">
    </div>
    <div class="level">
      <span>{{$t('支付金额:')}}</span>
      <span class="white">
        {{qrInfo.depositAmount}}{{$tt('currencyValue')}}
      </span>
    </div>
    <div class="level">{{$t('请使用支付宝或二维码支付')}}</div>
    <div class="rule">
      <div>{{$t('1、禁止保存二维码图片私下支付，如私下支付可能会导致 无法上分。')}}</div>
      <div>{{$t('2、请严格按照页面显示的金额转账，请勿修改金额，否则 会导致慢到帐的情况。')}}</div>
    </div>
  </div>
</template>

<script>
import qrcode from 'vue-qr'
export default {
  name: "QrDialogContent.vue",
  props: {
    qrInfo: Object,
  },
  components: {
    qrcode
  },
  data () {
    return {
      logoSrc: '../../img/vetor.png',
      codeData: {
        correctLevel: 3,
        logoScale: .26,
        margin: 0,
        size: 113,
        text: this.qrInfo.url,
        logoSrc: require('../../img/deposit/vetor.png')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.qr-container {
  @include flex(center, column);


  .qr-wrapper {
    width: 125px;
    height: 133px;
    background-image: url("../../img/deposit/qr-wrapper.png");
    background-size: 100% 100%;
    @include flex(center);
    margin-bottom: 10px;
    img {
      width: 113px;
    }
  }
  .level {
    font-size: 14px;
    font-weight: 500;
    color: #27273F;
  }
  .rule {
    color: #ff2f2f;
    font-size: 14px;
    margin-top: 22px;
    line-height: 20px;
  }
}
</style>
