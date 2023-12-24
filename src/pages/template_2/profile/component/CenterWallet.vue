<template>
  <div :class="['center-wallet-container', site]">
    <div class="common-container">
      <div class="center-money-container">
        <img class="wallet-img" :src="useImgPath('profile/wallet_icon.png')" alt="" />
        <div class="money-amonut-container">
          <div>{{ $t_c('中心钱包') }}</div>
          <span>{{ envState.vite_currency_map.symbol }} {{ userState.centerBalanceMoney.toLocaleString() }}</span>
        </div>
      </div>
      <div class="totoal-money-container">
        <div class="top-container">
          <span> {{ $t_c('钱包总金额') }}：</span>
          <span class="totoal-money">
            {{ (totalMoney && totalMoney > 0 && Number(totalMoney.toFixed(2)).toLocaleString()) || '0.00' }}
          </span>
          <el-icon class="reload" @click.stop="_updateBalance">
            <Refresh v-if="!userState.isRefresh" />
            <Loading v-else></Loading>
          </el-icon>
        </div>
        <div class="bottom-handle">
          <div :class="['return-btn', globalState.language]" @click="_recycling">
            {{ $t_c('一键回收') }}
          </div>
          <div class="line"></div>
          <div class="lock-container">
            <img class="icon_lock" :src="useImgPath('profile/wallet_icon_lock.png')" alt="" />
            <div class="text">
              <div>{{ $t_c('锁定钱包') }}</div>
              <div>{{ envState.vite_currency_map.symbol }} {{ lockingMoney }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 只有钱包页面进行展示，其他界面不进行展示 -->
    <div class="game-wallet-container" v-if="$route.name === 'profile-wallet'">
      <div class="game-z-z">
        <div>
          <button :class="['toggle-money', 'auto', globalState.language, isAutoPay && 'on']" @click="setAutoPay">
            {{ $t_c('自动转账') }}
          </button>
        </div>

        <div>
          <button :class="['toggle-money', globalState.language, !isAutoPay && 'on']" @click="setManuPay">
            {{ $t_c('手动转账') }}
          </button>
        </div>
        <div class="money" v-show="!isAutoPay">{{ $t_c('场馆钱包') }}</div>
      </div>

      <!-- 自动转账 -->
      <div v-if="isAutoPay">
        <div class="tip-text">{{ $t_c('进入游戏自动转账，助您省心畅游') }}</div>

        <div class="item-container" v-if="platList.length">
          <div class="collapse_item" v-for="(item, index) in platList.slice(0, 6)" :key="index">
            <div class="title">
              <span class="deport-name">{{ item.titleTag || item.depotName }}</span>
              <i v-if="item.availableWh === 2" class="el-icon-warning warning"></i>
            </div>
            <span class="deport-name-two">{{ item.availableWh === 2 ? $t_c('维护中') : item.moneyBlance }}</span>
          </div>
        </div>
        <template v-if="platList.slice(6).length">
          <el-collapse class="fold-wrapper" v-model="activeNames" :accordion="true">
            <el-collapse-item name="1">
              <div class="collapse_item" v-for="(item, index) in platList.slice(6)" :key="index">
                <div class="title">
                  <span class="deport-name">{{ item.depotName }}</span>
                  <i v-if="item.availableWh === 2" class="el-icon-warning warning"></i>
                </div>
                <span class="deport-name-two">{{ item.availableWh === 2 ? $t_c('维护中') : item.moneyBlance }}</span>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div class="collapse">
            <div class="collapse-toggle" @click="changeActiveName">
              <img
                class="show-more-icon"
                :src="useImgPath(`profile/wallet_${activeNames === '1' ? 'close' : 'open'}.png`)" />
              <span>{{ activeNames === '1' ? $t_c('收起') : $t_c('展开') }}</span>
            </div>
          </div>
        </template>
      </div>

      <!-- 手动转账 -->
      <div v-else>
        <div :class="['game-sport', globalState.language]" v-for="(item, index) in platList" :key="index">
          <div class="game-11">
            <div class="game-sport-one">{{ item.depotName }}</div>
            <!-- <el-tooltip class="game-sport-one-tooltip" :content="item.depotName" placement="top">
            </el-tooltip> -->
            <div>
              <i v-if="item.availableWh === 2" class="el-icon-warning warning"></i>
              {{ item.availableWh === 2 ? $t_c('维护中') : item.moneyBlance }}
            </div>
          </div>
          <div class="game-transfers" v-show="item.availableWh !== 2">
            <div class="transfer-on" @click="toggleIn(item.depotName, item.id, userState.centerBalanceMoney)">
              {{ $t_c('转入') }}
            </div>
            <div class="transfer-out" @click="toggleOut(item.depotName, item.id, item.moneyBlance)">
              {{ $t_c('转出') }}
            </div>
          </div>
        </div>
      </div>
      <!-- 弹窗 -->
      <selfDialog
        v-model:is-show="showDialog"
        :dialogTitle="dialogData.dialogTitle"
        :confirmTxt="$t_c('确认')"
        custom-class="transform-dialog"
        :width="globalState.language === 'vi' ? 560 : 500"
        @confirmCallback="dialogEvent"
        :show-cancel="dialogData.componentName === 'BaseInfoDialog'"
        :show-confirm="dialogData.componentName === 'BaseInfoDialog'">
        <div v-if="dialogData.componentName === 'BaseInfoDialog'" class="dialog-content">
          {{ dialogData.dialogContent }}
        </div>
        <div v-else class="form_dialog">
          <div>{{ $t_c('转账金额') }}:</div>
          <el-form
            :model="moneyData"
            ref="moneyDataRef"
            size="small"
            :rules="
              moneyRule({
                text: dialogData.checkText,
                curMoney: dialogData.dialogContent,
              })
            "
            :class="['flex-form', globalState.language]">
            <el-form-item prop="money">
              <el-input class="money-input" :placeholder="$t_c('请输入金额')" v-model.number="moneyData.money">
                <template #append>
                  <span class="max-money" @click="setMaxMoney">{{ $t_c('最大金额') }}</span>
                </template>
              </el-input>
            </el-form-item>
            <el-button class="self-footer" type="primary" @click="sumbit(moneyDataRef)" :loading="formBtnLoading">{{
              $t_c('立即转账')
            }}</el-button>
          </el-form>
        </div>
      </selfDialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { useImgPath, useSite } from '@/hook/usePath';
// import { useEnvState, useGlobalState, useUserState } from '@/stores';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
import type { FormInstance } from 'element-plus';
import useRuleHook from '@/hook/userRuleHook';
import { lang } from '@/i18n';

const site = useSite();
const emits = defineEmits(['changeLoadingStatus', 'updateGameData']);
const isAutoPay = ref<boolean>(true);
const activeNames = ref<string>('0');
const userState = useUserState();
const gameData = reactive<BankAPI.gameDataType>({});
const showDialog = ref<boolean>(false);
const route = useRoute();
const globalState = useGlobalState();
const { messageTip } = useDialog();
const { moneyRule } = useRuleHook();
const dialogData = reactive({
  dialogTitle: '',
  dialogContent: '',
  componentName: '',
  checkText: '',
  type: '',
  depotId: '',
  loading: false,
});
const curDepotId = ref<number>(0);
const moneyDataRef = ref<FormInstance>();
const formBtnLoading = ref<boolean>(false);
const envState = useEnvState();

//- 获取各个平台信息钱 +  平台名称
const _getPlatInfo = async (type?: string | undefined) => {
  type !== 'update' && emits('changeLoadingStatus', true);
  const res = await api.game.getDepotList();
  if (res.code) return;
  let reqList = await Promise.allSettled(
    res.tGmDepots.map(item => {
      !gameData[item.id] && (gameData[item.id] = item);
      return api.bank.getBalanceData({ depotId: item.id });
    })
  );
  emits('changeLoadingStatus', false);
  const r = reqList
    .filter(isSuccessful)
    .filter(item => item.status === 'fulfilled' && item.value.code === 0)
    .map(item => {
      return item.value;
    });
  r.length &&
    r.forEach(item => {
      gameData[item.depotId].moneyBlance = item.data.balance || 0;
    });
  emits('updateGameData', gameData);
};

onMounted(() => {
  isAutoPay.value = !!userState.userInfo.freeWalletSwitch;
  _getPlatInfo('update');
});

const _updateBalance = async () => {
  if (userState.isRefresh) return;
  userState._getCenterMoney(); //- 中心钱包获取
  if (curDepotId.value) {
    const res = await api.bank.getBalanceData({ depotId: curDepotId.value });
    gameData[curDepotId.value].moneyBlance = res.data.balance || 0;
    dialogData.loading = false;
    showDialog.value = false;
    return;
  }
  _getPlatInfo('update');
};

function isSuccessful<T>(response: PromiseSettledResult<T>): response is PromiseFulfilledResult<T> {
  return 'value' in response;
}

//- 游戏平台列表
const platList = computed(() => {
  return Object.values(gameData).filter(item => item.moneyBlance !== undefined);
});

const totalMoney = computed(() => {
  return platList.value
    .map(item => {
      return item.moneyBlance;
    })
    .reduce((pre, next) => (pre as number) + (next as number), userState.centerBalanceMoney);
});

//- 回收钱包
const _recycling = async () => {
  if (route.name === 'profile-wallet') {
    const result = platList.value.some((item: API.TGmDepot) => (item.moneyBlance ?? 0) >= 1);
    if (!result) return messageTip({ message: lang('所有平台余额不足以转回中心钱包') });
  }
  const res = await api.game.getRecover();
  if (res.code === 501) {
    messageTip({ message: lang('查询余额失败') });
  }
  if (res.code !== 501 && route.name !== 'profile-wallet') {
    messageTip({ message: res.msg });
  }
  userState._getCenterMoney();
  _getPlatInfo();
  // Object.keys(gameData).forEach(key => delete gameData[key]);
};

const lockingMoney = computed(() => {
  return userState.userInfo.available === 2 ? userState.centerBalanceMoney : 0.0;
});

const setAutoPay = () => {
  if (isAutoPay.value) return;
  curDepotId.value = 0;
  isAutoPay.value = true;
  setFreeWalletSwitch(1);
  setUserInfo(1);
  _getPlatInfo();
};

const setManuPay = () => {
  if (!isAutoPay.value) return;
  curDepotId.value = 0;
  setDialog({
    dialogTitle: lang('温馨提示'),
    dialogContent: lang('关闭自动免转后,您将需要手动操作各个游戏钱包的金额,确定关闭自动免转?'),
    componentName: 'BaseInfoDialog',
  });
};

const setDialog = (data: {
  dialogTitle: string;
  dialogContent: any;
  componentName: string;
  checkText?: string;
  type?: string;
  depotId?: number;
}) => {
  nextTick(() => {
    showDialog.value = true;
    Object.assign(dialogData, data);
  });
};

const setFreeWalletSwitch = async (val: number) => {
  Object.keys(gameData).forEach(key => delete gameData[key]);
  const params = { status: val };
  await api.user.setFreeWalletSwitch(params);
};

const setUserInfo = (val: number) => {
  userState.set_user_info({ ...userState.userInfo, freeWalletSwitch: val });
};

const changeActiveName = () => {
  activeNames.value = activeNames.value == '1' ? '0' : '1';
};

const toggleIn = (depotName: any, id: number, money: any) => {
  curDepotId.value = id;
  setDialog({
    dialogTitle: `${lang('中心钱包到')}${depotName}`,
    dialogContent: money,
    componentName: 'TransferPlatformDialog',
    checkText: lang('中心钱包余额不足,请先充值'),
    type: 'in',
    depotId: id,
  });
};

const toggleOut = (depotName: string, id: number, money: any) => {
  curDepotId.value = id;
  setDialog({
    dialogTitle: `${depotName}${lang('到中心钱包')}`,
    dialogContent: money,
    componentName: 'TransferPlatformDialog',
    checkText: lang('金额超过场馆金额'),
    type: 'out',
    depotId: id,
  });
};

const dialogEvent = () => {
  isAutoPay.value = false;
  showDialog.value = false;
  setFreeWalletSwitch(0);
  setUserInfo(0);
  _getPlatInfo();
};

const sumbit = (formEl: FormInstance | undefined) => {
  let res: API.freeWalletSwitchRes;
  formEl?.validate(async (valid: any) => {
    if (!valid) return;
    formBtnLoading.value = true;
    const params = {
      depotId: +dialogData.depotId,
      amount: Number(moneyData.money),
    };
    if (dialogData.type === 'in') {
      res = await api.user.transferInPlatform(params);
    } else {
      res = await api.user.transferOutPlatform(params);
    }
    formBtnLoading.value = false;
    formEl?.resetFields();
    showDialog.value = false;
    if (res.code != 0) {
      return messageTip({ message: res.msg });
    }
    _updateBalance();
  });
};

const moneyData = reactive({ money: '' });
const setMaxMoney = () => {
  moneyData.money = parseInt(dialogData.dialogContent).toString();
};
</script>

<style scoped lang="scss">
.center-wallet-container {
  position: relative;
  padding: 15px 0px 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  &.has-box-shadow {
    box-shadow: 0px 4px 4px rgba(135, 73, 0, 0.06), inset -1px -1px 0px #ffffff, inset 1px 1px 0px #ffffff;
  }
  .common-container {
    width: 100%;
    position: relative;
    padding-bottom: 28px;

    .center-money-container {
      @include flex(flex-start);
      position: absolute;
      left: 0px;
      bottom: 33px;
      font-size: 14px;

      .wallet-img {
        width: 43px;
      }
      .money-amonut-container {
        color: var(--u_w_1);
        margin-left: 8px;
        font-size: 14px;
      }
    }
    .totoal-money-container {
      .top-container {
        @include flex();
        color: var(--u_w_1);
        font-weight: bold;
        .totoal-money {
          margin-right: 5px;
        }
      }

      @include flex(center, column);
      font-size: 14px;
      .bottom-handle {
        @include flex();
        margin-top: 21px;

        .return-btn {
          color: var(--u_w_11);
          width: 70px;
          height: 30px;
          border: 1px solid var(--u_w_11);
          box-sizing: border-box;
          border-radius: 4px;
          font-size: 12px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          &:not(.zh, .zh_tw) {
            width: auto;
            padding: 0 5px;
          }
        }
        .line {
          width: 1px;
          height: 32px;
          background-color: var(--u_w_2);
          margin: 0 21px;
        }
        .lock-container {
          @include flex();
          .icon_lock {
            width: 43px;
          }
          .text {
            margin-left: 8px;
          }
        }
      }
    }
  }

  .game-wallet-container {
    border-top: 1px solid var(--u_w_3);
    .tip-text {
      font-weight: 500;
      color: var(--u_w_1);
      text-align: center;
      font-size: 16px;
      padding: 10px 0 24px 24px;
    }
    .item-container {
      @include flex(flex-start);
      .collapse_item {
        width: 120px;
        height: 50px;
        background: var(--u_w_4);
        border-radius: 4px;
        text-align: center;
        box-shadow: var(--u_w_5);
        color: var(--u_w_8);
        @include flex(center, column);
        font-size: 12px;
        margin: 0 40px 26px 0;
        font-size: 12px;
        .title {
          @include flex();
          padding: 3px 2px 0;
          line-height: 1.1;

          :deep(.el-icon-warning) {
            color: var(--u_w_21);
            margin-left: 5px;
          }
        }
      }
    }
    .fold-wrapper {
      border: 0px;
      :deep(.el-collapse-item__wrap) {
        background-color: transparent;
        border: 0px;
        .el-collapse-item__content {
          @include flex(flex-start, row, wrap);
          .collapse_item {
            width: 120px;
            height: 50px;
            background: var(--u_w_4);
            border-radius: 4px;
            text-align: center;
            box-shadow: var(--u_w_5);
            color: var(--u_w_8);
            display: flex;
            justify-content: center;
            flex-wrap: nowrap;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            margin: 0 40px 26px 0;

            .title {
              @include flex();
              padding: 3px 2px 0;
              line-height: 1.1;
              .el-icon-warning {
                color: var(--u_w_21);
                margin-left: 5px;
              }
            }
          }
        }
      }
    }

    .collapse {
      cursor: pointer;
      .collapse-toggle {
        @include flex(center);
        .show-more-icon {
          width: 22px;
          margin-right: 7px;
        }
      }
    }

    // 自动转账和手动转账
    .game-z-z {
      display: flex;
      flex: 1;
      position: relative;
      .toggle-money {
        background-color: var(--u_w_4);
        box-shadow: var(--u_w_5);
        color: var(--u_w_6);
        width: 80px;
        height: 30px;
        font-size: 12px;
        border-radius: 4px;
        margin: 26px 20px 20px 0px;
        border: none;
        &:not(.zh, .zh_tw) {
          width: auto;
          padding: 0 10px;
        }
        &.on {
          background: var(--u_w_7);
          box-shadow: var(--u_w_5);
          color: var(--u_w_4);
        }

        &.auto {
          margin-bottom: 0;
        }
      }
      .money {
        position: absolute;
        right: 20px;
        top: 28px;
        color: var(--u_w_8);
        font-size: 16px;
        font-weight: bold;
      }
    }

    //手动转账
    .game-sport {
      display: inline-block;
      width: 224px;
      height: 104px;
      left: 0px;
      top: 0px;
      background: var(--u_w_10);
      box-shadow: var(--u_w_5);
      border-radius: 8.33333px;
      margin-right: 10px;
      margin-top: 15px;
      &.vi {
        width: auto;
        padding-right: 20px;
      }
      .game-11 {
        display: inline-block;
        width: 102px;
        margin: 19px 10px 0px 19px;
        font-size: 18px;
        color: #3d4957;
        .game-sport-one {
          display: inline-block;
          margin-bottom: 10px;
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        :deep(.el-icon-warning) {
          color: var(--u_w_21);
        }
      }
      .game-transfers {
        display: inline-block;
        margin-top: 21px;
        .transfer-on {
          padding: 3px 20px 3px 20px;
          border: 1px solid var(--u_w_11);
          color: var(--u_w_11);
          border-radius: 20px;
          margin-bottom: 15px;
          cursor: pointer;
          text-align: center;
        }
        .transfer-out {
          padding: 3px 20px 3px 20px;
          border-radius: 20px;
          margin-bottom: 15px;
          color: var(--u_w_10);
          background: var(--u_w_7);
          cursor: pointer;
        }
      }
    }

    .dialog-content {
      font-size: 20px;
      color: var(--u_w_6);
    }
  }

  :deep(.el-collapse-item__header) {
    display: none;
  }
}
.form_dialog {
  & > div {
    text-align: left;
  }
  &:deep(.flex-form) {
    margin-top: 5px;
    &:not(.zh, .zh_tw) {
      .el-button {
        width: auto;
      }
    }
    .el-form-item {
      width: 440px;
      height: 40px;
      .el-input {
        height: 40px;
        font-size: 14px;
      }
    }
    .el-button {
      width: 100px;
      height: 40px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 8px;
      font-size: 14px;
    }
    .el-input-group__append {
      background-color: transparent;
      border: none;
      box-shadow: none;
      .max-money {
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .el-input__wrapper {
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset !important;
    }
    .el-input-group--append > .el-input__wrapper {
      border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    }
  }
}

.center-wallet-container {
  &.template_2_002 {
    .reload {
      color: #ff00f3 !important;
    }
    .return-btn {
      color: #ff00f3 !important;
      border-color: #ff00f3 !important;
    }
    .lock-container {
      .text {
        color: #fff;
      }
    }
    .toggle-money {
      background: #3d5477 !important;
      color: #fff !important;
      box-shadow: none !important;
      &.on {
        background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%) !important;
      }
    }
    .game-sport {
      background: #3d5477 !important;
      color: #fff !important;
      box-shadow: none !important;
      .game-11 {
        color: #fff;
      }
      .transfer-out {
        background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%) !important;
      }
    }
    .collapse-toggle {
      span {
        color: #fff;
      }
    }

    .item {
      background: #3d5477 !important;
      color: #fff !important;
      box-shadow: none !important;
    }
    .dialog-content {
      color: #fff !important;
      font-size: 16px;
    }
    .money {
      color: #fff !important;
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
      .el-button {
        background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%);
        border: none;
      }
    }
  }
}
</style>
