<template>
  <div :class="['add-bank-card-dialog', site]">
    <div class="add-bank-card-form-wrapper">
      <div class="tab-container">
        <span :class="['add_bank_tab_txt', globalState.language !== 'zh' && 'flex_start', globalState.language]">
          {{ $t_c('提现账户类型') }}：
        </span>
        <div :class="['tab-main', globalState.language]">
          <div
            v-for="(item, index) in moneyTabList"
            :key="index"
            :class="[
              'money-type',
              moneyTabList.length > 3 && 'width-auto',
              componentStrName === item.type && 'on',
              globalState.language,
            ]"
            @click="changeNavTab(item.type, item.ref)">
            {{ item.label }}
          </div>
        </div>
      </div>
      <!--  人民币添加  虚拟币添加 支付包添加 -->
      <keep-alive>
        <component ref="childCom" :is="componentName.name" :otherVerifyType="otherVerifyType" @_getMobileCode="_getMobileCode" :crLogoList="crLogoList">
        </component>
      </keep-alive>
    </div>
    <div class="btn_wrapper">
      <el-button
        class="add-bank-card-btn"
        :loading="bindBtnLoading"
        @click="_handleAddBankcard(formName)"
        width="250"
        height="36"
        >{{ $t_c('确认') }}</el-button
      >
    </div>
    <div class="other-verify">
      <div v-if="globalState.isNeedGoogle && otherVerifyType !== 'google'" class="verify-item verify-google" @click="otherVerifyType = 'google'">
        <span>{{ $t_c('谷歌验证') }}</span>
      </div>
      <div v-if="globalState.isNeedVfyEMail && otherVerifyType !== 'email'" class="verify-item verify-email" @click="otherVerifyType = 'email'">
        <span>{{ $t_c('邮箱验证') }}</span>
      </div>
      <div v-if="globalState.isNeedVfySms && otherVerifyType !== 'sms'" class="verify-item verify-sms" @click="otherVerifyType = 'sms'">
        <span>{{ $t_c('短信验证') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { lang } from '@/i18n';
// import { useEnvState, useGlobalState, useUserState } from '@/stores';
import { computed, markRaw, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import RmbBank from './RmbBank.vue';
import CryBank from './CryBank.vue';
import AliBank from './AliBank.vue';
import OtherPay from './OtherPay.vue';
import EcnyBank from './EcnyBank.vue';
import EmoneyPaycard from './EmoneyPaycard.vue';
import { useImgPath, useSite } from '@/hook/usePath';

const site = useSite();
const props = defineProps<{ tabActive: string }>();
const comMap = { RmbBank, CryBank, AliBank, OtherPay, EcnyBank, EmoneyPaycard };
const formName = ref<string>('rmbBankFormRef');
const crLogoList = reactive<DepositType.getCrLogoData[]>([]);
const componentName = reactive<HeaderType.curType>({
  name: markRaw(comMap.RmbBank),
});
const componentStrName = ref<string>('RmbBank');
const userState = useUserState();
const bindBtnLoading = ref<boolean>(false);
const { messageTip } = useDialog();
const childCom = ref();
const globalState = useGlobalState();
const envState = useEnvState();
const otherVerifyType = ref('')

const googleIcon = `url(${useImgPath('login/icon-google.png')}) no-repeat center`;
const emailIcon = `url(${useImgPath('login/icon-email.png')}) no-repeat center`;
const smsIcon = `url(${useImgPath('login/icon-sms.png')}) no-repeat center`;

onMounted(() => {
  _getCrLogo();
});

watch(() => globalState.isNeedGoogle, () => {
  const { isNeedVfySms, isNeedVfyEMail, isNeedGoogle } = globalState
  if (isNeedVfySms) {
    otherVerifyType.value = 'sms'
  } else if (isNeedVfyEMail) {
    otherVerifyType.value = 'email'
  } else if (isNeedGoogle) {
    otherVerifyType.value = 'google'
  } else {
    otherVerifyType.value = ''
  }
}, { immediate: true })

watch(
  () => props.tabActive,
  val => {
    const mapData = {
      rmb: { str: 'RmbBank', form: 'rmbBankFormRef' },
      alipay: { str: 'AliBank', form: 'alipayBankFormRef' },
      crypto: { str: 'CryBank', form: 'cyBankFormRef' },
      ecny: { str: 'EcnyBank', form: 'ecnyBankFormRef' },
      otherpay: { str: 'OtherPay', form: 'otherPayFormRef' },
      ePay: { str: 'EmoneyPaycard', form: 'ePayFormRef' },
    };
    componentStrName.value = mapData[val as keyof typeof mapData].str;
    formName.value = mapData[val as keyof typeof mapData].form;
    componentName.name = markRaw(comMap[mapData[val as keyof typeof mapData].str as keyof typeof comMap]);
  },
  {
    immediate: true,
  }
);

//- 请求钱包类型
const _getCrLogo = async () => {
  const res = await api.deposit.getCrLogo();
  if (res.code) return;
  crLogoList.length = 0;
  crLogoList.push(...res.data);
};

//- 发送手机验证码
const _getMobileCode = async ({
  captchaVerification,
  callback,
}: {
  captchaVerification: string;
  callback: Function;
}) => {
  try {
    if (otherVerifyType.value === 'sms') {
      const res = await api.bank.sendSecurityMobCode({
        mobile: userState.userInfo.mobile as string,
        captchaVerification,
      });
      if (res.code === 0) {
        callback && callback();
        messageTip({ message: lang('发送成功，请查看手机') });
      } else {
        messageTip({ message: res.msg, duration: 1000 });
      }
    } else if (otherVerifyType.value === 'email') {
      const res = await api.common.sendMailCode({
        module: 4,
        email: userState.userInfo.email as string,
        captchaVerification,
      });
      if (res.code === 0) {
        callback && callback();
        messageTip({ message: lang('发送成功') });
      } else {
        messageTip({ message: res.msg, duration: 1000 });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const changeNavTab = (_: string, formNameVal: string) => {
  componentStrName.value = _;
  formName.value = formNameVal;
  componentName.name = markRaw(comMap[_ as keyof typeof comMap]);
};

const requestFun = (form: string): Promise<BankAPI.sendSecurityMobCodeRes> => {
  switch (form) {
    case 'rmbBankFormRef':
      return api.bank.saveBankCard(childCom.value.bankForm);
    case 'cyBankFormRef':
      const params = {
        walletName: childCom.value.bankForm.walletName.name,
        walletAddress: childCom.value.bankForm.walletAddress,
        currencyCode: 'USDT',
        currencyProtocol: childCom.value.bankForm.currencyProtocol.id,
        walletId: childCom.value.bankForm.walletName.id,
      };
      return api.bank.saveCryptoCurrencies(params);
    case 'alipayBankFormRef':
      const { cardNo, realName } = childCom.value.bankForm;
      return api.bank.saveAlipayAccount({ cardNo, realName });
    case 'otherPayFormRef':
      const { address } = childCom.value.bankForm;
      return api.bank.saveOtherPayAccount({
        cardNo: childCom.value.bankForm.cardNo,
        address,
      });
    case 'ecnyBankFormRef':
      return api.bank.saveEcnyAccount({
        cardNo: childCom.value.bankForm.cardNo,
        realName: childCom.value.bankForm.realName,
      });
    case 'ePayFormRef':
      return api.bank.saveEMoneyAccount({
        cardNo: childCom.value.bankForm.cardNo,
        realName: childCom.value.bankForm.realName,
        bankName: childCom.value.bankForm.accountType,
      });
    default:
      return Promise.resolve() as unknown as Promise<BankAPI.sendSecurityMobCodeRes>;
  }
};

const emits = defineEmits(['update:showDialog']);
const router = useRouter();
//- 确定添加银行卡或虚拟币
const _handleAddBankcard = async (form: string) => {
  childCom.value[form].validate(async (valid: boolean) => {
    if (!valid) return;
    bindBtnLoading.value = true;
    try {
      let res = { code: 0, msg: 'success' };
      if (globalState.isNeedVfySms || globalState.isNeedVfyEMail || globalState.isNeedGoogle) {
        if (otherVerifyType.value === 'sms') {
          res = await api.bank.vfySecurityMobCode({
            code: childCom.value.bankForm.code,
            mobile: userState.userInfo.mobile as string,
          });
        } else if (otherVerifyType.value === 'email') {
          res = await api.common.vfyMailCode({
            module: 4,
            code: childCom.value.bankForm.code,
            email: userState.userInfo.email as string,
          });
        } else if (otherVerifyType.value === 'google') {
          res = await api.common.vfyGoogleCode({
            module: 4,
            code: childCom.value.bankForm.code,
          });
        }
      }

      bindBtnLoading.value = false;
      if (!res.code && res.msg === 'success') {
        requestFun(form)
          .then(res => {
            if (res.code === 0) {
              emits('update:showDialog', false);
              const messageTipData = {
                otherPayFormRef: {
                  text: lang('钱包添加成功'),
                  http: '_getOtherPayAccountList',
                },
                rmbBankFormRef: {
                  text: lang('银行卡添加成功'),
                  http: '_getBankCardList',
                },
                cyBankFormRef: {
                  text: lang('USDT钱包添加成功'),
                  http: '_getCryptoList',
                },
                ecnyBankFormRef: {
                  text: lang('数字人民币添加成功'),
                  http: '_getEcnyList',
                },
                alipayBankFormRef: {
                  text: lang('支付宝账户添加成功'),
                  http: '_getAlipayList',
                },
                ePayFormRef: {
                  text: lang('电子钱包添加成功'),
                  http: '_getEMoneyList',
                },
              };
              messageTip({ message: messageTipData[form as keyof typeof messageTipData].text });
              userState[
                messageTipData[form as keyof typeof messageTipData].http as
                  | '_getAlipayList'
                  | '_getOtherPayAccountList'
                  | '_getBankCardList'
                  | '_getCryptoList'
                  | '_getEcnyList'
                  | '_getEMoneyList'
              ]();
            } else {
              messageTip({ message: res.msg });
              if (res.code === 2000) {
                setTimeout(() => {
                  router.push('/profile/baseInfo');
                }, 2000);
              }
            }
            childCom.value[form].resetFields();
            childCom.value.startCount = false;
          })
          .catch(() => {});
      }
    } catch (error) {
      console.log(error);
      bindBtnLoading.value = false;
      childCom.value[form].resetFields();
      childCom.value.startCount = false;
    }
  });
};

const tabFontSize = computed(() => {
  const total =
    Number(userState.crFlag) +
    Number(userState.alipayEnable) +
    Number(userState.ebPayWithdrawEnable || userState.toPayWithdrawEnable) +
    Number(userState.ecnyWithdrawEnable) +
    1;
  return total < 4 ? '18px' : '14px';
});

const moneyTabList = computed(() => {
  const tempList = [{ type: 'RmbBank', ref: 'rmbBankFormRef', label: lang('银行卡') }];
  userState.crFlag && tempList.push({ type: 'CryBank', ref: 'cyBankFormRef', label: 'USDT' });
  userState.alipayEnable && tempList.push({ type: 'AliBank', ref: 'alipayBankFormRef', label: lang('支付宝') });
  (userState.ebPayWithdrawEnable || userState.toPayWithdrawEnable) &&
    envState.vite_currency_map.type === 'RMB' &&
    tempList.push({ type: 'OtherPay', ref: 'otherPayFormRef', label: lang('其他钱包') });
  userState.ecnyWithdrawEnable &&
    envState.vite_currency_map.type === 'RMB' &&
    tempList.push({ type: 'EcnyBank', ref: 'ecnyBankFormRef', label: lang('数字人民币') });
  userState.eMoneyPayWithdrawEnable &&
    tempList.push({ type: 'EmoneyPaycard', ref: 'ePayFormRef', label: lang('电子钱包') });
  return tempList;
});
</script>

<style lang="scss" scoped>
.add-bank-card-dialog {
  padding: 10px 40px 0px 20px;
  .add-bank-card-form-wrapper {
    .add-bank-card-form {
      :deep(.el-form-item) {
        margin-bottom: 30px;
        .el-form-item__label {
          font-size: 18px;
          color: var(--u_w_19);
          height: 40px;
          line-height: 40px;

          &::before {
            color: inherit;
          }
        }

        .el-form-item__content {
          .el-input__wrapper {
            padding-left: 11px;
            border-radius: 8px;
            box-shadow: 0 0 0 1px var(--u_f_3);
          }
        }
        .el-input__inner {
          height: 36px;
          border: none;
        }
      }
      .sm-code-input {
        cursor: pointer;
        :deep(.el-form-item__content) {
          @include flex();
          .sm-code-container {
            flex-shrink: 0;
            .g-button {
              margin-left: 30px;
              width: 120px;
              height: 36px;
              box-sizing: border-box;
              text-align: center;
              .el-button--success {
                // border: 1px solid $ft-b;
                border-radius: 34px;
                // color: $ft-b;
                background-color: #fff;
              }
            }
          }
        }
      }
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

  .province,
  .city {
    width: 100%;
  }

  .tab-container {
    @include flex(flex-start);
    margin-bottom: 30px;
    .add_bank_tab_txt {
      width: 150px;
      font-size: 18px;
      text-align: right;
      padding-right: 12px;
      color: var(--u_w_19);
      box-sizing: border-box;
      flex-shrink: 0;
      &:not(.zh, .zh_tw) {
        width: 240px;
        padding-right: 0;
        text-align: right;
      }
      &.vi {
        width: 270px;
      }
      &.ms {
        width: 290px;
      }
    }
    .tab-main {
      @include flex(flex-start);
      // width: 450px;
      &:not(.zh, .zh_tw) {
        width: auto;
        flex-shrink: 0;
      }
      .money-type {
        padding: 0 10px;
        height: 40px;
        border-radius: 4px;
        text-align: center;
        line-height: 40px;
        margin-right: 20px;
        font-size: v-bind(tabFontSize);
        color: var(--u_w_17);
        background: var(--u_w_18);
        cursor: pointer;
        &:not(.zh, .zh_tw).width-auto {
          width: auto;
          padding: 0 10px;
        }
        &:last-child {
          margin-right: 0px;
        }
        &.on {
          color: var(--u_w_17);
          background: var(--u_w_20);
        }
      }
    }
  }
  .other-verify {
    width: 400px;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-around;
    .verify-item {
      color: var(--u_friend_55);
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        margin-top: 5px;
      }
    }
    .verify-google::before {
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      background: v-bind(googleIcon);
      background-size: contain;
    }
    .verify-email::before {
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      background: v-bind(emailIcon);
      background-size: contain;
    }
    .verify-sms::before {
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      background: v-bind(smsIcon);
      background-size: contain;
    }
}
}
</style>
