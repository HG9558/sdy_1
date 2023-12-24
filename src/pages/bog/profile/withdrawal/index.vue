<template>
  <div class="withdrawal-container">
    <CenterWallet />
    <!-- 切换组件 -->
   <div class="tab-container">
       <div :class="{'tab-list':true,'on':tabActive==='paybus'}" @click="tabActive='paybus'" v-if="payBusPayWithdrawEnable === 1">
           <img class="rmb-img" :src="require(`./img/${tabActive!=='paybus'?'paybus':'paybus_on'}.png`)" alt="">
           <span class="text">极速支付</span>
       </div>

      <div v-if="alipayEnable" :class="{'tab-list':true,'on':tabActive==='alipay'}" @click="tabActive='alipay'">
        <img class="alipay-img" :src="require(`./img/${tabActive!=='alipay'?'alipay':'alipay_on'}.png`)" alt="">
        <span class="text">支付宝</span>
      </div>

      <div :class="{'tab-list':true,'on':tabActive==='crypto'}" v-if="crFlag" @click="tabActive='crypto'">
        <img class="currency-img" :src="require(`./img/${tabActive!=='crypto'?'currency':'currency_on'}.png`)" alt="">
        <span class="text">加密货币</span>
      </div>

      <div :class="{'tab-list':true,'on':tabActive==='rmb'}" @click="tabActive='rmb'" v-if="cnyWithdrawEnable">
        <img class="rmb-img" :src="require(`./img/${tabActive!=='rmb'?'rmb':'rmb_on'}.png`)" alt="">
        <span class="text">人民币</span>
      </div>

      <div v-if="ebPayWithdrawEnable || toPayWithdrawEnable" :class="{'tab-list':true,'on':tabActive==='otherpay'}" @click="tabActive='otherpay'">
        <img class="rmb-img" :src="require(`./img/${tabActive!=='otherpay'?'otherpay':'otherpay_on'}.png`)" alt="">
        <span class="text">其他钱包</span>
      </div>

       <div v-if="ecnyWithdrawEnable" :class="{'tab-list':true,'on':tabActive==='ecny'}" @click="tabActive='ecny'">
           <img class="rmb-img" :src="require(`./img/${tabActive!=='ecny'?'ecny':'ecny_on'}.png`)" alt="">
           <span class="text">数字人民币</span>
       </div>
    </div>

    <div class="withdrawal-wrapper">
      <!-- 未绑定手机号码验证 -->
      <div class="warning-box" v-if="!userInfo.mobile" @click="$router.push('/profile')">
        <i class="el-icon-warning warning"></i>
        <span class="error">操作失败</span>
        <div class="tip">为了您的资金安全，请您先操作绑定手机号！</div>
      </div>

      <template v-else>
        <!-- 取款表单 -->
        <withdrawal-form :paybusChargeValues="paybusChargeValues" :selectBank="selectBank" :isPassed="isPassed" :withdrawalCond="withdrawalCond" :depositResidueValidBet="depositResidueValidBet" :depositValidBet="depositValidBet" :tabActive="tabActive" :exchangeRate="exchangeRate"></withdrawal-form>

        <div class="tip" v-if="tabActive !== 'paybus'">
          温馨提示：请您在相关注单结算完成后耐心等待10-15分钟后系统会自动校正有效流水。详细有效流水规则如有疑问请咨询
          <span class="service" @click="gotoChat">【在线客服】</span>，感谢您的支持与信任！
        </div>
        <div class="tip" v-else>
          温馨提示：为了提现极速到账，请务必按规则操作！<br/><br/>
          1. 选择金额发起提现<br/>
          2. 等待收款账户到账（建议使用有短信提示功能的卡）<br/>
          3. 重要：收款账户到账无误后，前往交易记录中【确认收款】<br/>
          4. 提现完成（若未到账或到账金额有误，请联系客服协助）
        </div>

        <!-- 银行卡开始 -->
        <div class="bank-list-card-container">
          <span>我的提现方式</span>
          <div class="bank-card-number">
            <span>
              {{ bankcardTxt }}
            </span>
            <span>
              {{bankcardData[tabActive==='paybus'?'rmb':tabActive] && bankcardData[tabActive==='paybus'?'rmb':tabActive].length}}
              {{ (tabActive === "rmb" || tabActive === "alipay" || tabActive === "paybus" || tabActive === "ecny") ? "/5" : "" }}
            </span>
          </div>
        </div>
        <bank-card-manage @changeCurrentBank="changeCurrentBank" :crFlag="crFlag" :alipayEnable="alipayEnable" :tabActive="tabActive==='paybus'?'rmb':tabActive" :bankcardData="bankcardData" :isWallet="false"></bank-card-manage>
      </template>
    </div>
    <!--提款申请-->
    <global-dialog :showDialog.sync="showDialogPaybusWithTip" title="提示" :hasSelfFooter="true" width="700px">
        <!--<AddBankCard :tabActive="tabActive" :showDialog.sync="showDialog" />-->
        <PaybusWithTip :showDialog.sync="showDialog"/>
    </global-dialog>
  </div>
