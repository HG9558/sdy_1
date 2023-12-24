<template>
  <div class="deposit-container">
    <div class="deposit-title">选择支付方式</div>
    <div class="tab-container">
      <div :class="`tab-item ${componentName === 'CrPay' && 'on'}`" @click="componentName='CrPay'">
        <img class="logo" :src="require(`../img/deposit/new_crypto${componentName === 'CrPay' ? '_on' : ''}.png`)" alt="">
        <span>加密货币</span>
      </div>
      <div :class="`tab-item ${componentName === 'RmPay' && 'on'}`" @click="componentName='RmPay'">
        <img class="logo" :src="require(`../img/deposit/new_rmb${componentName === 'RmPay' ? '_on' : ''}.png`)" alt="">
        <span>人民币</span>
      </div>
      <div :class="`tab-item`" @click="gotoChat" v-if="isShowService">
        <img class="logo" src="../img/deposit/new_xezf.png" alt="">
        <span>小额客服线</span>
      </div>
    </div>
    <!-- 人民币虚拟币充值组件 -->
    <keep-alive>
      <component :is="componentName" :componentName="componentName" :rmPayActivityRules="rmPayActivityRules"></component>
    </keep-alive>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
      componentName: 'CrPay',
      visible: false,
      rmPayActivityRules: {
        allActiveText: '',
        textArr: []
      },
      recodeArr: [0,0,0,0,0,0,0], // index分别对应 银行/支付宝/微信/网银/扫码/qq/usdt, 记录历史值
    }
  },
  created () {
    this.getJDepositActivityRules()
    this._getLineService()
  },
  methods: {
    ...mapActions('user', ['_getLineService', '_getLineServiceCount']),
    gotoChat () {
      this._getLineServiceCount();
      window.open(this.stationSetting.configCodePc, "_blank");
    },
    async getJDepositActivityRules () {
      const res = await this.$http.getJDepositActivityRules()
      const { code, jDepositActivityRules } = res.data
      if (code) return
      jDepositActivityRules.map(item => {
        const { paymentType, donateAmount } = item
        switch (paymentType) {
          case 1: { // QQ
            this.recodeArr[5] = donateAmount
            this.$set(this.rmPayActivityRules.textArr, 5, this.transitText(item, this.recodeArr[5]))
            break
          }
          case 2: { // wechat
            this.recodeArr[2] = donateAmount
            this.$set(this.rmPayActivityRules.textArr, 2, this.transitText(item, this.recodeArr[2]))
            break
          }
          case 4: { // 网银
            this.recodeArr[3] = donateAmount
            this.$set(this.rmPayActivityRules.textArr, 3, this.transitText(item, this.recodeArr[3]))
            break
          }
          case 5: { // 支付宝
            this.recodeArr[1] = donateAmount
            this.$set(this.rmPayActivityRules.textArr, 1, this.transitText(item, this.recodeArr[1]))
            break
          }
          case 101: { // 银行卡
            this.recodeArr[0] = donateAmount
            this.$set(this.rmPayActivityRules.textArr, 0, this.transitText(item, this.recodeArr[0]))
            break
          }
          case 100: { // usdt
            this.recodeArr[6] = donateAmount
            this.$set(this.rmPayActivityRules.textArr, 6, this.transitText(item, this.recodeArr[6]))
            break
          }
          case 0: { // 全部
            this.$set(this.rmPayActivityRules, 'allActiveText' , this.transitText(item))
            break
          }
        }
      })
    },
    //- 存款类型
    transitText (item, recodeVal) {
      if (!item) return
      const { donateType, donateAmount } = item
      const num = recodeVal ? ( recodeVal > donateAmount ? recodeVal : donateAmount ) : donateAmount
      if (donateType === 1) {
        let text, unit = ['元', '千', '万']
        const arr = String(num).split('')
        if (num <= 1000) {
          text = num + unit[0]
        }
        if (num > 1000) {
          debugger
          text = arr[0] + '.' + arr[1] + unit[1]
        }
        if (num > 10000) {
          text = arr[0] + '.' + arr[1] + unit[2]
        }
        return `最高赠送${text}`
      }
      return `最高赠送${num}%`
    }
  },
  watch: {
    componentName(v) {
      if(v !=='RmPay') return;
      this.openConfirmDialog({
        content: ["USDT极速存款，秒存秒到，安全快捷，点击跳转使用"],
        cancelButtonText: "放弃使用USDT",
        confirmButtonText: "去USDT存款",
        callback: () => { this.componentName='CrPay' },
      })
    }
  },
  computed: {
    ...mapState({
      isShowService: state => state.user.isShowService,
    }),
    ...mapState({
      stationSetting: state => state.global.stationSetting
    }),
  },
}
</script>

<style scoped lang="scss">
@import "./css/index.scss";
</style>
