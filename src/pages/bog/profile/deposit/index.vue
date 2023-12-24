<template>
  <div class="deposit-container">
    <div class="deposit-title">
      <span>选择支付方式</span>
      <div class="service-container" @click="serviceClick">
        <span class="service-txt">【客服热线】</span>
        <img class="question-img" src="./images/question.png" alt="">
        <span class="question-txt">存款过程中遇见任何问题，请点击客服热线</span>
      </div>
    </div>
    <div class="tab-container">
      <div :class="`tab-item ${componentName === 'CrPay' && 'on'}`" @click="componentName='CrPay'">
        <img class="logo" src="../img/deposit/new_crypto.png" alt="">
        <span>加密货币</span>
      </div>
      <div :class="`tab-item ${componentName === 'RmPay' && 'on'}`" @click="componentName='RmPay'">
        <img class="logo" src="../img/deposit/new_rmb.png" alt="">
        <span>人民币</span>
      </div>
      <div :class="`tab-item`" @click="gotoChat" v-if="isShowService">
        <img class="logo" src="../img/deposit/new_xezf.png" alt="">
        <span>小额客服线</span>
      </div>

      <div :class="`tab-item ${componentName === 'OtherPay' && 'on'}`" @click="componentName='OtherPay'"
        v-if="otherPayShow">
        <img class="logo" src="../img/deposit/new_rmb.png" alt="">
        <span>其他钱包</span>
      </div>
    </div>
    <!-- 人民币虚拟币充值组件 -->
    <keep-alive>
      <component :is="componentName" :componentName="componentName" :rmPayActivityRules="rmPayActivityRules">
      </component>
    </keep-alive>
    <el-dialog center title="存款提示" :visible.sync="visible" custom-class='_jmtip' top="19vh" width="409px">
      <!-- <div > -->
      <img src="./images/Pop-up.png" class="PopUp" alt="">
      <!-- </div> -->
      <span class="triangle">
        <img class="triangle-qq" src="./images/qq.png" alt="">
      </span>
      <div class="_tip">
        <!-- <p class="ctt">USDT极速存款，秒存秒到，安全快捷，点击跳转使用</p> -->
        <p class="btns">
          <i @click="visible=false">继续人民币存款</i>
          <i @click="componentName='CrPay';visible=false">去USDT存款</i>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CrPay from './component/CrPay';
import RmPay from './component/RmPay';
import OtherPay from './component/OtherPay.vue';

export default {
  name: "deposit",
  components: {
    RmPay,
    CrPay,
    OtherPay
  },
  data () {
    return {
      componentName: 'CrPay',//RmPay/CrPay
      visible: false,
      rmPayActivityRules: {
        allActiveText: '',
        textArr: []
      },
      recodeArr: [0, 0, 0, 0, 0, 0, 0, 0], // index分别对应 银行/支付宝/微信/网银/扫码/qq/usdt/ebpay, 记录历史值
      otherPayShow: false,
    }
  },
  created () {
    this.initDate()
  },
  methods: {
    ...mapActions('user', ['_getLineService', '_getLineServiceCount', 'set_ebpay_enable', 'set_topay_enable']),
    initDate () {
      this.getJDepositActivityRules()
      this._getLineService()
      this.judgeOtherPayShow()
    },
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
          // case 17: { // ebpay
          //   this.recodeArr[7] = donateAmount
          //   this.$set(this.rmPayActivityRules.textArr, 7, this.transitText(item, this.recodeArr[1]))
          //   break
          // }
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
    },
    judgeOtherPayShow () {
      this.$http.getPzpayPictureUrl().then(res => {
        if (res.data.data) return
        const { ebpayList, topayList } = res.data.res
        this.otherPayShow = !!ebpayList || !!topayList
      })
    },
    serviceClick () {
      if (!this.stationSetting) {
        this.messageTip({
          message: "正在获取客服链接, 请刷新页面后重试",
          customClass: "bog",
        })
      } else {
        window.open(this.stationSetting.configCodePc, "_blank");
      }
    }
  },
  watch: {
    componentName (v) {
      this.visible = v === 'RmPay'
    }
  },
  computed: {
    ...mapState({
      isShowService: state => state.user.isShowService,
      ebPayWithdrawEnable: state => state.user.ebPayWithdrawEnable,
      toPayWithdrawEnable: state => state.user.toPayWithdrawEnable,
      stationSetting: state => state.global.stationSetting,
    }),
  },
}
</script>

<style scoped lang="scss">
@import "./css/index.scss";
</style>
<style lang="scss">
._jmtip {

  // border-radius: 13px;
  ._tip {
    // background-color: #fff;
    color: #666;
    position: absolute;
    bottom: 41px;

    .ctt {
      padding: 10px 15px 45px;
      box-sizing: border-box;
      margin: 0;
      text-align: center;
      color: #b9a999;
    }

    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 15px;

      i {
        font-style: normal;
        color: #fff;
        width: 135px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border-radius: 8px;
        cursor: pointer;
        background: linear-gradient(0deg, #A09F9B 0%, #504F4E 12.5%, #8E8E8E 81.77%, #CBCBCB 100%);
        ;
        opacity: 0.4;

        &:last-child {
          border: 0;
          margin-left: 50px;
          color: #fff;
          background: linear-gradient(180deg, #EFD8C2 0%, #997750 100%);
          opacity: 100;
        }
      }
    }

  }

}

.el-dialog.el-dialog--center._jmtip {
  border-radius: 13px;

  .el-dialog__header {
    background: linear-gradient(180deg, #CEBEAF 0%, #C6A277 86.11%, #D2C2B2 100%);
    border-radius: 12px 12px 0px 0px;
    color: #ffffff;
    // padding: 15px 10px 15px;
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

.PopUp {
  // border: red 1px solid;
  width: 431px;
  // height: 100%;
  position: relative;
  right: 47px;
  bottom: 0px;
}

.el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 0px 29px 0px;
  // height: 594px;
}
</style>