</template>

<script>
import CenterWallet from '../components/CenterWallet'
import { mapActions, mapMutations, mapState } from 'vuex'
import WithdrawalForm from './component/WithdrawalForm'
import BankCardManage from '../components/BankCardManage'
import PaybusWithTip from './component/PaybusWithTip'

export default {
  name: "withdrawal",
  components: {
    CenterWallet,
    WithdrawalForm,
    BankCardManage,
    PaybusWithTip,
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
      paybusChargeValues: [],
      payBusPayWithdrawEnable: 0,
      showDialogPaybusWithTip: false, // paybus存款提示
    }
  },
  methods: {
    ...mapActions('user', ['_searchCrFlagType']),
    ...mapMutations('user', ['set_alipay_enable', 'set_ebpay_enable', 'set_topay_enable', 'set_ecny_enable', 'set_cnyWithdrawEnable_enable']),
    init () {
      this._searchCrFlagType();
      this._isWithdrawal();
      this._getUserExchangeRate(); //- 获取参考汇率
      this._withdrawalCond();   //- 取款限额
      this._initGetC2CWithdrawalCharge(); //- paybus取款信息
    },
    async _initGetC2CWithdrawalCharge() {
        const res = await this.$http.getC2CWithdrawalCharge({});
        const { data } = res;
        if (data && data.code === 0 && data.chargeValues) {
            this.paybusChargeValues = data.chargeValues
        } else {
            this.paybusChargeValues = ['100', '200', '300', '500', '1000', '2000', '5000']
        }
    },
    async _getLastC2CWithdrawal () {
      const res = await this.$http.getLastC2CWithdrawal()
      if (res && res.data && res.data.code === 0 && res.data.withdrawInfo) {
          this.showDialogPaybusWithTip = true
      }
    },
    //- 获取稽核列表
    async _isWithdrawal () {
      const res = await this.$http.isWithdrawal()
      if (res.data.code) return;
      this.isPassed = res.data.data.isPassed;
      const { alipayEnable, ebPayWithdrawEnable, toPayWithdrawEnable, payBusPayWithdrawEnable, ecnyWithdrawEnable, cnyWithdrawEnable } = res.data.data
      this.set_cnyWithdrawEnable_enable(!!cnyWithdrawEnable)
      this.set_alipay_enable(!!alipayEnable);
      this.set_ebpay_enable(!!ebPayWithdrawEnable);
      this.set_topay_enable(!!toPayWithdrawEnable);
      this.set_ecny_enable(!!ecnyWithdrawEnable);
      this.payBusPayWithdrawEnable = payBusPayWithdrawEnable;

      if (this.payBusPayWithdrawEnable) {
          this.tabActive = 'paybus'
          this._getLastC2CWithdrawal()
      } else if (this.alipayEnable) {
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
      let newWithdrawalCond = JSON.parse(JSON.stringify(withdrawalCond))
      if (code === 0 && withdrawalCond) {
        newWithdrawalCond = {
          ...newWithdrawalCond,
          ebpayMin: 100,
          ebpayMax: 100000
        }
      }
      this.withdrawalCond = newWithdrawalCond;
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
    ...mapState({
      crFlag: state => state.user.crFlag,
      bankcardData: state => state.user.bankcardData,
      alipayEnable: state => state.user.alipayEnable,
      ebPayWithdrawEnable: state => state.user.ebPayWithdrawEnable,
      toPayWithdrawEnable: state => state.user.toPayWithdrawEnable,
      ecnyWithdrawEnable: state => state.user.ecnyWithdrawEnable,
      stationSetting: state => state.global.stationSetting,
      cnyWithdrawEnable: state => state.user.cnyWithdrawEnable,
    }),
    bankcardTxt () {
      if (this.tabActive === 'rmb' || this.tabActive === 'paybus' || this.tabActive === 'ecny') {
        return '银行卡数量：'
      } else if (this.tabActive === 'alipay') {
        return '支付宝数量：'
      } else {
        return '钱包数量：'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
