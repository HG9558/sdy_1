<template>
  <div class="top-div">
    <center-wallet @changeLoadingStatus="changeLoadingStatus" @updateGameData="updateGameData" />
    <div class="no-data-container" v-show="!showLoading && !Object.values(gameData).length">
      <empty />
      <div class="no-data-txt">{{ $t_c('还没有任何场馆余额') }} <br />{{ $t_c('投注后即可查看各场馆余额') }}</div>
    </div>
    <div class="no-data-gif">
      <SelfLoading :showLoading="showLoading"></SelfLoading>
    </div>
  </div>
  <!-- //银行卡管理 -->
  <div class="wallet-withdraw">
    <div class="content-title">
      <div class="title">
        {{ $t_c('选择提现方式') }}
      </div>
      <div class="wallet-num">
        <span>{{ $t_c('银行卡') }}：{{ userState.bankcardData.rmb.length }}/5</span>
        <span class="cry" v-if="userState.crFlag">
          {{ $t_c('加密货币钱包') }}：{{ userState.bankcardData.crypto.length }}
        </span>
        <span>{{ $t_c('支付宝钱包') }}：{{ userState.bankcardData.alipay.length }}</span>
        <span>{{ $t_c('电子钱包') }}：{{ userState.bankcardData.ePay.length }}</span>
      </div>
    </div>

    <div
      v-if="withdrawLimit.need"
      class="warning-box"
      @click="$router.push('/profile/baseInfo')">
      <img class="warning" :src="useImgPath('profile/withdrawal_warning.jpg')" alt="" />
      <span class="error">{{ $t_c('操作失败') }}</span>
      <div class="tip">
        {{ withdrawLimit.text }}
      </div>
    </div>
    <bank-card-manage
      v-else
      :crFlag="userState.crFlag"
      :tabActive="tabActive"
      :isWallet="true"
      :bankcardData="userState.bankcardData"
      :alipayEnable="false">
    </bank-card-manage>
  </div>
</template>

<script lang="ts" setup>
import CenterWallet from './component/CenterWallet.vue';
import empty from 'commonComponent/empty/empty.vue';
import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue';
import BankCardManage from './component/bankCard/BankCardManage.vue';
import { useImgPath } from '@/hook/usePath';
// import { useUserState } from '@/stores';
import { reactive, ref } from 'vue';

const tabActive = ref<string>('rmb');
const showLoading = ref<boolean>(true);
const gameData = reactive<BankAPI.gameDataType>({});
const userState = useUserState();

let withdrawLimit = reactive({ text: '', need: false })

onMounted(() => {
  userState.checkUserConditions('withdraw').then((data => {
    withdrawLimit.need = data.need
  })).catch(data => {
    withdrawLimit.text = data.text
    withdrawLimit.need = data.need
  })
});

const changeLoadingStatus = (_: boolean) => {
  showLoading.value = _;
};
const updateGameData = (data: BankAPI.gameDataType) => {
  Object.assign(gameData, data);
};
</script>

<style lang="scss" scoped>
.top-div {
  background: var(--u_w_9);
  border-radius: 10px;
  margin: 20px;
  padding: 20px 20px 10px;
  position: relative;
  .no-data-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .no-data-img {
      width: 98px;
      margin-top: 29px;
    }

    .no-data-txt {
      font-size: 14px;
      margin: 16px 0 40px;
      text-align: center;
      color: var(--u_w_22);
    }
  }
  .no-data-gif {
    text-align: center;
    margin: 30px 0;

    div {
      margin-top: 0 !important;
      align-items: flex-start;
      min-height: 200px;
    }
  }
}
.wallet-withdraw {
  background: var(--u_w_9);
  border-radius: 10px;
  margin: 20px;
  padding: 20px 20px 10px;
  position: relative;

  .content-title {
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
}
.warning-box {
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
</style>
