<template>
  <div class="add-bank-card-dialog">
    <div class="add-bank-card-form-wrapper">

      <div class="tab-container">
        <span class="tab-txt">
          提现账户类型：
        </span>
       <div class="tab-main">
          <div :class="{'money-type':true, on: componentName=== 'RmbBank'}" @click="(componentName='RmbBank')&&(formName='rmbBankForm')">银行卡</div>
          <div v-if="crFlag" :class="{'money-type':true, on: componentName=== 'CryBank' }" @click="(componentName = 'CryBank')&&(formName='cyBankForm')">USDT</div>
          <div v-if="alipayEnable" :class="{'money-type':true, on: componentName=== 'AliBank' }" @click="(componentName = 'AliBank')&&(formName='alipayBankForm')">支付宝</div>
          <div v-if="ebPayWithdrawEnable || toPayWithdrawEnable" :class="{'money-type':true, on: componentName=== 'OtherPay' }" @click="(componentName = 'OtherPay')&&(formName = 'otherPayForm')">其他钱包</div>
          <div v-if="ecnyWithdrawEnable" :class="{'money-type':true, on: componentName=== 'EcnyBank'}" @click="(componentName='EcnyBank')&&(formName='ecnyBankForm')">数字人民币</div>
        </div>
      </div>
      <!--  人民币添加  虚拟币添加 支付包添加 -->
      <keep-alive>
        <component ref="childCom" :is="componentName" @_getMobileCode="_getMobileCode" :crLogoList="crLogoList">
        </component>
      </keep-alive>
    </div>

    <el-button class="bog add-bank-card-btn" :loading="bindBtnLoading" @click="_handleAddBankcard(formName)" width="250" height="36">确认</el-button>
  </div>
</template>

<script>

import { mapActions, mapState } from "vuex"
export default {
  name: "AddBankCard",
  props: {
    tabActive: String,
    showDialog: Boolean,
  },
  components: {
    RmbBank: () => import('./RmbBank.vue'),
    CryBank: () => import('./CryBank.vue'),
    AliBank: () => import('./AliBank'),
    OtherPay: () => import('./OtherPay'),
    EcnyBank: () => import('./EcnyBank'),
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this._getCrLogo();
      }
    },
    tabActive: {
      immediate: true,
      handler (val) {
        this.componentName = val === 'rmb' ? 'RmbBank' : val === 'alipay' ? 'AliBank' : val === 'crypto' ? 'CryBank' : val === 'ecny' ? 'EcnyBank' : 'OtherPay'
        this.formName = val === 'rmb' ? 'rmbBankForm' : val === 'alipay' ? 'alipayBankForm' :  val === 'crypto' ? 'cyBankForm' : val === 'ecny' ? 'ecnyBankForm' :  'otherPayForm'
      }
    },
  },
  data () {
    return {
      bindBtnLoading: false,
      componentName: 'RmbBank',
      formName: 'rmbBankForm',
      crLogoList: [],
    }
  },
  methods: {
    ...mapActions('user', ['_getBankCardList', '_getCryptoList', '_getEcnyList', '_getAlipayList', '_getOtherPayAccountList']),
    //- 请求钱包类型
    async _getCrLogo () {
      const res = await this.$http.getCrLogo()
      if (res.data.code) return
      this.crLogoList = res.data.data;
    },
    //- 发送手机验证码
    async _getMobileCode ({ captchaVerification, callback }) {
      try {
        const res = await this.$http.sendSecurityMobCode({
          mobile: this.userInfo.mobile,
          captchaVerification,
        })
        if (!res.data.code) {
          callback && callback();
          this.messageTip({ message: '发送成功，请查看手机', type: 'success' })
        } else {
          this.messageTip({ message: res.data.msg, duration: 1000 });
        }
      } catch (error) {
        console.log(error)
      }
    },
    requestFun (form) {
      if (form === 'rmbBankForm') {
        const params = this.$refs.childCom.rmbBankForm;
        return this.$http.saveBankCard(params)
      } else if (form === 'cyBankForm') {
        const params = {
          walletName: this.$refs.childCom.cyBankForm.walletName.name,
          walletAddress: this.$refs.childCom.cyBankForm.walletAddress,
          currencyCode: "USDT",
          currencyProtocol: this.$refs.childCom.cyBankForm.currencyProtocol.id,
          walletId: this.$refs.childCom.cyBankForm.walletName.id,
        };
        return this.$http.saveCryptoCurrencies(params);
      } else if (form === 'alipayBankForm') {
        const { cardNo, realName } = this.$refs.childCom.alipayBankForm
        const params = {
          cardNo,
          realName
        };
        return this.$http.saveAlipayAccount(params);
      } else if (form === 'ecnyBankForm') {
          const { cardNo, realName } = this.$refs.childCom.ecnyBankForm
          const params = {
              cardNo,
              realName
          };
          return this.$http.saveEcnyAccount(params);
      } else if (form === 'otherPayForm') {
        const { cardNo, address } = this.$refs.childCom.otherPayForm
        const params = {
          cardNo,
          address
        };
        return this.$http.saveOtherPayAccount(params);
      }
    },
    //- 确定添加银行卡或虚拟币
    async _handleAddBankcard (form) {

      this.$refs.childCom.$refs[form].validate(async valid => {
        if (!valid) return;
        this.bindBtnLoading = true;
        try {

          const res = await this.$http.vfySecurityMobCode({
            code: this.$refs.childCom[form].code,
            mobile: this.userInfo.mobile,
          })
          this.bindBtnLoading = false;
          if (!res.data.code && res.data.msg === "success") {
            this.requestFun(form).then((res) => {
              if (res.data.code === 0) {
                this.$emit('update:showDialog', false)
                const messageTipData = {
                  otherPayForm: {
                    text: 'EBpay钱包添加成功',
                    http: '_getOtherPayAccountList',
                  },
                  rmbBankForm: {
                    text: '银行卡添加成功',
                    http: '_getBankCardList'
                  },
                  cyBankForm: {
                    text: 'USDT钱包添加成功',
                    http: '_getCryptoList',
                  },
                  ecnyBankForm: {
                    text: '数字人民币添加成功',
                    http: '_getEcnyList',
                  },
                  alipayBankForm: {
                    text: '支付宝账户添加成功',
                    http: '_getAlipayList'
                  }
                }
                this.messageTip({ message: messageTipData[form].text })
                this[messageTipData[form].http]()
              } else {
                this.messageTip({ message: res.data.msg });
                if (res.data.code === 2000) {
                  setTimeout(() => {
                    this.$router.push({ path: '/profile' })
                  }, 2000)
                }
              }
              this.$refs.childCom.$refs[form].resetFields();
              this.$refs.childCom.startCount = false;
            }).catch(() => { });
          }
        } catch (error) {
          console.log(error)
          this.bindBtnLoading = false;
          this.$refs.childCom.$refs[form].resetFields();
          this.$refs.childCom.startCount = false;
        }
      });
    },
  },
  computed: {
    ...mapState({
      crFlag: state => state.user.crFlag,
      alipayEnable: state => state.user.alipayEnable,
      ebPayWithdrawEnable: state => state.user.ebPayWithdrawEnable,
      // toPayWithdrawEnable: state => state.user.toPayWithdrawEnable,
      otherpay: state => state.user.otherpay,
      ecnyWithdrawEnable: state => state.user.ecnyWithdrawEnable,
    }),
  },

}
</script>

<style lang="scss" scoped>
@import "../css/AddBankCard.scss";
</style>
