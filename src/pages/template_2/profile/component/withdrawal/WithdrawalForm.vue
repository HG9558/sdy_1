<template>
  <div :class="['withdrawal_form_container', site]">
    <div class="money-notice">
      <div class="money-notice-text">
        <span>{{ $t_c('提现金额') }}</span>

        <div class="masker-container" v-if="!isPassed">
          <el-icon>
            <WarningFilled class="warning" />
          </el-icon>
          <span class="text">{{ $t_c('查看未完成流水') }}</span>
          <div class="notice-msg">
            {{ $t_c('提现所需有效投注总流水为') }}{{ depositValidBet }}{{ envState.vite_currency_map.value }}，{{
              $t_c('已完成')
            }}{{ depositResidueValidBet }}{{ envState.vite_currency_map.value }}。{{ $t_c('请继续加油!') }}
          </div>
        </div>

        <div class="money-notice" v-else>{{ feePlaceholder }}</div>
      </div>

      <div class="notice-number" v-if="Object.keys(withdrawalCond).length && withdrawalCond.feeAvailable === 1">
        <div class="mini">
          {{ $t_c('今日提现次数：') }}{{ withdrawalCond.withDrawalTimesMbr || 0 }}/{{
            withdrawalCond.withDrawalTimes || 0
          }}
        </div>
        <div class="mini right">
          {{ $t_c('提现金额：') }}{{ withdrawalCond.withDrawalQuotaMbr || 0 }}/{{ withdrawalCond.withDrawalQuota || 0 }}
        </div>
      </div>
    </div>

    <div class="fee-form">
      <el-form :model="feeForm" :rules="feeFormRules" ref="feeFormRef">
        <el-form-item prop="fee" class="fee">
          <el-input
            class="money-form"
            :clearable="true"
            :placeholder="`${$t_c('最低')} ${minAmount}${envState.vite_currency_map.value}，${$t_c(
              '最高'
            )} ${maxAmount}${envState.vite_currency_map.value}`"
            v-model.number="feeForm.fee"
            oninput="value=value.replace(/[^0-9]/g,'')"
            type="text"
          ></el-input>
          <el-button class="fee-submit" :disabled="!isPassed" @click="feeFormSubmit" :loading="withdrawalLoading">
            {{ $t_c('确认提现') }}</el-button
          >
          <span class="money-limit-txt ml-10"
            >{{ $t_c('可提现金额：') }}{{ !isPassed ? 0 : userState.centerBalanceMoney
            }}{{ envState.vite_currency_map.value }}，{{ $t_c('不包括游戏平台未转出余额') }}</span
          >
        </el-form-item>
      </el-form>

      <div class="virtual-text-container" v-if="tabActive === 'crypto'">
        {{ $t_c('当前参考汇率：') }} 1 USDT ≈ {{ exchangeRate }} {{ envState.vite_currency_map.value }} <br />{{
          $t_c('预计到账金额：')
        }}{{ userGetMoney }} USDT
      </div>
<!--      <div class="alipay-tip" v-if="tabActive === 'alipay'">-->
<!--        {{ $t_c('我司已于支付宝方达成交易保证金的协议，服务费3%，极速出款无需等待') }}-->
<!--      </div>-->

      <div class="tip">
        {{
          $t_c(
            '温馨提示：请您在相关注单结算完成后耐心等待10-15分钟后系统会自动校正有效流水。详细有效流水规则如有疑问请咨询'
          )
        }}
        <span class="service" @click="gotoChat">{{ $t_c('【在线客服】') }}</span
        >,{{ $t_c('感谢您的支持与信任！') }}
      </div>
    </div>
    <selfDialog
      :dialogTitle="$t_c('提示')"
      v-model:isShow="needPwd.show"
      :width="500"
      :showCancel="false"
      :showConfirm="false"
      @close="needPwd.form.securePwd = ''">
      <el-form
        ref="payPwd"
        :model="needPwd.form"
        label-width="100px"
      >
        <el-form-item
          :label="$t_c('支付密码')"
          prop="securePwd"
          :rules="[
            { required: true, message: $t_c('请输入支付密码') },
          ]"
        >
          <el-input
            v-model.number="needPwd.form.securePwd"
            :placeholder="$t_c('请输入支付密码')"
          />
        </el-form-item>
      </el-form>
      <div class="btn_wrapper">
        <el-button
          class="add-bank-card-btn"
          :loading="needPwd.loading"
          @click="needPwd.submit(payPwd)"
          width="250"
          height="36"
          >{{ $t_c('确认') }}</el-button
        >
      </div>
    </selfDialog>
  </div>
</template>

<script lang="ts" setup>
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
import { api } from '@/api';
import useProxy from '@/hook/useCurrentInstance';
import useDialog from '@/hook/useDialog';
import { useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
// import { useEnvState, useGlobalState, useNormalState, useUserState } from '@/stores';
import type { FormInstance } from 'element-plus';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const site = useSite();
const userState = useUserState();
const normalState = useNormalState();
const globalState = useGlobalState();
const feeFormRef = ref<FormInstance>();
const { messageTip } = useDialog();
const proxy = useProxy();
const router = useRouter();
const envState = useEnvState();
const payPwd = ref()

const props = defineProps<{
  withdrawalCond: BankAPI.WithdrawalCondData;
  isPassed: boolean;
  depositValidBet: number;
  depositResidueValidBet: number;
  tabActive: string;
  exchangeRate: number;
}>();

const needPwd = reactive({
  show: false,
  loading: false,
  form: {
    securePwd: ''
  },
  async submit(v: any) {
    if (!v) return
    v.validate((ok: any) => ok && _handleWithdrawal())
  }
})

const withdrawalLoading = ref<boolean>(false);
const feeForm = reactive({ fee: '' }); //充值数值

const feeFormRules = {
  fee: [
    { required: true, message: lang('请输入取款金额'), trigger: 'change' },
    {
      validator: (_: any, value: string, callback: Function) => {
        if (Object.keys(props.withdrawalCond).length) {
          if (+value < (minAmount.value as number) || +value > (maxAmount.value as number)) {
            callback(new Error(lang('取款金额不符合单笔取款限额')));
          } else if (+value > (props.isPassed ? userState.centerBalanceMoney : 0)) {
            callback(new Error(lang('可提现金额不足')));
          } else {
            callback();
          }
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
};

const curBankCard = reactive<
  BankAPI.BankCard | BankAPI.CryptoCurrency | BankAPI.ailpayAccountListBankCard | BankAPI.ECNYListBankCard
>({} as BankAPI.BankCard | BankAPI.CryptoCurrency | BankAPI.ailpayAccountListBankCard | BankAPI.ECNYListBankCard);
onMounted(() => {
  _getActivityData();
  Object.assign(curBankCard, userState.bankcardData[props.tabActive][0]);
});

const actData = reactive<couponsAPI.ActivityDataList>({} as couponsAPI.ActivityDataList);
const _getActivityData = async () => {
  const res = await api.coupons.getActivityList({
    discount: 1,
    pageSize: 100,
    pageNo: 1,
    buttonShow: -1,
  });
  if (res.code) return;
  const tempData = res.page.list.find(item => item.tmplCode === 'AQ0000030');
  if (tempData) Object.assign(actData, tempData);
};

const _handleWithdrawal = async () => {

  let sendData: BankAPI.withdrawalParams;

  switch (props.tabActive) {
    case 'rmb':
      sendData = {
        bankCardId: curBankCard.id,
        drawingAmount: +feeForm.fee,
      };
      break;
    case 'ePay':
      sendData = {
        bankCardId: curBankCard.id,
        drawingAmount: +feeForm.fee,
        methodType: 7,
      };
      break;
    case 'otherpay':
      sendData = {
        bankCardId: curBankCard.id,
        drawingAmount: +feeForm.fee,
        methodType: 3,
      };
      break;
    case 'crypto':
      sendData = {
        methodType: 1,
        cryptoCurrenciesId: curBankCard.id,
        drawingAmount: +feeForm.fee,
        exchangeRate: props.exchangeRate,
      };
      break;
    default:
      sendData = {
        methodType: 2,
        bankCardId: curBankCard.id,
        drawingAmount: +feeForm.fee,
      };
      break;
  }
  const { withdraw } = userState.sysConditions
  const { securePwd } = userState.userInfo
  const isNeedPwd = withdraw && withdraw.includes(5)
  if (isNeedPwd) {
    if (!securePwd) {
      setTimeout(() => {
        proxy.$_dialog.show({
          isShow: true,
          dialogTitle: lang('温馨提示'),
          content: lang('前往设置支付密码?'),
          confirmTxt: lang('设置支付密码'),
          cancelTxt: lang('取消'),
          clickCallback() {
            router.push('/profile/baseInfo')
          },
        })
      }, 100)
      return
    }
    const { securePwd: _securePwd } = needPwd.form
    if (!_securePwd) {
      return needPwd.show = true
    }
    sendData.pwd = _securePwd
  }
  withdrawalLoading.value = true;
  try {
    const res = await api.bank.withdrawal(sendData);
    withdrawalLoading.value = false;
    feeFormRef.value?.resetFields();
    messageTip({ message: res.msg });
    if (res.code) return;
    userState._getCenterMoney();
    userState._getBankCardList(); //- todo
    userState._getCryptoList();
    userState._getAlipayList();
  } catch (error) {
    console.log(error);
    withdrawalLoading.value = false;
  }
};

const feeFormSubmit = () => {
  feeFormRef.value?.validate(valid => {
    if (valid) {
      if (!userState.bankcardData[props.tabActive] || !userState.bankcardData[props.tabActive].length) {
        let msg =
          props.tabActive === 'rmb'
            ? lang('请先添加银行卡！')
            : props.tabActive === 'crypto'
            ? lang('请先添加虚拟货币钱包！')
            : props.tabActive === 'otherpay'
            ? lang('请先添加钱包！')
            : props.tabActive === 'ePay'
            ? lang('请先添加电子钱包！')
            : lang('请先添加支付宝！');
        return messageTip({ message: msg });
      }
      if (userState.userInfo.available === 2) {
        return messageTip({ message: lang('余额已冻结，不能申请取款！') });
      }
      if (centerMoney.value <= 0) {
        return messageTip({ message: lang('你的账户余额不足，无法申请提款！') });
      }
      if (!Object.keys(curBankCard).length) {
        return messageTip({ message: lang('请先选择提现方式！') });
      }
      if (Object.keys(actData).length && Date.now() < new Date(actData.useEnd).getTime()) {
        proxy.$_dialog.show({
          isShow: true,
          content: lang('您当前可以领取余额返利彩金，是否领取？'),
          dialogTitle: lang('转账提示'),
          confirmTxt: lang('领取'),
          cancelTxt: lang('放弃'),
          async clickCallback(): Promise<any> {
            normalState.set_link_data({
              bannerLink: true,
              id: actData.catId,
              activityId: actData.id,
            });
            router.push('/discount');
          },
          cancelCallback() {
            _handleWithdrawal();
          },
          isBtnLoading: true,
        });
      } else {
        _handleWithdrawal();
      }
    }
  });
};

const gotoChat = () => {
  window.open(globalState.stationSetting.configCodePc, '_blank');
};

const minAmount = computed(() => {
  const { lowQuota = '', lowUsdt = '', lowAlipayQuota = '' } = props.withdrawalCond || {};
  return ['rmb', 'ePay', 'otherpay'].includes(props.tabActive) ? lowQuota : props.tabActive === 'crypto' ? lowUsdt : lowAlipayQuota;
});

const maxAmount = computed(() => {
  const { topQuota = '', topUsdt = '', topAlipayQuota = '' } = props.withdrawalCond || {};
  return ['rmb', 'ePay', 'otherpay'].includes(props.tabActive) ? topQuota : props.tabActive === 'crypto' ? topUsdt : topAlipayQuota;
});

const feePlaceholder = computed(() => {
  return `${lang('最低')} ${minAmount.value}${envState.vite_currency_map.value}，${lang('最高')} ${maxAmount.value}${
    envState.vite_currency_map.value
  }`;
});

const userGetMoney = computed(() => {
  return (+feeForm.fee / props.exchangeRate).toFixed(2);
});

const centerMoney = computed(() => {
  return userState.userInfo.available !== 2 ? userState.centerBalanceMoney : 0.0;
});

watch(
  () => props.tabActive,
  val => {
    feeFormRef.value?.resetFields();
    if (
      val === 'crypto' &&
      (userState.bankcardData[val][0].available == 0 || userState.bankcardData[val][0].available == 2)
    ) {
      Object.keys(curBankCard).forEach(key => delete curBankCard[key]);
    } else {
      Object.keys(curBankCard).forEach(key => delete curBankCard[key]);
      Object.assign(curBankCard, userState.bankcardData[val][0]);
    }
  }
);
</script>

<style lang="scss" scoped>
.withdrawal_form_container {
  .money-notice {
    font-size: 14px;
    @include flex(space-between);
    .money-notice-text {
      @include flex(flex-start);
      span:first-child {
        font-size: 18px;
        font-weight: 600;
        color: var(--u_m_7);
      }
      .masker-container {
        margin-left: 10px;
        position: relative;
        @include flex(flex-start);
        cursor: pointer;
        .warning {
          color: #ff0008;
        }
        .text {
          color: var(--u_m_3);
          &:hover ~ .notice-msg {
            display: block;
          }
        }
        .notice-msg {
          display: none;
          position: absolute;
          top: -6px;
          left: 120px;
          color: #fff;
          border-radius: 5px;
          padding: 5px;
          white-space: nowrap;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1000;
        }
      }

      .money-notice {
        margin-left: 10px;
        // color: $ft-f6;
      }
    }

    .notice-number {
      @include flex();
      color: var(--u_m_5);

      .right {
        margin: 0 24px 0 10px;
      }
    }
  }

  :deep(.el-input__wrapper) {
    height: 40px;
    border-radius: 8px;
  }

  .fee-form {
    margin-top: 20px;

    .fee {
      :deep(.el-form-item__content) {
        @include flex(flex-start);

        .money-form {
          width: 250px;
        }

        .fee-submit {
          height: 40px;
          color: var(--u_m_4);
          background: var(--u_m_7);
          margin-left: 24px;
          border-radius: 8px;
        }
      }
    }

    .virtual-text-container {
      font-size: 14px;
      margin: 0 0 10px 0;
      color: var(--u_m_5);
    }

    .alipay-tip {
      color: var(--u_m_5);
    }

    .tip {
      color: var(--u_m_5);
      font-size: 14px;

      .service {
        color: var(--u_m_2);
        cursor: pointer;
      }
    }

    .money-limit-txt {
      color: var(--u_m_5);
      line-height: 1.1;
    }
  }
}

//- 002
.withdrawal_form_container {
  &.template_2_002 {
    .money-notice-text {
      span:first-child {
        color: #fff;
      }
      .money-notice {
        color: #878ea6;
      }
    }
    :deep() {
      .el-input__wrapper {
        background: #161e2b;
        border: none !important;
        padding-left: 10px !important;
        .el-input__inner {
          color: #878ea6;
        }
      }
      .fee-submit {
        background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%) !important;
        border: none;
      }
    }
    .money-limit-txt {
      color: #878ea6;
    }
    .tip {
      color: #fff;
    }
  }
  .btn_wrapper {
    @include flex(center);
    .add-bank-card-btn {
      width: 140px;
      height: 50px;
      font-weight: 500;
      font-size: 16px;
      margin: 20px auto 0px;
      border-radius: 10px;
      background: var(--u_w_16);
      color: var(--u_w_17);
    }
  }
}
</style>
