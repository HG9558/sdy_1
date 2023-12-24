<template>
  <div class="deposit-container">
    <div class="deposit-title">
      <span>{{$t('选择支付方式')}}</span>
      <div class="service-container" @click="serviceClick">
        <span class="service-txt">{{$t('【客服热线】')}}</span>
        <img class="question-img" src="./images/question.png" alt="">
        <span class="question-txt">{{$t('存款过程中遇见任何问题，请点击客服热线')}}</span>
      </div>
    </div>
    <div class="tab-container">
			<div :class="`tab-item ${componentName === 'RmPay' && 'on'}`" @click="componentName='RmPay'">
				<img class="logo" :src="coinLogo" alt="">
        <span>{{$tt('currencyLabel')}}</span>
      </div>
      <div v-if="CrPayOfDepositShow" :class="`tab-item ${componentName === 'CrPay' && 'on'}`" @click="componentName='CrPay'">
        <img class="logo" src="../img/deposit/new_crypto.png" alt="">
        <span>{{$t('加密货币')}}</span>
      </div>
      <div v-if="elecShow && isPhp" :class="`tab-item ${componentName === 'ElecPay' && 'on'}`" @click="componentName='ElecPay'">
        <img class="logo" :src="elecLogo" alt="">
        <span>{{$t('电子钱包')}}</span>
      </div>
      <div :class="`tab-item`" @click="gotoChat" v-if="isShowService">
        <img class="logo" src="../img/deposit/new_xezf.png" alt="">
        <span>{{$t('小额客服线')}}</span>
      </div>
      <div :class="`tab-item ${componentName === 'OtherPay' && 'on'}`" @click="componentName='OtherPay'"
        v-if="otherPayShow">
        <img class="logo" :src="otherLogo" alt="">
        <span>{{ $t('其他钱包') }}</span>
      </div>
    </div>
    <!-- 人民币虚拟币充值组件 -->
    <keep-alive>
      <component :is="componentName" :componentName="componentName" :rmPayActivityRules="rmPayActivityRules" @changeOtherPayShow="getOtherPayShow" @changeEmoneyPayShow="getEmoneyPayShow">
      </component>
    </keep-alive>
    <el-dialog center :title="$t('存款提示')" :visible.sync="visible" custom-class='_jmtip' top="30vh" width="415px">
      <span class="triangle">
        <img class="triangle-qq" src="./images/qq.png" alt="">
      </span>
      <div class="_tip">
        <p class="ctt">{{$t('USDT极速存款，秒存秒到，安全快捷，点击跳转使用')}}</p>
        <p class="btns">
          <i @click="visible=false">{{$t('放弃使用USDT')}}</i>
          <i @click="componentName='CrPay';visible=false">{{$t('去USDT存款')}}</i>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CrPay from './component/CrPay';
import RmPay from './component/RmPay';
import ElecPay from './component/ElecPay';
import OtherPay from './component/OtherPay.vue';

