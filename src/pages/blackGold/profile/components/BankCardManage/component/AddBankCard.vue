<template>
  <div class="add-bank-card-dialog">
    <div class="add-bank-card-form-wrapper">

      <div class="tab-container">
        <span class="tab-txt">
          {{$t('提现账户类型：')}}
        </span>
        <div class="tab-main">
          <div :class="{'money-type':true, on: componentName=== 'RmbBank'}" @click="(componentName='RmbBank')&&(formName='rmbBankForm')">{{$t('银行卡')}}</div>
          <div v-if="crFlag" :class="{'money-type':true, on: componentName=== 'CryBank' }" @click="(componentName = 'CryBank')&&(formName='cyBankForm')">USDT</div>
          <div v-if="alipayEnable" :class="{'money-type':true, on: componentName=== 'AliBank' }" @click="(componentName = 'AliBank')&&(formName='alipayBankForm')">{{$t('支付宝')}}</div>
          <div v-if="eMoneyPayWithdrawEnable" :class="{'money-type':true, on: componentName=== 'ElecBank' }" @click="(componentName = 'ElecBank')&&(formName='elecBankForm')">{{$t('电子钱包')}}</div>
        </div>
      </div>
      <!--  人民币添加  虚拟币添加 支付包添加 -->
      <keep-alive>
        <component ref="childCom" :is="componentName" @_getMobileCode="_getMobileCode" :crLogoList="crLogoList">
        </component>
      </keep-alive>
    </div>

    <el-button class="bog add-bank-card-btn" :loading="bindBtnLoading" @click="_handleAddBankcard(formName)" width="250" height="36">{{$t('确认')}}</el-button>
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
    ElecBank: () => import('./ElecBank'),
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
        this.componentName = val === 'rmb' ? 'RmbBank' : val === 'alipay' ? 'AliBank' : val === 'elec' ? 'ElecBank' : 'CryBank'
        this.formName = val === 'rmb' ? 'rmbBankForm' : val === 'alipay' ? 'alipayBankForm' : val === 'elec' ? 'elecBankForm' : 'cyBankForm'
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
    ...mapActions('user', ['_getBankCardList', '_getCryptoList', '_getAlipayList', '_getElecList']),
    //- 请求钱包类型
    async _getCrLogo () {
      const res = await this.$http.getCrLogo()
      if (res.data.code) return
      this.crLogoList = res.data.data;
    },
    //- 发送手机验证码
    async _getMobileCode ({ captchaVerification, callback }) {
			const func = this.isNeedVfySms ? this.$http.sendSecurityMobCode : this.$http.sendMailCode
      try {
        const res = await func(this.isNeedVfySms ? {
          mobile: this.userInfo.mobile,
          captchaVerification,
        } : {
					module: 4,
					email: this.userInfo.email,
					captchaVerification,
			})
        if (!res.data.code) {
          callback && callback();
          this.messageTip({ message: this.$t('发送成功'), type: 'success' })
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
      } else if (form === 'elecBankForm') {
        const params = this.$refs.childCom.elecBankForm;
        return this.$http.saveElec(params)
      }
    },
    //- 确定添加银行卡或虚拟币
    async _handleAddBankcard (form) {
      
      this.$refs.childCom.$refs[form].validate(async valid => {
        if (!valid) return;
        this.bindBtnLoading = true;
        try {

          let res = null
          if (this.isNeedVfySms || this.isNeedVfyEMail) {
						const func = this.isNeedVfySms ? this.$http.vfySecurityMobCode : this.$http.vfyMailCode
            res = await func(this.isNeedVfySms ? {
              code: this.$refs.childCom[form].code,
              mobile: this.userInfo.mobile,
            } : {
							module: 4,
							code: this.$refs.childCom[form].code,
							email: this.userInfo.email,
						})
          } else {
            res = { data: { code: 0, msg: 'success' } }
          }

          this.bindBtnLoading = false;
          if (!res.data.code && res.data.msg === "success") {
            this.requestFun(form).then((res) => {
              if (res.data.code === 0) {
                this.$emit('update:showDialog', false)
                this.messageTip({ message: this.$t('添加成功') });

                form === 'rmbBankForm' ? this._getBankCardList() : form === 'cyBankForm' ? this._getCryptoList() : form === 'elecBankForm' ? this._getElecList() : this._getAlipayList();
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
          } else {
						this.messageTip({ message: res.data.msg });
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
    ...mapState('global', ['isNeedVfySms', 'isNeedVfyEMail']),
    ...mapState({
      crFlag: state => state.user.crFlag,
      alipayEnable: state => state.user.alipayEnable,
      eMoneyPayWithdrawEnable: state => state.user.eMoneyPayWithdrawEnable,
    }),
  },

}
</script>

<style lang="scss" scoped>
@import "../css/AddBankCard.scss";
</style>
