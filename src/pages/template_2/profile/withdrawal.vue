<template>
  <div :class="['withdrawal-container', site]">
    <div class="box">
      <CenterWallet />
    </div>
    <!-- 切换组件 -->
    <!-- <div class="withdrawal-bg"> -->
    <div class="withdrawal_tab-container">
      <div
        v-if="userState.alipayEnable"
        :class="['tab-list', tabActive === 'alipay' && 'on']"
        @click="tabActive = 'alipay'">
        <img
          class="alipay-img"
          :src="useImgPath(`profile/withdrawal_${tabActive !== 'alipay' ? 'alipay' : 'alipay_on'}.png`)" />
        <span class="text">{{ $t_c('支付宝') }}</span>
      </div>

      <div
        :class="{ 'tab-list': true, on: tabActive === 'crypto' }"
        v-if="userState.crFlag"
        @click="tabActive = 'crypto'">
        <img
          class="currency-img"
          :src="useImgPath(`profile/withdrawal_${tabActive !== 'crypto' ? 'currency' : 'currency_on'}.png`)" />
        <span class="text">{{ $t_c('加密货币') }}</span>
      </div>

      <div
        :class="{ 'tab-list': true, on: tabActive === 'rmb' }"
        @click="tabActive = 'rmb'"
        v-if="userState.cnyWithdrawEnable">
        <img class="rmb-img" :src="useImgPath(`profile/withdrawal_${tabActive !== 'rmb' ? 'rmb' : 'rmb_on'}.png`)" />
        <span class="text">{{ $t_c('法定货币') }}</span>
      </div>

      <div
        v-if="userState.eMoneyPayWithdrawEnable"
        :class="{ 'tab-list': true, on: tabActive === 'ePay' }"
        @click="tabActive = 'ePay'">
        <img class="rmb-img" :src="useImgPath(`profile/withdrawal_${tabActive !== 'ePay' ? 'rmb' : 'rmb_on'}.png`)" />
        <span class="text">{{ $t_c('电子钱包') }}</span>
      </div>

      <div v-if="userState.ebPayWithdrawEnable || userState.toPayWithdrawEnable || userState.goPayWithdrawEnable"
        :class="{'tab-list':true,'on':tabActive==='otherpay'}"
        @click="tabActive='otherpay'">
        <img class="rmb-img" :src="useImgPath(`profile/withdrawal_${tabActive !== 'otherpay' ? 'rmb' : 'rmb_on'}.png`)" />
        <span class="text">{{ $t_c('其他钱包') }}</span>
      </div>
    </div>

    <div class="withdrawal-wrapper">
      <div
        class="warning-box"
        v-if="withdrawLimit.need"
        @click="$router.push('/profile/baseInfo')">
        <img class="warning" :src="useImgPath('profile/withdrawal_warning.jpg')" alt="" />
        <span class="error">{{ $t_c('操作失败') }}</span>
        <div class="tip">
          {{ withdrawLimit.text }}
        </div>
      </div>

      <template v-else>
        <!-- 取款表单 -->
        <withdrawal-form
          :isPassed="isPassed"
          :withdrawalCond="withdrawalCond"
          :depositResidueValidBet="depositResidueValidBet"
          :depositValidBet="depositValidBet"
          :tabActive="tabActive"
          :exchangeRate="exchangeRate"></withdrawal-form>

        <div class="content-title">
          <div class="title">{{ $t_c('选择提现方式') }}</div>
          <div class="wallet-num">
            <span v-if="tabActive === 'rmb'">{{ $t_c('银行卡') }}：{{ userState.bankcardData.rmb.length }}/5</span>
            <span class="cry" v-if="tabActive === 'crypto'">
              {{ $t_c('加密货币钱包') }}：{{ userState.bankcardData.crypto.length }}
            </span>
            <span v-if="tabActive === 'alipay'"
              >{{ $t_c('支付宝钱包') }}：{{ userState.bankcardData.alipay.length }}
            </span>
            <span v-if="tabActive === 'ePay'">{{ $t_c('电子钱包') }}：{{ userState.bankcardData.ePay.length }} </span>
          </div>
        </div>
        <bank-card-manage
          :crFlag="userState.crFlag"
          :alipayEnable="userState.alipayEnable"
          :tabActive="tabActive"
          :bankcardData="userState.bankcardData"
          :isWallet="false"></bank-card-manage>
      </template>
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts" setup>
import CenterWallet from './component/CenterWallet.vue';
import WithdrawalForm from './component/withdrawal/WithdrawalForm.vue';
import BankCardManage from './component/bankCard/BankCardManage.vue';
// import { useUserState, useGlobalState } from '@/stores';
import { api } from '@/api';
import { useImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';

const site = useSite();
const userState = useUserState();
const isPassed = ref<boolean>(true);
const tabActive = ref<string>('rmb');
const depositValidBet = ref<number>(0); //- 流水金额
const depositResidueValidBet = ref<number>(0); //- 完成金额
const globalState = useGlobalState();
let withdrawLimit = reactive({ text: '', need: false })

onMounted(() => {
  userState.checkUserConditions('withdraw').then((data => {
    withdrawLimit.need = data.need
    init();
  })).catch(data => {
    withdrawLimit.text = data.text
    withdrawLimit.need = data.need
  })
});

const init = () => {
  userState._searchCrFlagType();
  _isWithdrawal();
  _getUserExchangeRate(); //- 获取参考汇率
  _withdrawalCond(); //- 取款限额
};

const _isWithdrawal = async () => {
  const res = await api.bank.isWithdrawal();
  if (res.code) return;
  isPassed.value = res.data.isPassed;
  userState.$patch(state => {
    state.alipayEnable = !!res.data.alipayEnable;
    state.cnyWithdrawEnable = !!res.data.cnyWithdrawEnable;
    state.ebPayWithdrawEnable = !!res.data.ebPayWithdrawEnable;
    state.toPayWithdrawEnable = !!res.data.toPayWithdrawEnable;
    state.ecnyWithdrawEnable = !!res.data.ecnyPayWithdrawEnable;
  });

  if (userState.alipayEnable) tabActive.value = 'alipay';
  if (!isPassed.value) {
    depositValidBet.value = res.data.depositValidBet;
    depositResidueValidBet.value = res.data.completedValidBet;
  }
};

const exchangeRate = ref<number>(0);
const _getUserExchangeRate = async () => {
  const res = await api.deposit.getUserExchangeRate();
  if (res.code) return;
  exchangeRate.value = Number(res.msg);
};

const withdrawalCond = reactive<BankAPI.WithdrawalCondData>({} as BankAPI.WithdrawalCondData);
const _withdrawalCond = async () => {
  const res = await api.bank.withdrawalCond();
  if (res.code === 0 && res.withdrawalCond) {
    Object.assign(withdrawalCond, res.withdrawalCond);
  }
};
</script>

<style lang="scss" scoped>
.box {
  background-color: var(--u_m_1);
  margin: 20px;
  border-radius: 10px;
  padding: 0 20px;
}

.withdrawal_tab-container {
  @include flex(flex-start);
  height: 50px;
  line-height: 50px;
  padding-left: 44px;

  .tab-list {
    @include flex(center, row, nowrap, center);
    position: relative;
    cursor: pointer;
    margin-right: 100px;
    font-weight: 500;

    .rmb-img {
      width: 15px;
    }

    .currency-img {
      width: 15px;
    }

    .alipay-img {
      width: 16px;
    }

    .text {
      margin-left: 7px;
      color: var(--u_m_3);
    }

    &:last-child {
      margin-right: 0;
    }
    &.on {
      .text {
        color: var(--u_m_2);
      }

      &:after {
        display: flex;
        content: '';
        position: absolute;
        width: 93px;
        height: 3px;
        bottom: 0;
        left: 0;
        background: var(--u_m_2);
        border-radius: 4px 4px 0 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}

.withdrawal-wrapper {
  margin: 0 20px 20px;
  padding: 20px 20px 28px;
  // background-color: var(--u_m_1);
  border-radius: 10px;
  min-height: 431px;
  box-sizing: border-box;

  .warning-box {
    // width: 340px;
    // height: 106px;
    width: auto;
    box-sizing: border-box;
    margin: 126px auto 151px;
    background-color: var(--u_m_4);
    border-radius: 10px;
    box-shadow: var(--u_m_6);
    @include flex(center, column);
    cursor: pointer;
    font-size: 14px;
    padding: 15px 0;

    .warning {
      width: 18px;
      height: 18px;
      margin-bottom: 10px;
    }
    .error {
      margin-bottom: 14px;
      color: var(--u_m_5);
      font-weight: 500;
    }
    .tip {
      color: var(--u_m_3);
      text-align: center;
    }
  }
}

.content-title {
  margin-top: 40px;
  @include flex();
  border-bottom: 1px solid var(--u_w_3);
  padding-bottom: 15px;

  .title {
    font-weight: 600;
    font-size: 18px;
    color: var(--u_w_1);
  }

  .wallet-num {
    color: var(--u_w_11);
    font-size: 12px;

    span {
      margin: 0 12px;
    }
  }
}

.withdrawal-container {
  &.template_2_002 {
    .tab-list.on {
      .text {
        background: linear-gradient(135deg, #33d6fc 0%, #127dfe 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
      &:after {
        background: linear-gradient(135deg, #33d6fc 0%, #127dfe 100%) !important;
      }
    }
    .warning-box {
      background: linear-gradient(180deg, #202837 0%, #441844 100%, #441844 100%);
      border: 1px solid #ff00f3;
      box-shadow: none;
      .error {
        color: #fff;
      }
      .tip {
        color: #b1b7ca;
      }
    }
  }
}
</style>
