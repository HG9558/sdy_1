<template>
  <div :class="['cr-pay-container', site]">
    <template v-if="!showLoading && !noData && crChannelList.length">
      <div class="tip border-1">
        {{ $t_c('选择充值通道') }}
        <span class="usdt-txt" v-if="globalState.stationSetting.usdtBuyUrl" @click="hdclick">
          <img :src="useImgPath('profile/deposit_icon-shopcar.svg')" alt="" />
          {{ $t_c('购买USDT币') }}</span
        >
        <!-- <router-link
          to="/usdt_teach"
          class="usdt-txt"
          v-if="globalState.stationSetting.usdtBuyUrl && globalState.language === 'zh'"
          >{{ $t_c('USDT购买教程') }}</router-link
        > -->
        <router-link
          to="/new_usdt_teach"
          class="usdt-txt"
          v-if="globalState.stationSetting.usdtBuyUrl && globalState.language === 'zh'"
          >{{ $t_c('什么是usdt,如何购买?') }}</router-link
        >
      </div>
      <div class="select-pay-container">
        <div
          :class="['select-pay-item', selectIndex === index && 'active']"
          v-for="(item, index) in crChannelList"
          :key="index"
          @click="changeRechargeChannel(item, index)">
          <img :src="item.icoUrl" class="logo" alt="" />
          <div class="pay-name">
            <span class="text">{{ item.label }}</span>
            <span class="number">{{ item.limitLabel }}</span>
          </div>
          <p class="tag" v-if="item.isHot || item.isRecommend">
            <i>{{ item.isHot ? $t_c('热门') : item.isRecommend ? $t_c('推荐') : '' }}</i>
          </p>
          <img
            v-if="selectIndex === index"
            :src="useImgPath('profile/deposit_new_checked.png')"
            class="is-select"
            alt="" />
        </div>
      </div>

      <div class="select-pay-form">
        <div class="tip">
          <span>{{ $t_c('存款金额') }}</span>
        </div>
        <div class="select-box">
          <div class="select-card-container">
            <div
              class="select-item"
              :class="{ active: currentMoneyIndex === index }"
              v-for="(item, index) in recommendList"
              :key="index"
              @click="changeSelectMoney(item, index)">
              {{ item.value }}USDT
            </div>
          </div>

          <div :class="['select-form-container', globalState.language]">
            <el-input v-model.number="money" class="input-money" type="number" :placeholder="feePlaceholder"></el-input>
            <el-button
              :class="['handle-btn', 'btn-deposit', globalState.language]"
              @click="_cyPayDeposit"
              :loading="buttonLoading"
              >{{ $t_c('立即存款') }}</el-button
            >
            <el-button
              :class="['handle-btn ', isRemindIng && 'remindActive', globalState.language]"
              @click="_onRemind"
              >{{ remindText }}</el-button
            >
            <el-button :class="['handle-btn', globalState.language]" @click="$router.push('/help_center')">{{
              $t_c('存款教程')
            }}</el-button>
          </div>

          <div class="select-info">
            <div class="info-item">
              {{
                $t_c(
                  '温馨提示: 请使用您信任的第三方交易所钱包进行转账，本平台不收取任何手续费，最终充值金额以实际到账金额为准！'
                )
              }}
            </div>
            <div v-if="envState.vite_currency_map.type !== 'VN'" class="info-item exchange-num">
              {{ $t_c('当前参考汇率：') }} 1 USDT ≈ {{ exchangeRate }}
              <!-- {{
                envState.vite_currency_map.type === 'AUD' ? envState.vite_currency_map.symbol : envState.vite_currency_map.value
              }} -->
              {{ envState.vite_currency_map.value }}
            </div>
            <div class="info-item get-money">
              {{ $t_c('预计到账金额：') }}{{ userGetMoney }}
              {{
                envState.vite_currency_map[
                  (globalState.language === 'zh' && envState.vite_currency_map.type === 'RMB') ||
                  envState.vite_currency_map.type !== 'RMB'
                    ? 'value'
                    : 'type'
                ]
              }}
            </div>
          </div>
        </div>
      </div>

      <div class="pay-card-list-container">
        <div class="card-title">
          {{ $t_c('可任意选择支持USDT支付的交易所及钱包，例如：') }}
        </div>
        <div class="card-list-wrapper">
          <div class="card-list" v-for="(item, index) in crLogoList" :key="index">
            <div class="card_logo_container">
              <img class="card-logo" :src="item.picpcpath || item.picMbPath" alt="" />
            </div>
            <div class="text">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </template>

    <SelfLoading v-if="showLoading" :showLoading="showLoading" />
    <template v-else>
      <empty-container
        class="empty"
        v-if="noData || !crChannelList.length"
        :txt="$t_c('充值通道维护中')"></empty-container>
    </template>

    <self-dialog
      v-if="crChannelList.length"
      :dialogTitle="`${crChannelList[selectIndex].crName}(${crChannelList[selectIndex].category})`"
      v-model:isShow="showDialog"
      :confirmTxt="$t_c('需要帮助')"
      :cancelTxt="$t_c('已完成充值')"
      @confirmCallback="confirmHandle">
      <div class="cr-pay-dialog">
        <div class="qr-bg">
          <img class="qr-code" :src="`data:image/png;base64,${crPayInfo.qrCode}`" alt="" />
        </div>
        <div class="cr-line">
          <span class="cr-title">{{ $t_c('预计到账金额:') }} </span>
          <span class="cr-value gold"
            >{{ Number(crPayInfo.depositAmountCNY).toLocaleString() }} {{ envState.vite_currency_map.label }}</span
          >
        </div>
        <div class="cr-line">
          <span class="cr-title">{{ $t_c('支付金额：') }}</span>
          <span class="cr-value">{{ crPayInfo.depositAmount }} USDT</span>
        </div>
        <div class="cr-line">
          <span class="cr-title">{{ $t_c('钱包地址：') }}</span>
          <span class="cr-value">{{ crPayInfo.walletAddress }}</span>
          <span class="cr-button" type="primary" @click="copy(crPayInfo.walletAddress)">{{ $t_c('复制') }}</span>
        </div>
        <div class="cr-title tip">{{ $t_c('请使用您的加密货币钱包或交易所平台进行支付') }}</div>
      </div>
    </self-dialog>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { useImgPath, useSite } from '@/hook/usePath';
