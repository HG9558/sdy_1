<template>
  <div :class="['cr-pay-container', site, noData && 'bg']">
    <template v-if="!showLoading && !noData">
      <div class="bg-container">
        <div class="tip">{{ $t_c('选择支付通道') }}</div>
        <div class="select-pay-container rm-pay-container">
          <div
            :class="['select-pay-item', index === payChannelIndex && 'active']"
            @click="changePayChannelIndex(index)"
            v-for="(item, index) in renderList"
            :key="index">
            <img class="logo" :src="item.bankLogo || useImgPath('profile/deposit_bankcard3x.png')" alt="" />
            <div class="pay-name">
              <span class="text">{{
                (item as DepositType.fastBankListBankCard).bankName || item.showName || item.name
              }}</span>
              <span class="number">
                {{
                  item?.amountType
                    ? `${item.fixedAmount.split(',')[0]}-${item.fixedAmount.split(',').pop()}`
                    : `${item.minAmout}-${item.maxAmout}`
                }}
                {{
                  envState.vite_currency_map.type === 'RMB' && globalState.language !== 'zh'
                    ? envState.vite_currency_map.en_label
                    : envState.vite_currency_map.value
                }}
              </span>
            </div>
            <p :class="['tag', item.isHot && 'tag_1', globalState.language]" v-if="item.isHot || item.isRecommend">
              <i>{{ item.isHot ? $t_c('热门') : item.isRecommend ? $t_c('推荐') : '' }}</i>
            </p>
            <img
              v-if="payChannelIndex === index"
              :src="useImgPath('profile/deposit_new_checked.png')"
              class="is-select"
              alt="" />
          </div>
        </div>

        <div
          class="user-name-container el-form"
          v-if="curPayChannel?.paymentType == 13 && (curPayChannel as DepositType.fastBankListBankCard).depositName">
          <span>{{ $t_c('存款姓名：') }}</span>
          <el-input v-model="accountName" class="name-input" type="text" :placeholder="$t_c('请输入存款人姓名')" />
          <div class="notice">
            <el-icon class="el-icon-warning">
              <Warning />
            </el-icon>
            <span>{{ $t_c('为及时到账，请务必输入正确的存款人姓名') }}</span>
          </div>
        </div>

        <div class="select-pay-form">
          <div class="tip_1">
            {{ $t_c('存款金额') }}
            <span>
              <span class="tip-text-t"
                >{{ $t_c('单笔存款金额：') }}
                {{
                  renderList[payChannelIndex]?.amountType
                    ? `${renderList[payChannelIndex].fixedAmount.split(',')[0]}-${renderList[
                        payChannelIndex
                      ].fixedAmount
                        .split(',')
                        .pop()} `
                    : `${renderList[payChannelIndex]?.minAmout}-${renderList[payChannelIndex]?.maxAmout}`
                }}
                {{ envState.vite_currency_map.value }}
              </span>
            </span>
          </div>
          <div class="select-box rm-box">
            <div class="select-card-container">
              <div
                :class="{
                  'select-item': true,
                  on: recommendMoneyIndex === index,
                }"
                v-for="(item, index) in recommendList"
                :key="index"
                @click="changeRecommendMoneyIndex(index, item)">
                {{ Number(item.label).toLocaleString() }}
                {{
                  envState.vite_currency_map.type === 'RMB' && globalState.language !== 'zh'
                    ? envState.vite_currency_map.en_label
                    : envState.vite_currency_map.value
                }}
              </div>
            </div>

            <div v-if="curPayChannel?.amountType !== 1" class="notice">
              {{ $t_c('注意：转账时请以转账页面的实际金额进行转账') }}
            </div>

            <div class="select-form-container">
              <el-form
                class="rm-form"
                :model="feeForm"
                :rules="feeFormRules"
                ref="feeFormRef"
                v-if="curPayChannel?.amountType !== 1">
                <el-form-item prop="fee">
                  <el-input
                    type="number"
                    class="input-money"
                    :clearable="true"
                    :placeholder="feePlaceholder"
                    v-model.number="feeForm.fee"></el-input>
                </el-form-item>
              </el-form>

              <el-button
                :class="{
                  'handle-btn btn-deposit': true,
                  'rm-handle-btn': curPayChannel?.amountType === 1,
                }"
                @click="_rmPayDeposit"
                :loading="buttonLoading"
                >{{ $t_c('立即存款') }}</el-button
              >
              <el-button class="handle-btn" @click="$router.push('/help_center')">{{
                $t_c('存款教程')
              }}</el-button>
            </div>
            <div class="pay-tip-text">
              {{ $t_c('请按照提交后页面实际显示金额充值，否则无法自动到账！') }}
            </div>
          </div>
        </div>
      </div>
    </template>

    <SelfLoading v-if="showLoading" :showLoading="showLoading" />
    <div v-if="noData" class="box-no-deposit-rode">
      <empty-container class="empty" :txt="$t_c('充值通道维护中')"></empty-container>
    </div>

    <!-- 扫码支付弹窗 -->
    <self-dialog
      :dialogTitle="$t_c('扫码支付')"
      v-model:isShow="isShowQrDialog"
      :confirmTxt="$t_c('需要帮助')"
      :cancelTxt="$t_c('已完成充值')"
      @confirmCallback="confirmHandle">
      <QrDialogContent :qrInfo="qrInfo" />
    </self-dialog>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import useProxy from '@/hook/useCurrentInstance';
