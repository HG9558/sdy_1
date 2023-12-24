<template>
  <div class="withdrawal-container">
    <CenterWallet />
    <!-- 切换组件 -->
    <div class="tab-container">

      <div :class="{'tab-list':true,'on':tabActive==='rmb'}" @click="tabActive='rmb'" v-if="cnyWithdrawEnable">
        <img
					class="rmb-img"
					:src="require(`../img/deposit/new_rmb${tabActive === 'rmb' ? '_on' : ''}.png`)"
					alt=""
				>
        <span>{{$tt('currencyLabel')}}</span>
      </div>

			<div :class="{'tab-list':true,'on':tabActive==='crypto'}" v-if="crFlag" @click="tabActive='crypto'">
				<img
					class="currency-img"
					:src="require(`../img/deposit/new_crypto${tabActive === 'crypto' ? '_on' : ''}.png`)"
					alt=""
				>
				<span class="text">{{$t('加密货币')}}</span>
			</div>

			<div v-if="alipayEnable" :class="{'tab-list':true,'on':tabActive==='alipay'}" @click="tabActive='alipay'">
				<img
					class="currency-img alipay-img"
					:src="require(`../img/deposit/alipay${tabActive === 'alipay' ? '_on' : ''}.png`)"
					alt=""
				>
				<span class="text">{{$t('支付宝')}}</span>
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

        <div class="tip">
          {{$t('温馨提示：请您在相关注单结算完成后耐心等待10-15分钟后系统会自动校正有效流水。详细有效流水规则如有疑问请咨询')}}
          <span class="service" @click="gotoChat">【{{$t('在线客服')}}】</span>，{{$t('感谢您的支持与信任！')}}
        </div>
				<div v-if="isAud" class="tip">
					{{ $t('由于澳洲银行首次转账会有Pending问题，如果首次提款没立刻到账请耐心等待24小时，谢谢。') }}
				</div>

        <!-- 银行卡开始 -->
        <div class="bank-list-card-container">
          <span>{{$t('选择提现方式')}}</span>
          <div class="bank-card-number">
            <span>
              {{ $t(bankcardTxt) }}
            </span>
            <span>
              {{ bankcardData[tabActive] && bankcardData[tabActive].length
          }}{{ (tabActive === "rmb" || tabActive === "alipay") ? "/5" : "" }}
            </span>
          </div>
        </div>
        <bank-card-manage @changeCurrentBank="changeCurrentBank" :crFlag="crFlag" :alipayEnable="alipayEnable" :tabActive="tabActive" :bankcardData="bankcardData" :isWallet="false"></bank-card-manage>
      </template>
    </div>
  </div>
</template>

<script>
import CenterWallet from '../components/CenterWallet'
import { mapActions, mapMutations, mapState } from 'vuex'
import WithdrawalForm from './component/WithdrawalForm'
import BankCardManage from '../components/BankCardManage'

const { VUE_APP_APP_SIGN, VUE_APP_APP_BANK_ARE_CODE } = process.env

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
			isAud: VUE_APP_APP_BANK_ARE_CODE === 'AUD',
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
    ...mapMutations('user', ['set_alipay_enable', 'set_cnyWithdrawEnable_enable']),
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
      const { cnyWithdrawEnable } = res.data.data
      this.set_cnyWithdrawEnable_enable(!!cnyWithdrawEnable)
      if (!this.cnyWithdrawEnable && this.crFlag) {
        this.tabActive = 'crypto'
      }

      this.isPassed = res.data.data.isPassed;

      this.set_alipay_enable(!!res.data.data.alipayEnable);

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
    gotoChat () {
      window.open(this.stationSetting.configCodePc, "_blank");
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
    }),
    bankcardTxt () {
      if (this.tabActive === 'rmb') {
        return '银行卡数量：'
      } else if (this.tabActive === 'alipay') {
        return '支付宝数量：'
      } else {
        return '钱包数量：'
      }
    },
		coinLogo() {
			const { VUE_APP_APP_SIGN } = process.env
			return require('../img/deposit/new_rmb.png')
		},
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