// import { useEnvState, useGlobalState, useUserState } from '@/stores';
import { computed, onDeactivated, onMounted, reactive, ref, watch } from 'vue';
import { getRecommendList } from 'static_data/deposit_data';
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
import { useClipboard } from '@vueuse/core';
import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue';
import { lang } from '@/i18n';

const site = useSite();
const showLoading = ref<boolean>(true);
const noData = ref<boolean>(false);
const feePlaceholder = ref<string>();
const selectIndex = ref<number>(0);
const currentMoneyIndex = ref<number>(-1);
const exchangeRate = ref<string>();
const buttonLoading = ref<boolean>(false);
const showDialog = ref<boolean>(false);
const isRemindIng = ref<boolean>(false);
const remindText = ref<string>(lang('催单'));
const money = ref<string | number | null>(null);
const { copy, copied } = useClipboard();
const { messageTip } = useDialog();
const crChannelList = reactive<DepositType.CrList[]>([]);
const crLogoList = reactive<DepositType.getCrLogoData[]>([]);
const globalState = useGlobalState();
const userState = useUserState();
const crPayInfo = reactive<DepositType.applyCrPayInfo>({} as DepositType.applyCrPayInfo);
const envState = useEnvState();

onMounted(() => {
  _initCrypto();
});

watch(copied, _ => {
  if (_) messageTip({ message: lang('复制成功！') });
});