import useDialog from '@/hook/useDialog';
import { useImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
// import { useEnvState, useGlobalState, useUserState } from '@/stores';
import type { FormInstance } from 'element-plus';
import SelfLoading from 'commonComponent/SelfLoading/SelfLoading.vue';
import { getRecommendList } from 'static_data/deposit_data';
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
import QrDialogContent from './QrDialogContent.vue';

const { messageTip } = useDialog();
const bankList = reactive<(DepositType.BankCard | DepositType.fastBankListBankCard)[]>([]);
const feePlaceholder = ref<string>('0-0');
const showLoading = ref<boolean>(true);
const noData = ref<boolean>(false);
const buttonLoading = ref<boolean>(false);
const payChannelIndex = ref<number>(0); //- 通道分类
const recommendMoneyIndex = ref<number>(-1); //- 存款金额
const feeFormRef = ref<FormInstance>();
const accountName = ref<string>('');
const proxy = useProxy();
const userState = useUserState();
const cancelText = ref<string>('');
const confirmText = ref<string>('');
const isShowQrDialog = ref<boolean>(false);
const qrInfo = reactive<DepositType.Info>({} as DepositType.Info);
const site = useSite();
const globalState = useGlobalState();
const envState = useEnvState();

const renderList = reactive<(DepositType.EmoneyPayList | DepositType.fastBankListBankCard)[]>([]);
onMounted(() => _initData());

const _initData = async () => {
  const resList = await Promise.allSettled([
    api.deposit.getPzpayPictureUrl(),
    api.deposit.getFastBankList(
      envState.vite_currency_map.type !== 'RMB' ? { areaCode: envState.vite_currency_map.type } : {}
    ),
  ]);
  resList[0].status === 'fulfilled' && getPzpayPictureUrl(resList[0].value);
  resList[1].status === 'fulfilled' && getFastBankList(resList[1].value);
  showLoading.value = false;
  noData.value = !renderList.length;
};

const getPzpayPictureUrl = (response: DepositType.getPzpayPictureUrlRes) => {
  const { code, msg, res } = response;

  if (code) return messageTip({ message: msg });

  if (res.emoneyPayList && res.emoneyPayList.length) {
    renderList.push(...res.emoneyPayList);
  }
};

const getFastBankList = (response: DepositType.fastBankListRes) => {
  const { code, fastBanks } = response;

  if (code === 0 && fastBanks && fastBanks.length) {
    fastBanks.forEach((item: DepositType.FastBank) => {
      if (+item.alipayFlg == 3) {
        item.bankCards.forEach((_: DepositType.fastBankListBankCard) => {
          _.bankName = item.showName;
          _.amountType = item.amountType;
          _.paymentType = item.paymentType;
          _.depositName = item.depositName;
          _.isHot = item.isHot;
          _.isRecommend = item.isRecommend;
          renderList.push(_);
        });
      }
    });
  }
  userState.modify_depositLen({ type: 'ElectronicPay', len: renderList.length });
  const { minAmout, maxAmout } = renderList[0] ?? { minAmout: 0, maxAmout: 0 };
  feePlaceholder.value = `${minAmout}-${maxAmout}`;
};

const curPayChannel = computed(() => {
  return renderList[payChannelIndex.value];
});

//- 充值通道切换
const changePayChannelIndex = (index: number) => {
  payChannelIndex.value = index;
  recommendMoneyIndex.value = -1;
  feeFormRef.value?.resetFields();
  curPayChannel.value.amountType !== 1 &&
    (feePlaceholder.value = curPayChannel?.value?.minAmout + '-' + curPayChannel?.value?.maxAmout);
};

const recommendList = computed(() => {
  // if (envState.vite_currency_map.type === 'VN') {
  //   const tempArr = ['eeziePayList', 'bankList'];
  //   if (tempArr.includes(renderList[payListIndex.value].code)) {
  //     return [
  //       { label: 100000, value: 100000 },
  //       { label: 500000, value: 500000 },
  //       { label: 200000, value: 200000 },
  //       { label: 5000000, value: 5000000 },
  //       { label: 10000000, value: 10000000 },
  //     ];
  //   }
  // }

  if (curPayChannel.value.amountType === 1) {
    return [...new Set((curPayChannel.value.fixedAmount as string).split(','))]
      .sort((a, b) => +a - +b)
      .map(item => ({ label: +item, value: +item }));
  }

  const data = feePlaceholder.value.split('-');
  let Min = Math.floor(Number(data[0]));
  let Max = Math.floor(Number(data[1]));
  if (Min === Max) {
    return [
      {
        label: Min,
        value: Max,
      },
    ];
  }

  return getRecommendList(Min, Max);
});

interface IFeeForm {
  fee: number | string | null;
}
const feeForm = reactive<IFeeForm>({
  fee: null, //充值数值
});

//- 检测存款金额
const _rmPayDeposit = async () => {
  if (!feeForm.fee) return messageTip({ message: lang('存款金额不能为空') });
  const reg = /^[0-9]*[1-9][0-9]*$/;
  if (!reg.test(feeForm.fee as string)) return messageTip({ message: lang('存款金额格式不正确') });
  buttonLoading.value = false;
  if (
    curPayChannel.value.paymentType === 13 &&
    (curPayChannel.value as DepositType.fastBankListBankCard).depositName &&
    !accountName.value
  )
    return messageTip({ message: lang('存款人姓名不能为空') });

  buttonLoading.value = true;
  const res = await api.deposit.getDepositLockStatus();
  if (res.code) return;
  const depositLimit = res.data;
  if (depositLimit.depositLock === 1) {
    proxy.$_dialog.show({
      isShow: true,
      dialogTitle: lang('温馨提示'),
      content: lang('您已被限制存款，请联系客服！'),
      confirmTxt: lang('联系客服'),
      cancelTxt: lang('知道了'),
      clickCallback() {
        window.open(userState.serUrl);
      },
    });
    return (buttonLoading.value = false);
  }
  if (depositLimit.depositLock === 0 && depositLimit.isSuccessDeposit && depositLimit.isReminder) {
    proxy.$_dialog.show({
      isShow: true,
      dialogTitle: lang('温馨提示'),
      content: lang('存款遇到问题？可以联系客服为您服务！'),
      confirmTxt: lang('联系客服'),
      cancelTxt: lang('继续存款'),
      clickCallback() {
        window.open(userState.serUrl);
      },
      cancelCallback: () => _onlinePayDeposit(),
    });
    buttonLoading.value = false;
    return;
  }
  _onlinePayDeposit();

  // feeFormRef.value?.validate(async checkStatus => {
  //   if (!checkStatus) return;
  // });
};

//- 立即存款
const _onlinePayDeposit = async () => {
  if (!curPayChannel.value) {
    messageTip({ message: lang('请先选择充值通道') });
    buttonLoading.value = false;
    return;
  }
  if ((curPayChannel.value as DepositType.fastBankListBankCard).payType === 'qr') {
    //- 扫码支付
    const res = await api.deposit.applyQrPay({
      fee: feeForm.fee as number,
      depositId: (curPayChannel.value as DepositType.fastBankListBankCard).id as number,
    });

    if (res.code === 0) {
      cancelText.value = lang('已完成充值');
      confirmText.value = lang('需要帮助');
      isShowQrDialog.value = true;
      Object.keys(qrInfo).forEach(key => delete qrInfo[key]);
      Object.assign(qrInfo, res.info);
    }
    buttonLoading.value = false;
  } else {
    try {
      const res = await api.deposit.getPayUrl({
        terminal: 0,
        userName: userState.userInfo.realName as string,
        fee: feeForm.fee as number,
        onlinePayId: curPayChannel.value.onlinePayId as number,
      });

      buttonLoading.value = false;
      feeFormRef.value?.resetFields();

      if (res.code) {
        return messageTip({
          message: res.msg,
          onClose: () => {
            // router.push({ path: '/profile/baseInfo' });
          },
        });
      }
      const tempwindow = window.open('_blank');
      (tempwindow as Window).document.write((res.res as DepositType.payUrlRe).url);
      //- 充值提醒

      proxy.$_dialog.show({
        isShow: true,
        dialogTitle: lang('温馨提示'),
        content: lang('请在新页面完成充值支付\n充值支付完成前，请勿关闭此窗口。'),
        confirmTxt: lang('充值问题需要协助'),
        cancelTxt: lang('已完成充值'),
        clickCallback() {
          window.open(userState.serUrl);
        },
        cancelCallback() {
          userState._getCenterMoney();
        },
      });
    } catch (error) {
      console.log('602行打印：============:', error);
      buttonLoading.value = false;
      feeFormRef.value?.resetFields();
    }
  }
  feeForm.fee = null;
};

const feeFormRules = {
  fee: [
    {
      validator: (_: any, value: string, callback: Function) => {
        const reg = /^[0-9]*[1-9][0-9]*$/;
        if (curPayChannel.value) {
          if (!value) {
            callback(
              new Error(`请${curPayChannel.value.amountType === 1 ? lang('选择') : lang('输入')}${lang('存款金额')}`)
            );
          }
          if (!reg.test(value)) {
            callback(new Error(lang('存款金额格式不正确')));
          }
          if (
            (curPayChannel.value.minAmout as number) <= +value &&
            +value <= (curPayChannel.value.maxAmout as number)
          ) {
            callback();
          } else {
            callback(new Error(lang('存款金额不符合单笔存款限额')));
          }
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
};

const changeRecommendMoneyIndex = (index: number, item: { label: number; value: number }) => {
  recommendMoneyIndex.value = index;
  feeForm.fee = item.value;
};

const confirmHandle = () => {
  window.open(userState.serUrl);
};

onDeactivated(() => {
  feeForm.fee = null;
  noData.value = false;
  showLoading.value = false;
  bankList.length = 0;
  payChannelIndex.value = 0; //- 通道分类
  recommendMoneyIndex.value = -1; //- 存款金额
  feePlaceholder.value = `${curPayChannel.value.minAmout}-${curPayChannel.value.maxAmout}`;
});

watch(
  () => feeForm.fee,
  _ => {
    recommendMoneyIndex.value = recommendList.value.findIndex(item => item.value === _);
  }
);

const recommendBg = `url(${useImgPath('profile/deposit_icon-recommend.png')})`;
const popularBg = `url(${useImgPath('profile/deposit_icon-popular.png')})`;
const tgBg = `url(${useImgPath('profile/deposit_tag.png')})`;
const tgBgHot = `url(${useImgPath('profile/deposit_tag_1.png')})`;
</script>

<style lang="scss" scoped>
.cr-pay-container {
  padding: 0 0px 20px;
  min-height: 570px;
  position: relative;
  &.bg {
    background-color: var(--u_c_8);
  }

  .pay-type-container {
    background-color: var(--u_c_8);
    border-radius: 10px;
    box-shadow: var(--u_c_9);
    height: 113px;
    padding: 16px 0 16px;
    @include flex(flex-start);
    position: relative;
    margin-bottom: 28px;
    box-sizing: border-box;

    .py-type-list {
      @include flex(center, column, nowrap, center);
      margin: 18px;
      cursor: pointer;
      font-weight: 500;

      &.on {
        .txt {
          color: var(--u_c_18);
        }

        &::after {
          content: '';
          position: absolute;
          width: 32px;
          height: 3px;
          bottom: 0px;
          border-radius: 4px 4px 0 0;
          background: var(--u_c_21);
        }
      }

      .txt {
        margin-top: 10px;
        color: var(--u_c_17);
      }

      .circle-outer {
        width: 55px;
        height: 55px;
        background: var(--u_c_15);
        position: relative;
        @include flex(center);

        > .tag {
          z-index: 10;
          position: absolute;
          width: 40px;
          height: 14px;
          background-image: v-bind(recommendBg);
          background-size: 100% 100%;
          top: 0px;
          right: -20px;
          @include flex(center);

          &.vi {
            width: 50px;
          }
          &.hot {
            background-image: v-bind(popularBg);
            background-size: 100% 100%;
          }

          .icon_tag {
            font-size: 12px;
            color: var(--u_c_32);
            transform: scale(0.65);
          }
        }
        .circle-inner {
          width: 47px;
          height: 47px;
          .list-img {
            width: 37px;
            &.logo_1 {
              width: 30px;
            }
            &.logo_3 {
              width: 35px;
            }
            &.logo_4 {
              width: 26px;
            }
            &.logo_5 {
              width: 25px;
            }
          }
        }
      }
    }
  }

  .bg-container {
    background-color: var(--u_c_8);
    border-radius: 10px;
    box-shadow: var(--u_c_9);
    padding: 20px;
    .tip {
      color: var(--u_c_22);
      font-weight: 600;
      font-size: 18px;
      padding-bottom: 15px;
      border-bottom: 1px solid var(--u_c_23);
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
      background: var(--u_c_33);
      border: 0.5px solid var(--u_c_12);
      box-sizing: border-box;
      border-radius: 10px;
      position: relative;
      margin-top: 15px;
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
        &.tag_1 {
          background-image: v-bind(tgBgHot);
          &:not(.zh, .zh_tw) {
            i {
              transform: rotate(-45deg) scale(0.66) translateY(-2px) translateX(-1px);
              white-space: nowrap;
            }
          }
        }
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
          width: 100px;
          color: var(--u_c_27);
        }
      }
    }
  }
  .select-pay-container {
    &.rm-pay-container {
      margin-top: 0px;
      flex-wrap: wrap;
    }
  }
  .select-pay-form {
    .tip_1 {
      color: var(--u_c_11);
      font-weight: 500;
      font-size: 14px;
    }
    .rm-form {
      :deep(.el-form-item) {
        margin-bottom: 0px;
      }
    }
    .select-card-container {
      @include flex(flex-start);
      margin: 20px 0 20px;

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

        &.on,
        &:hover,
        &.active {
          background: var(--u_c_14);
          color: var(--u_c_7);
        }
      }
    }
    .select-form-container {
      @include flex(flex-start);
      margin: 20px 0;

      :deep(.el-form-item__content) {
        width: 280px;
        margin-right: 20px;

        .el-input__wrapper {
          padding: 0 11px;
          box-shadow: none;
        }

        .el-input__inner {
          height: 38px;
          color: var(--u_c_24);

          &::-webkit-input-placeholder {
            color: var(--u_c_24) !important;
          }
        }
      }

      :deep(.el-button) {
        // width: 79px;
        height: 29px;
        border-radius: 8px;
        background: var(--u_c_26);
        font-size: 12px;
        color: var(--u_c_25);

        &.rm-handle-btn {
          margin-left: 0px;
        }
      }
    }

    .notice,
    .pay-tip-text {
      color: var(--u_c_17);
      font-size: 14px;
    }
  }

  .user-name-container {
    @include flex(flex-start);
    border-radius: 4px;
    padding: 20px 20px 20px 0;
    box-sizing: border-box;
    margin-bottom: 10px;
    color: var(--u_c_22);
    font-size: 13px;

    .name-input {
      width: 250px;
      height: 40px;
      border: none;
      margin: 0 10px;
    }

    .notice {
      @include flex();

      span {
        color: var(--u_c_28);
      }

      .el-icon-warning {
        color: var(--u_c_28);
        font-size: 20px;
        margin: 0 8px;
      }
    }
  }
}

.circle-outer {
  width: 48px;
  height: 48px;
  cursor: pointer;
  box-shadow: var(--u_c_19);
  border-radius: 45px;
  @include flex(center);

  .circle-inner {
    width: 40px;
    height: 40px;
    border: var(--u_c_20);
    box-sizing: border-box;
    border-radius: 45px;
    @include flex(center);

    .card-logo {
      width: 30px;
      height: 30px;
    }
  }
}
.qr-dialog {
  :deep(.el-button) {
    margin: 0 40px !important;
  }
}

.tip-text-o {
  color: #cbba8f;
}

.tip-text-t {
  color: var(--u_c_24);
}

.box-no-deposit-rode {
  height: 500px;
  @include flex(center);
}

//- 002
.cr-pay-container {
  &.template_2_002 {
    .select-pay-item {
      color: #fff;
      border-color: transparent !important;
      &.active {
        border: 1px solid #e8c96f !important;
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
      &.on,
      &:hover {
        background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%) !important;
        color: #fff !important;
      }
    }
    :deep() {
      .el-input__wrapper {
        background: #161e2b !important;
        border: none !important;
        box-shadow: none !important;
        .el-input__inner {
          color: #fff;
        }
      }
      .handle-btn {
        border: none;
      }
    }
    .card-title {
      color: #fff;
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
    .pay-name {
      .text {
        color: #fff !important;
      }
    }
  }
}
</style>
