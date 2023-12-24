<template>
  <div class="withdrawal-container">
    <CenterWallet />
    <!-- 切换组件 -->
    <!-- <div class="withdrawal-bg"> -->
    <div class="tab-container">

      <div v-if="alipayEnable" :class="{'tab-list':true,'on':tabActive==='alipay'}" @click="tabActive='alipay'">
        <img class="alipay-img" :src="require(`./img/${tabActive!=='alipay'?'alipay':'alipay_on'}.png`)" alt="">
        <span class="text">{{$t('支付宝')}}</span>
      </div>

      <div v-if="crFlag" :class="{'tab-list':true,'on':tabActive==='crypto'}" @click="tabActive='crypto'">
        <img class="currency-img" :src="require(`./img/${tabActive!=='crypto'?'currency':'currency_on'}.png`)" alt="">
        <span class="text">{{$t('加密货币')}}</span>
      </div>

      <div v-if="cnyWithdrawEnable" :class="{'tab-list':true,'on':tabActive==='rmb'}" @click="tabActive='rmb'">
        <img class="rmb-img" :src="require(`./img/${tabActive!=='rmb'?'rmb':'rmb_on'}.png`)" alt="">
        <span class="text">{{$tt('currencyLabel')}}</span>
      </div>

      <div v-if="eMoneyPayWithdrawEnable" :class="{'tab-list':true,'on':tabActive==='elec'}" @click="tabActive='elec'">
        <img class="rmb-img" :src="require(`./img/${tabActive!=='elec'?'rmb':'rmb_on'}.png`)" alt="">
        <span class="text">{{$t('电子钱包')}}</span>
      </div>

    </div>

    <div class="withdrawal-wrapper">
      <!-- 未绑定手机号码验证 -->
      <div class="warning-box" v-if="!userInfo.realName || (isNeedVfySms && !userInfo.mobile || isNeedVfyEMail && !userInfo.email)" @click="$router.push('/profile')">
        <i class="el-icon-warning warning"></i>
        <span class="error">{{$t('操作失败')}}</span>
        <div class="tip">{{ bindingTips }}</div>
      </div>

      <template v-else>
        <!-- 取款表单 -->
        <withdrawal-form :selectBank="selectBank" :isPassed="isPassed" :withdrawalCond="withdrawalCond" :depositResidueValidBet="depositResidueValidBet" :depositValidBet="depositValidBet" :tabActive="tabActive" :exchangeRate="exchangeRate"></withdrawal-form>

        <bank-card-manage @changeCurrentBank="changeCurrentBank" :crFlag="crFlag" :alipayEnable="alipayEnable" :tabActive="tabActive" :bankcardData="bankcardData" :isWallet="false"></bank-card-manage>
      </template>
    </div>
    <!-- </div> -->

  </div>
</template>

<script>
import CenterWallet from '../components/CenterWallet'
import { mapActions, mapMutations, mapState } from 'vuex'
import WithdrawalForm from './component/WithdrawalForm'
import BankCardManage from '../components/BankCardManage'

export default {
  name: "withdrawal",
  components: {
    CenterWallet,
    WithdrawalForm,
    BankCardManage
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this.init();
      }
    },
    exchangeRate: {
      immediate: true,
      handler (val) {
        this.exchangeRate = val
      }
    }
  },
  data () {
    return {
      isPassed: true,
      depositValidBet: 0, //- 流水金额
      depositResidueValidBet: 0,//- 完成金额
      exchangeRate: 0,
      withdrawalCond: null,
      tabActive: 'rmb',
      selectBank: {},
    }
  },
  methods: {
    ...mapActions('user', ['_searchCrFlagType']),
    ...mapMutations('user', ['set_alipay_enable', 'set_cnyWithdrawEnable_enable', 'set_elecpay_enable']),
    init () {
      this._searchCrFlagType();
      this._isWithdrawal();
      this._getUserExchangeRate(); //- 获取参考汇率
      this._withdrawalCond();   //- 取款限额
    },
    //- 获取稽核列表
    async _isWithdrawal () {
      const res = await this.$http.isWithdrawal()
      if (res.data.code) return;
      const { cnyWithdrawEnable, alipayEnable, eMoneyPayWithdrawEnable } = res.data.data
      this.set_cnyWithdrawEnable_enable(!!cnyWithdrawEnable)

      this.isPassed = res.data.data.isPassed;

      this.set_alipay_enable(!!alipayEnable);

      this.set_elecpay_enable(!!eMoneyPayWithdrawEnable);

      if (this.alipayEnable) {
        this.tabActive = 'alipay'
      }

      if (!this.isPassed) {
        this.depositValidBet = res.data.data.depositValidBet;
        this.depositResidueValidBet = res.data.data.completedValidBet;
      }

    },
    async _getUserExchangeRate () {
      const res = await this.$http.getUserExchangeRate()
      const { code, msg } = res.data;
      if (code) return;
      this.exchangeRate = Number(msg);
    },
    async _withdrawalCond () {
      const res = await this.$http.withdrawalCond()
      const { code, withdrawalCond } = res.data;
      if (code === 0 && withdrawalCond) {
        this.withdrawalCond = withdrawalCond;
      }
    },
    changeCurrentBank (item) {
      if (item.available == 0 || item.available == 2) return
      this.selectBank = item;
    }
  },
  computed: {
    ...mapState('global', ['isNeedVfySms', 'isNeedVfyEMail']),
    ...mapState({
      crFlag: state => state.user.crFlag,
      bankcardData: state => state.user.bankcardData,
      alipayEnable: state => state.user.alipayEnable,
      stationSetting: state => state.global.stationSetting,
      cnyWithdrawEnable: state => state.user.cnyWithdrawEnable,
      eMoneyPayWithdrawEnable: state => state.user.eMoneyPayWithdrawEnable,
    }),
    bindingTips() {
			if (!this.userInfo.realName) {
				return this.$t('为了您的资金安全，请先填写真实姓名！')
			}

			if (!this.userInfo.email && this.isNeedVfyEMail) {
				return this.$t('为了您的资金安全，请您先操作绑定邮箱！')
			}

			if (!this.userInfo.mobile && this.isNeedVfySms) {
				return this.$t('为了您的资金安全，请您先操作绑定手机号！')
			}

			return ''
		},
  }
}
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