//- 初始虚拟币
const _initCrypto = async () => {
  showLoading.value = true;
  try {
    const [crListRes] = await Promise.all([api.deposit.getCrList()]);

    if (crListRes.code) {
      return messageTip({ message: crListRes.msg });
    }

    if (crListRes.crList) {
      crChannelList.length = 0;
      crChannelList.push(
        ...crListRes.crList.map(v => {
          return {
            ...v,
            icoUrl: v.backBankImg,
            label: v.showName,
            limitLabel: `${v.minAmout}-${v.maxAmout || lang('无上限')}`,
          };
        })
      );
      userState.modify_depositLen({ type: 'CrPay', len: crChannelList.length });
      getRate()
    }

    noData.value = !crChannelList.length;
    feePlaceholder.value = crChannelList[selectIndex.value].limitLabel;
    showLoading.value = false;
  } catch (error) {
    console.log(error);
    showLoading.value = false;
    noData.value = true;
  }
  _getCrLog();
};

//- 获取虚拟币显示图标
const _getCrLog = async () => {
  try {
    const res = await api.deposit.getCrLogo();
    if (res.code) return messageTip({ message: res.msg });
    crLogoList.length = 0;
    crLogoList.push(...res.data);
  } catch (error) {
    console.log(error);
  }
};

const hdclick = () => {
  window.open(globalState.stationSetting.usdtBuyUrl);
};

const changeRechargeChannel = (item: DepositType.CrList, index: number) => {
  selectIndex.value = index;
  feePlaceholder.value = item.limitLabel;
  money.value = null;
  currentMoneyIndex.value = -1;
  getRate()
};

const getRate = async () => {
  const { id } = crChannelList[selectIndex.value] || {}
  const exchangeRes = await api.deposit.getExchangeRate({ crId: id })
  if (exchangeRes.code) {
    messageTip({ message: exchangeRes.msg })
    return
  }
  exchangeRate.value = exchangeRes.msg;
}

const recommendList = computed(() => {
  try {
    const arr = feePlaceholder.value?.split('-')
    let Min = Number(arr[0]);
    const Max = arr[1] || 50000;
    return getRecommendList(Min, Max);
  } catch (error) {
    return [];
  }
});

const changeSelectMoney = (item: { value: number }, _: number) => {
  currentMoneyIndex.value = _;
  money.value = item.value;
};

const _cyPayDeposit = async () => {
  if (money.value === 0) return;
  if (!money.value) {
    messageTip({ message: lang('存款金额不能为空') });
    return;
  }
  buttonLoading.value = true;
  try {
    const res = await api.deposit.applyCrPay({
      depositId: crChannelList[selectIndex.value].id,
      fee: +money.value,
      exchangeRate: exchangeRate.value as string,
    });
    buttonLoading.value = false;
    if (res.code) {
      return messageTip({
        message: res.msg,
        onClose: () => {
          // router.push({ path: '/profile' });
        },
      });
    }
    const { info, onlineInfo } = res
    if (info) {
      Object.assign(crPayInfo, info);
      showDialog.value = true;
    }
    if (onlineInfo) {
      const { url } = onlineInfo
      const tempwindow = window.open("_blank");
      (tempwindow as any).document.write(url);
    }
    
  } catch (error) {
    buttonLoading.value = false;
  }
};

const _onRemind = async () => {
  if (isRemindIng.value) {
    return messageTip({ message: lang('请稍后再试') });
  }
  isRemindIng.value = true;
  let wait = 10;
  let time = setInterval(() => {
    if (wait === 0) {
      remindText.value = lang('催单');
      isRemindIng.value = false;
      clearInterval(time);
      return;
    }
    remindText.value = `${lang('催单')}(${wait})`;
    wait--;
  }, 1000);
  const res = await api.deposit.getRemind();
  if (res.code) {
    messageTip({ message: lang('请稍后再试') });
    isRemindIng.value = false;
    clearInterval(time);
    wait = 10;
  }
};

const userGetMoney = computed(() => {
  let amount = (Number(money.value) * Number(exchangeRate.value)).toString();
  const index = amount.indexOf('.');
  if (index !== -1) {
    amount = amount.slice(0, index + 3);
  }
  return Number(amount).toLocaleString();
});

const confirmHandle = () => {
  window.open(userState.serUrl);
};

watch(money, val => {
  currentMoneyIndex.value = recommendList.value.findIndex(
    (item: { label: number; value: number }) => item.value === val
  );
});

