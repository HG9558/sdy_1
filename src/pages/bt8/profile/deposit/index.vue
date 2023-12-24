<template>
  <div class="deposit-container">
    <div class="deposit-title">选择支付方式</div>
    <div class="tab-container">
      <div :class="`tab-item ${componentName === 'CrPay' && 'on'}`" @click="componentName='CrPay'">
        <img class="logo" src="../img/deposit/new_crypto.png" alt="">
        <span>加密货币</span>
      </div>
      <div :class="`tab-item ${componentName === 'RmPay' && 'on'}`" @click="componentName='RmPay'">
        <img class="logo" src="../img/deposit/new_rmb.png" alt="">
        <span>人民币</span>
      </div>
    </div>
    <!-- 人民币虚拟币充值组件 -->
    <keep-alive>
      <component :is="componentName" :componentName="componentName"></component>
    </keep-alive>
  </div>
</template>

<script>
import CrPay from './component/CrPay';
import RmPay from './component/RmPay';
export default {
  name: "deposit",
  components: {
    CrPay,
    RmPay
  },
  data () {
    return {
      componentName: 'CrPay'
    }
  },
}
</script>

<style scoped lang="scss">
@import "./css/index.scss";
</style>