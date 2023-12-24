<template>
  <div class="form-container">

    <div class="money-notice">
      <div class="money-notice-text">
        <span>提现金额</span>
        <div class="masker-container" v-if="!isPassed">
          <i class="el-icon-warning warning"></i>
          <span class="text">查看未完成流水</span>
          <div class="notice-msg">
            提现所需有效投注总流水为{{ depositValidBet }}元，已完成{{
                  depositResidueValidBet
                }}元。请继续加油!
          </div>
        </div>

        <div class="money-notice" v-else>{{feePlaceholder}}</div>
      </div>

      <div class="notice-number" v-if="withdrawalCond && withdrawalCond.feeAvailable === 1">
        <div class="mini">
          今日提现次数：{{ withdrawalCond.withDrawalTimesMbr || 0 }}/{{
                withdrawalCond.withDrawalTimes || 0
              }}
        </div>
        <div class="mini right">
          提现金额：{{ withdrawalCond.withDrawalQuotaMbr || 0 }}/{{
                withdrawalCond.withDrawalQuota || 0
              }}
        </div>
      </div>
    </div>

    <div class="fee-form">
      <el-form class="bog" :model="feeForm" :rules="feeFormRules" ref="feeForm">
        <el-form-item prop="fee" class="fee">
          <el-input class="money-form" :clearable="true" :placeholder="`最低${minAmount}元，最高${maxAmount}元`" v-model.number="feeForm.fee"></el-input>
          <el-button class="bog fee-submit" :disabled="!isPassed" @click="feeFormSubmit" :loading="withdrawalLoading">确认提现</el-button>
          <span class="ml-10 c-4d">可提现金额：{{!isPassed ? 0 : centerBalanceMoney}}元，不包括游戏平台未转出余额</span>
        </el-form-item>
      </el-form>

      <div class="virtual-text-container" v-if="tabActive==='crypto'">
        当前参考汇率： 1 USDT ≈ {{ exchangeRate }} CNY 预计到账金额：{{ userGetMoney }} USDT
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'WithdrawalFom',
  props: {
    withdrawalCond: Object,
    isPassed: Boolean,
    depositValidBet: Number,
    depositResidueValidBet: Number,
    tabActive: String,
    exchangeRate: Number,
    selectBank: Object,
  },
  data () {
    return {
      withdrawalLoading: false,
      feeForm: {
        fee: null, //充值数值
      },
      feeFormRules: {
        fee: [
          { required: true, message: "请输入取款金额", trigger: "blur" },
          { type: "number", message: "请输入取款金额" },
          { validator: this.validateFee, trigger: ["blur", "change"] },
        ]
      },
      curBankCard: {},
    }
  },
  watch: {
    tabActive: {
      immediate: true,
      handler (val) {
        this.$refs["feeForm"] && this.$refs["feeForm"].resetFields();
        if (val === 'crypto' && (this.bankcardData[val][0].available == 0 || this.bankcardData[val][0].available == 2)) {
          this.curBankCard = {}
        } else {
          this.curBankCard = this.bankcardData[val][0];
        }
      }
    },
    selectBank: {
      deep: true,
      handler (val) {
        this.curBankCard = val;
      }
    }
  },
  methods: {
    async _handleWithdrawal () {
      this.withdrawalLoading = true;
      let sendData = null;
      if (this.tabActive === "rmb") {
        sendData = {
          bankCardId: this.curBankCard.id,
          drawingAmount: this.feeForm.fee,
        };
      } else if (this.tabActive === 'crypto') {
        sendData = {
          methodType: 1,
          cryptoCurrenciesId: this.curBankCard.id,
          drawingAmount: this.feeForm.fee,
          exchangeRate: this.exchangeRate,
        };
      } else {
        sendData = {
          methodType: 2,
          bankCardId: this.curBankCard.id,
          drawingAmount: this.feeForm.fee,
        };
      }

      try {
        const res = await this.$http.withdrawal(sendData);
        this.withdrawalLoading = false;
        this.$refs["feeForm"].resetFields();
        if (res.data.code) return this.messageTip({ message: res.data.msg });
        this.messageTip({ message: "提款成功！" });

        this._getCenterMoney()
        this._getBankCardList(); //- todo
        this._getCryptoList();
        this._getAlipayList();
      } catch (error) {
        console.log(error);
        this.withdrawalLoading = false;
      }
    },
    feeFormSubmit () {
      this.$refs["feeForm"].validate((valid) => {
        if (valid) {
          if (
            !this.bankcardData[this.tabActive] ||
            !this.bankcardData[this.tabActive].length
          ) {
            let msg = this.tabActive === 'rmb' ? '请先添加银行卡！' : this.tabActive === 'crypto' ? '请先添加虚拟货币钱包！' : '请先添加支付宝！'
            return this.messageTip({ message: msg });
          }
          if (this.userInfo.available === 2) {
            return this.messageTip({ message: "余额已冻结，不能申请取款！" });
          }
          if (this.centerMoney <= 0) {
            return this.messageTip({ message: "你的账户余额不足，无法申请提款！" });
          }
          if (!this.curBankCard.id) {
            return this.messageTip({ message: "请先选择提现方式！" });
          }
          this._handleWithdrawal()
        }
      });
    },
    validateFee (rule, value, callback) {
      var withdrawalCond = this.withdrawalCond;
      if (withdrawalCond) {
        if (
          value < this.minAmount ||
          value > this.maxAmount
        ) {
          callback(new Error("取款金额不符合单笔取款限额"));
        } else if (value > (this.isPassed ? this.centerBalanceMoney : 0)) {
          callback(new Error("可提现金额不足"));
        } else {
          callback();
        }
      }
    }
  },
  computed: {
    ...mapState({
      bankcardData: state => state.user.bankcardData,
      userInfo: state => state.user.userInfo,
      centerBalanceMoney: state => state.user.centerBalanceMoney
    }),
    minAmount () {
      const { lowQuota = '', lowUsdt = '', lowAlipayQuota = '' } = this.withdrawalCond || {}
      return this.tabActive === 'rmb' ? lowQuota : this.tabActive === 'crypto' ? lowUsdt : lowAlipayQuota
    },
    maxAmount () {
      const { topQuota = '', topUsdt = '', topAlipayQuota = '' } = this.withdrawalCond || {}
      return this.tabActive === 'rmb' ? topQuota : this.tabActive === 'crypto' ? topUsdt : topAlipayQuota
    },
    feePlaceholder () {
      return `最低${this.minAmount}元，最高${this.maxAmount}元`
    },
    userGetMoney () {
      return (this.feeForm.fee / this.exchangeRate).toFixed(2);
    },
    centerMoney () {
      return this.userInfo.available !== 2 ? this.centerBalanceMoney : 0.0;
    },

  },
  mounted () {
    console.log(this.withdrawalCond)
  }
}
</script>

<style lang="scss" scoped>
@import "../css/WithdrawalForm.scss";
</style>