onDeactivated(() => {
  money.value = null;
  currentMoneyIndex.value = -1;
  selectIndex.value = 0;
  feePlaceholder.value = crChannelList[selectIndex.value]?.limitLabel;
  noData.value = false;
  showLoading.value = false;
});

const tgBg = `url(${useImgPath('profile/deposit_tag.png')})`;
const cardLogoBg = `url(${useImgPath('profile/deposit_tg_bg.png')})`;
const smCodeBg = `url(${useImgPath('base/login_sm_code_container.png')})`;
</script>

<style scoped lang="scss">
.cr-pay-container {
  padding: 20px 20px;
  min-height: 570px;
  position: relative;
  background-color: var(--u_c_8);
  border-radius: 10px;
  box-shadow: var(--u_c_9);
  .tip {
    padding-bottom: 15px;
    color: var(--u_c_11);
    font-weight: 500;
    font-size: 14px;
    &.border-1 {
      border-bottom: 1px solid var(--u_c_10);
    }

    .usdt-txt {
      color: var(--u_c_11);
      font-size: 14px;
      margin-left: 20px;
      cursor: pointer;

      img {
        vertical-align: middle;
      }
    }
  }

  .select-pay-container {
    margin: 20px 0 26px;
    @include flex(flex-start);

    .select-pay-item {
      @include flex(flex-start);
      position: relative;
      cursor: pointer;
      min-width: 160px;
      padding: 10px;
      margin-right: 53px;
      background: var(--u_c_7);
      border: 0.5px solid var(--u_c_12);
      box-sizing: border-box;
      border-radius: 10px;
      position: relative;

      .tag {
        position: absolute;
        width: 36px;
        height: 33px;
        background-image: v-bind(tgBg);
        background-size: cover;
        top: 0px;
        left: 0px;
        display: flex;
        justify-content: center;
        overflow: hidden;
        border-radius: 5px 0 0 0;
        margin: 0;
        padding: 0;

        i {
          font-style: normal;
          font-size: 12px;
          transform: rotate(-45deg) scale(0.86) translateY(-2px) translateX(-1px);
          color: #fff;
        }
      }

      .logo {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }

      .is-select {
        width: 15px;
        position: absolute;
        top: 6px;
        right: 7px;
        width: 15px;
      }

      .pay-name {
        @include flex(flex-start, column, nowrap, flex-start);
        font-size: 12px;

        .text {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-weight: bolder;
          width: 160px;
        }
      }
    }
  }

  .select-pay-form {
    .tip {
      .text {
        display: inline-block;
        margin-left: 15px;
        font-size: 12px;
        color: #fff;
        background: linear-gradient(to right, #9c080f 0%, #f81823 50%, #9c080f 100%);
        white-space: nowrap;
        height: 20px;
        padding: 0 3px;
        line-height: 20px;
        border-radius: 2px;
      }
    }

    .select-box {
      .select-card-container {
        @include flex(flex-start);
        margin: 0px 0 20px;

        .select-item {
          padding: 10px 22px;
          background-color: var(--u_c_7);
          box-shadow: var(--u_c_13);
          color: var(--u_c_11);
          @include flex(center, row, nowrap, center);
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          font-size: 12px;
          margin-right: 8px;

          &:hover,
          &.active {
            background: var(--u_c_14);
            color: var(--u_c_7);
          }
        }
      }
    }

    .select-form-container {
      @include flex(flex-start, row, nowrap, center);
      margin: 15px 0;

      .input-money {
        margin-right: 10px;
        width: 280px;
        height: 40px;
        border-radius: 8px;

        :deep(.el-input__inner) {
          &::-webkit-input-placeholder {
            color: var(--u_c_11) !important;
          }
        }
      }

      .handle-btn {
        width: 100px;
        border-radius: 6px;
        margin-left: 10px;
        font-size: 12px;
        @include flex(center, row, nowrap, center);
        background: var(--u_c_14);
        color: var(--u_c_7);
        &:not(.zh, .zh_tw) {
          width: auto;
        }

        &.btn-deposit {
          // width: 79px;
        }

        &.remindActive {
          opacity: 0.7;
        }
      }
    }

    .select-info {
      .info-item {
        margin-bottom: 8px;
        color: var(--u_c_3);
      }
    }
  }

  .pay-card-list-container {
    margin: 20px 0 0;
    padding: 0 20px 10px;
    background: var(--u_c_15);
    border-radius: 4px;
    text-align: center;
    color: var(--u_c_16);

    .card-title {
      line-height: 42px;
      padding: 10px 0 0;
    }

    .card-list-wrapper {
      @include flex(flex-start, row, wrap);
      margin: 23px 0 0 0px;
      font-size: 12px;

      .card-list {
        @include flex(flex-start, column);
        margin-bottom: 10px;
        flex-grow: 1;

        .card_logo_container {
          background: v-bind(cardLogoBg);
          width: 48px;
          height: 48px;
          background-size: 100% 100%;
          @include flex(center);
          margin-bottom: 10px;

          .card-logo {
            width: 30px;
            height: 30px;
          }
        }

        .text {
          font-size: 14px;
        }
      }
    }
  }

  .box-no-deposit-rode {
    @include flex(center, column, nowrap, center);
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;

    .rode-text {
      position: relative;
      top: 10px;
      left: -15px;
    }
  }

  .cr-pay-dialog {
    font-size: 15px;
    margin-top: 20px;
    @include flex(center, column, nowrap, center);

    .qr-bg {
      width: 130px;
      height: 130px;
      background-image: v-bind(smCodeBg);
      background-size: 100% 100%;
      @include flex(center);
      margin-bottom: 15px;

      .qr-code {
        width: 125px;
        height: 125px;
      }
    }

    .cr-line {
      margin-top: 5px;
      font-size: 14px;
      font-weight: 600;

      .cr-title {
        color: var(--u_c_17);
        margin-right: 5px;
      }

      .cr-value {
        color: var(--u_c_18);
      }

      .cr-copy {
        width: 13px;
        margin: 0 5px;
      }

      .cr-button {
        margin-left: 5px;
        color: var(--u_c_17);
        cursor: pointer;
      }
    }

    .tip {
      font-size: 14px;
      color: var(--u_c_17);
      margin-top: 14px;
    }
  }

  :deep(.el-dialog__footer) {
    .el-button {
      font-size: 15px;
    }
  }

  .empty {
    min-height: 400px;
  }
}

//- 002
.cr-pay-container {
  &.template_2_002 {
    .select-pay-item {
      background: #3d5477;
      color: #fff;
      border: none;
      &.active {
        border: 1px solid #e8c96f;
      }
    }
    .py-type-list {
      .txt {
        color: #878ea6;
      }
      &.on {
        .txt {
          background: linear-gradient(135deg, #33d6fc 0%, #127dfe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      }
    }
    .circle-outer {
      background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%) !important;
      .circle-inner {
        background-color: #fff;
        border: none;
      }
    }
    .select-item {
      box-shadow: none !important;
      background-color: #3d5477 !important;
      &.active,
      &:hover {
        background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%) !important;
        color: #fff !important;
      }
    }
    :deep() {
      .el-input__wrapper {
        background: #161e2b;
        border: none;
        box-shadow: none;
        .el-input__inner {
          color: #fff;
        }
      }
      .handle-btn {
        background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%) !important;
        color: #fff !important;
        border: none;
      }
    }
    .card-title {
      color: #fff;
    }
    .card_logo_container {
      background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%) !important;
      border-radius: 50%;
      position: relative;
      .card-logo {
        width: 30px;
        height: 30px;
        position: relative;
        z-index: 1;
      }
      &::before {
        position: absolute;
        content: '';
        width: 41px;
        height: 41px;
        background-color: #fff;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .cr-pay-dialog {
      .qr-code {
        width: 110px;
        height: 110px;
      }
    }
    .gold {
      background: linear-gradient(90deg, #fe8e00 0%, #e8c96f 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
}
</style>