const { VUE_APP_APP_CODE, VUE_APP_APP_SIGN } = process.env
export default {
  name: "deposit",
  components: {
    CrPay,
    RmPay,
    ElecPay,
    OtherPay,
  },
  data () {
    return {
      componentName: 'RmPay',
      visible: false,
      rmPayActivityRules: {
        allActiveText: '',
        textArr: []
      },
      recodeArr: [0, 0, 0, 0, 0, 0, 0], // index分别对应 银行/支付宝/微信/网银/扫码/qq/usdt, 记录历史值
      otherPayShow: false,
      CrPayOfDepositShow: false,
      elecShow: false,
    }
  },
  created () {
    this.getCrList()
    this._getLineService()
    this.getJDepositActivityRules()
  },
  methods: {
    ...mapActions('user', ['_getLineService', '_getLineServiceCount']),
    async getCrList() {
      const { data } = await this.$http.getCrList()
      if (data.crList && data.crList.length) {
        this.CrPayOfDepositShow = true
      }
    },
		getEmoneyPayShow(value) {
			this.elecShow = value
		},
		getOtherPayShow(value) {
			this.otherPayShow = value
		},
    gotoChat () {
      this._getLineServiceCount();
      window.open(this.stationSetting.configCodePc, "_blank");
    },
    async getJDepositActivityRules () {
      const res = await this.$http.getJDepositActivityRules()
      const { code } = res.data
      if (code) return
			const jDepositActivityRules = res.data.jDepositActivityRules || []
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
            this.$set(this.rmPayActivityRules, 'allActiveText', this.transitText(item))
            break
          }
        }
      })
    },
    //- 存款类型
    transitText (item, recodeVal) {
      if (!item) return
      const { donateType, donateAmount } = item
      const num = recodeVal ? (recodeVal > donateAmount ? recodeVal : donateAmount) : donateAmount
      if (donateType === 1) {
        let text, unit = [this.$tt('currencyValue'), this.$t('千'), this.$t('万')]
        const arr = String(num).split('')
        if (num <= 1000) {
          text = num + unit[0]
        }
        if (num > 1000) {
          text = arr[0] + '.' + arr[1] + unit[1]
        }
        if (num > 10000) {
          text = arr[0] + '.' + arr[1] + unit[2]
        }
        return `${this.$t('最高赠送')}${text}`
      }
			return `${this.$t('最高赠送')}${num}%`
    },
    serviceClick () {
      if (!this.stationSetting) {
        this.messageTip({
          message: this.$t('正在获取客服链接, 请刷新页面后重试'),
          customClass: "bog",
        })
      } else {
        window.open(this.stationSetting.configCodePc, "_blank");
      }
    }
  },
  watch: {
    componentName (v) {
      if (this.isPhp) return
      this.visible = v === 'RmPay'
    }
  },
  computed: {
    ...mapState({
      isShowService: state => state.user.isShowService,
      stationSetting: state => state.global.stationSetting,
      ebPayWithdrawEnable: state => state.user.ebPayWithdrawEnable,
      toPayWithdrawEnable: state => state.user.toPayWithdrawEnable,
    }),
    isAsy() {
      return ['asy'].includes(VUE_APP_APP_CODE)
    },
    isPhp() {
      return ['php'].includes(VUE_APP_APP_SIGN)
    },
    coinLogo() {
      const { VUE_APP_APP_SIGN } = process.env
			if (['mgm', 'vvi'].includes(VUE_APP_APP_SIGN)) {
				return require(`../img/deposit/coin-logo_myr.png`)
			}
      if (this.isPhp) {
        return require(`../img/deposit/php-deposit.png`)
      }
			return require('../img/deposit/new_rmb.png')
    },
    elecLogo() {
      if (this.isPhp) {
        return require(`../img/deposit/php-deposit.png`)
      }
			return require('../img/deposit/new_rmb.png')
    },
    otherLogo() {
      if (this.isPhp) {
        return require(`../img/deposit/php-deposit.png`)
      }
			return require('../img/deposit/new_rmb.png')
    },
  },
}
</script>

<style scoped lang="scss">
@import "./css/index.scss";
</style>
<style lang="scss">
._jmtip {
  ._tip {
    background-color: #fff;
    color: rgb(158, 150, 150);

    .ctt {
      padding: 10px 15px 45px;
      box-sizing: border-box;
      margin: 0;
      text-align: center;
      color: #b9a999;
      word-wrap: break-word;
      word-break: normal;
    }

    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 15px;

      i {
        font-style: normal;
        color: #b9a999;
        width: 135px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
        //  background-color: rgb(39, 36, 36);
        border: 1px #c1b3a6 solid;

        &:last-child {
          border: 0;
          margin-left: 50px;
          color: #fff;
          background-color: #cab299;
          background: linear-gradient(180deg, #EFD8C2 0%, #997750 100%);
        }
      }
    }
  }
}

.el-dialog.el-dialog--center._jmtip {
  border-radius: 10px;

  .el-dialog__header {
    background: linear-gradient(180deg, #CEBEAF 0%, #C6A277 86.11%, #D2C2B2 100%);
    border-radius: 10px 10px 0px 0px;
    color: #ffffff;
    padding: 15px 10px 15px;
  }
}

.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}

.el-dialog__title {
  color: #fff;
}

.triangle-qq {
  width: 38px;
  right: -1px;
  bottom: -1px;
  position: absolute;
}
</style>
