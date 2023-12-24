<template>
  <div class="form-container">

    <div class="money-notice">
      <div class="money-notice-text">
        <span>{{$t('提现金额')}}</span>

        <div class="masker-container" v-if="!isPassed">
          <i class="el-icon-warning warning"></i>
          <span class="text">{{$t('查看未完成流水')}}</span>
          <div class="notice-msg">
            {{$tt('withdrawWater', { depositValidBet, depositResidueValidBet })}}
          </div>
        </div>

        <div class="money-notice" v-else>{{feePlaceholder}}</div>
      </div>

      <div class="notice-number" v-if="withdrawalCond && withdrawalCond.feeAvailable === 1">
        <div class="mini">
					{{$t('今日提现次数：')}}{{ withdrawalCond.withDrawalTimesMbr || 0 }}/{{
          withdrawalCond.withDrawalTimes || 0
          }}
        </div>
        <div class="mini right">
					{{$t('提现金额：')}}{{ withdrawalCond.withDrawalQuotaMbr || 0 }}/{{
          withdrawalCond.withDrawalQuota || 0
          }}
        </div>
      </div>
    </div>

    <div class="fee-form">
      <el-form class="bog" :model="feeForm" :rules="feeFormRules" ref="feeForm">
        <el-form-item prop="fee" class="fee">
          <el-input class="money-form" :clearable="true" :placeholder="`${$t('最低')} ${minAmount}${$tt('currencyValue')}，${$t('最高')} ${maxAmount}${$tt('currencyValue')}`" v-model.number="feeForm.fee" type="number" step = "0.1"></el-input>
          <el-button class="bog fee-submit" :disabled="!isPassed" @click="feeFormSubmit" :loading="withdrawalLoading">{{$t('确认提现')}}</el-button>
          <span class="ml-10" style="line-height: normal;">
            {{$tt('canBeWithdrawn', { count: (!isPassed ?  0 : centerBalanceMoney) })}}
          </span>
        </el-form-item>
      </el-form>
      <div class="alipay-tip" v-if="tabActive==='alipay'">{{$t('我司已于支付宝方达成交易保证金的协议，服务费3%，极速出款无需等待')}}</div>

      <div class="virtual-text-container" v-if="tabActive==='crypto'">
        <p style="margin-bottom: 8px">{{$t('USDT提现到账金额，以下方“预计到账金额”为参考，以实际到账为准')}}</p>
        {{$t('当前参考汇率：')}}1 USDT ≈ {{ exchangeRate }} {{$tt('currencyValue')}} {{$t('预计到账金额：')}}{{ userGetMoney }} USDT
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
  created () {
    this._getActivityData();
    this._getElecList();
  },
  data () {
    return {
      withdrawalLoading: false,
      feeForm: {
        fee: null, //充值数值
      },
      feeFormRules: {
        fee: [
          { required: true, message: this.$t('请输入取款金额'), trigger: "blur" },
          { type: "number", message: this.$t('请输入取款金额') },
          { validator: this.validateFee, trigger: ["blur", "change"] },
        ]
      },
      curBankCard: {},
      actData: null,
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
    ...mapMutations('normal', ['set_link_data']),
    async _getActivityData () {
      const data = {
        discount: 1,
        pageSize: 100,
        pageNo: 1,
        buttonShow: -1,
      };
      this.$http.getActivityList(data).then((res) => {
        if (res.data.code === 0) {
          this.actData = res.data.page.list.find(item => item.tmplCode === "AQ0000030");
        }
      });
    },
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
      } else if (this.tabActive === "elec") {
        sendData = {
          methodType: 7,
          bankCardId: this.curBankCard.id,
          drawingAmount: this.feeForm.fee,
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
        this.messageTip({ message: this.$t('提款成功！') });

        this._getCenterMoney()
        this._getBankCardList(); //- todo
        this._getCryptoList();
        this._getAlipayList();
        this._getElecList();
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
            let msg = this.tabActive === 'rmb' ? this.$t('请先添加银行卡！') : this.tabActive === 'crypto' ? this.$t('请先添加虚拟货币钱包！') : this.$t('请先添加支付宝！')
            return this.messageTip({ message: msg });
          }
          if (this.userInfo.available === 2) {
						return this.messageTip({ message: this.$t('余额已冻结，不能申请取款！') });
					}
          if (this.centerMoney <= 0) {
						return this.messageTip({ message: this.$t('你的账户余额不足，无法申请提款！') });
					}
          if (!this.curBankCard.id) {
            return this.messageTip({ message: this.$t('请先选择提现方式！') });
          }
          if (this.actData != null && Date.now() < new Date(this.actData.useEnd).getTime()) {
            this.openConfirmDialog({
              content: [this.$t('您当前可以领取余额返利彩金，是否领取？')],
              cancelButtonText: this.$t('放弃'),
              confirmButtonText: this.$t('领取'),
              callback: () => {
                this.set_link_data({ bannerLink: true, id: this.actData.catId, activityId: this.actData.id })
                this.$router.push('/discount');
              },
              cancelFn: () => this._handleWithdrawal()
            })
          } else {
            this._handleWithdrawal();
          }
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
          callback(new Error(this.$t('取款金额不符合单笔取款限额')));
        } else if (value > (this.isPassed ? this.centerBalanceMoney : 0)) {
					callback(new Error(this.$t('可提现金额不足')));
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
      return (this.tabActive === 'rmb' || this.tabActive === 'elec') ? lowQuota : this.tabActive === 'crypto' ? lowUsdt : lowAlipayQuota
    },
    maxAmount () {
      const { topQuota = '', topUsdt = '', topAlipayQuota = '' } = this.withdrawalCond || {}
      return (this.tabActive === 'rmb' || this.tabActive === 'elec') ? topQuota : this.tabActive === 'crypto' ? topUsdt : topAlipayQuota
    },
    feePlaceholder () {
      return `${this.$t('最低')} ${this.minAmount}${this.$tt('currencyValue')}，${this.$t('最高')} ${this.maxAmount}${this.$tt('currencyValue')}`
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
