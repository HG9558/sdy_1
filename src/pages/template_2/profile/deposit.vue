<template>
  <div :class="['deposit-container', site]">
    <div class="deposit-title">
      <span>{{ $t_c('选择支付方式') }}</span>
      <div :class="['service-container', globalState.language]" @click="serviceClick">
        <span class="service-txt">{{ $t_c('【客服热线】') }}</span>
        <img class="question-img" :src="useImgPath('profile/deposit_question.png')" alt="" />
        <span class="question-txt">{{ $t_c('存款过程中遇见任何问题，请点击客服热线') }}</span>
      </div>
    </div>
    <div class="tab-container">
      <div
        :class="['deposit-tab-item', componentNameStr === item.type && 'on', globalState.language]"
        @click="changeDepositType(item.type)"
        v-for="(item, index) in tabNavList"
        :key="index">
        <img
          class="logo"
          :src="useImgPath(`profile/withdrawal_${componentNameStr !== item.type ? item.icon : `${item.icon}_on`}.png`)"
          alt="" />
        <span>{{ item.val }}</span>
      </div>

      <div :class="['deposit-tab-item', globalState.language]" @click="gotoChat" v-if="userState.isShowService">
        <img class="logo" :src="useImgPath('profile/deposit_new_xezf.png')" alt="" />
        <span>{{ $t_c('小额客服线') }}</span>
      </div>
    </div>

    <div
      v-if="depositLimit.need"
      class="warning-box"
      @click="$router.push('/profile/baseInfo')">
      <img class="warning" :src="useImgPath('profile/withdrawal_warning.jpg')" alt="" />
      <span class="error">{{ $t_c('操作失败') }}</span>
      <div class="tip">
        {{ depositLimit.text }}
      </div>
    </div>

    <template v-else>
      <CrPay v-show="componentNameStr === 'CrPay'" />
      <RmPay v-show="componentNameStr === 'RmPay'" />
      <ElectronicPay v-show="componentNameStr === 'ElectronicPay'" />
      <OtherPay v-show="componentNameStr === 'OtherPay'" />
    </template>

    <self-dialog
      v-model:isShow="visible"
      :dialogTitle="$t_c('存款提示')"
      :confirmTxt="$t_c('去USDT存款')"
      :cancelTxt="$t_c('放弃使用USDT')"
      @confirmCallback="changeDepositType('CrPay')">
      <div class="notice-dialog-cont">
        <p class="ctt">
          {{ $t_c('USDT极速存款，秒存秒到，安全快捷，点击跳转使用') }}
        </p>
      </div>
    </self-dialog>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { useImgPath, useSite } from '@/hook/usePath';
// import { useEnvState, useGlobalState, useUserState } from '@/stores';
import { onMounted, reactive, ref, watch, markRaw } from 'vue';
import SelfDialog from 'commonComponent/Dialog/Dialog.vue';
import CrPay from './component/deposit/CrPay.vue';
import RmPay from './component/deposit/RmPay.vue';
import ElectronicPay from './component/deposit/ElectronicPay.vue';
import OtherPay from './component/deposit/OtherPay.vue';
import { lang } from '@/i18n';

const site = useSite();
const componentName = reactive({ name: markRaw(CrPay) });
const componentNameStr = ref<string>('');
const visible = ref<boolean>(false);
const rmPayActivityRules = reactive<DepositType.rmPayActivityRulesType>({
  allActiveText: '',
  textArr: [],
});
// index分别对应 银行/支付宝/微信/网银/扫码/qq/usdt, 记录历史值
const recodeArr = reactive<number[]>([0, 0, 0, 0, 0, 0, 0]);
const userState = useUserState();
const globalState = useGlobalState();
const { messageTip } = useDialog();
const envState = useEnvState();

let depositLimit = reactive({ text: '', need: false })

const payTabList = [
  {
    val: lang('加密货币'),
    icon: 'currency',
    type: 'CrPay',
    len: 0,
    sort: 1,
  },
  {
    val: lang('法定货币'),
    icon: 'rmb',
    type: 'RmPay',
    len: 0,
    sort: 2,
  },
  {
    val: lang('其他钱包'),
    icon: 'rmb',
    type: 'OtherPay',
    len: 0,
    sort: 3,
  },
  {
    val: lang('电子钱包'),
    icon: 'rmb',
    type: 'ElectronicPay',
    len: 0,
    sort: 4,
  },
];

onMounted(() => {
  userState.checkUserConditions('deposit').then((data => {
    depositLimit.need = data.need

    userState._getLineService();
    getJDepositActivityRules();
    componentNameStr.value = envState.vite_deposit_type_sort_map.find((_: { sort: number }) => _.sort === 1).type;
  })).catch(data => {
    depositLimit.text = data.text
    depositLimit.need = data.need
  })
});

const tabNavList = computed(() => {
  const result: { [key: string]: number } = {};
  for (const { sort, type } of envState.vite_deposit_type_sort_map) {
    result[type] = sort;
  }
  return payTabList
    .map(_ => {
      _.sort = result[_.type];
      _.len = userState.depositLen[_.type];
      return _;
    })
    .sort((a, b) => a.sort - b.sort)
    .filter(_ => _.len);
});

//- 存款类型
const transitText = (item: DepositType.JDepositActivityRule, recodeVal?: number) => {
  if (!item) return;
  const { donateType, donateAmount } = item;
  const num = recodeVal ? (recodeVal > donateAmount ? recodeVal : donateAmount) : donateAmount;
  if (donateType === 1) {
    let text,
      unit = [envState.vite_currency_map.value, lang('千'), lang('万')];
    const arr = String(num).split('');
    if (num <= 1000) {
      text = num + unit[0];
    }
    if (num > 1000) {
      text = arr[0] + '.' + arr[1] + unit[1];
    }
    if (num > 10000) {
      text = arr[0] + '.' + arr[1] + unit[2];
    }
    return `${lang('最高赠送')}${text}`;
  }
  return `${lang('最高赠送')}${num}%`;
};

const getJDepositActivityRules = async () => {
  const res = await api.deposit.getJDepositActivityRules();

  if (res.code) return;

  res.jDepositActivityRules &&
    res.jDepositActivityRules.map(item => {
      const { paymentType, donateAmount } = item;
      switch (paymentType) {
        case 1: {
          // QQ
          recodeArr[5] = donateAmount;
          rmPayActivityRules.textArr[5] = transitText(item, recodeArr[5]);
          break;
        }
        case 2: {
          // wechat
          recodeArr[2] = donateAmount;
          rmPayActivityRules.textArr[2] = transitText(item, recodeArr[2]);
          break;
        }
        case 4: {
          // 网银
          recodeArr[3] = donateAmount;
          rmPayActivityRules.textArr[3] = transitText(item, recodeArr[3]);
          break;
        }
        case 5: {
          // 支付宝
          recodeArr[1] = donateAmount;
          rmPayActivityRules.textArr[1] = transitText(item, recodeArr[1]);
          break;
        }
        case 101: {
          // 银行卡
          recodeArr[0] = donateAmount;
          rmPayActivityRules.textArr[0] = transitText(item, recodeArr[0]);
          break;
        }
        case 100: {
          // usdt
          recodeArr[6] = donateAmount;
          rmPayActivityRules.textArr[6] = transitText(item, recodeArr[6]);
          break;
        }
        case 0: {
          // 全部
          rmPayActivityRules.allActiveText = transitText(item);
          break;
        }
      }
    });
};

const gotoChat = () => {
  userState._getLineServiceCount();
  window.open(globalState.stationSetting.configCodePc, '_blank');
};

const changeDepositType = (type: string) => {
  componentNameStr.value = type;
  const componentMap = {
    CrPay: markRaw(CrPay),
    OtherPay: markRaw(OtherPay),
    RmPay: markRaw(RmPay),
    ElectronicPay: markRaw(ElectronicPay),
  };
  componentName.name = componentMap[type as keyof typeof componentMap];
};

const serviceClick = () => {
  if (!Object.keys(globalState.stationSetting).length) {
    messageTip({ message: lang('正在获取客服链接, 请刷新页面后重试') });
  } else {
    window.open(globalState.stationSetting.configCodePc, '_blank');
  }
};

watch(componentNameStr, (_: string) => {
  visible.value = envState.vite_show_deposit_tip_dialog && _ === 'RmPay';
});
</script>

<style scoped lang="scss">
.deposit-container {
  padding: 28px 24px;
  font-size: 14px;

  .deposit-title {
    @include flex(flex-start);
    margin-top: 20px;

    span:first-child {
      color: var(--u_c_1);
      font-weight: 600;
      font-size: 18px;
      flex-shrink: 0;
    }

    .service-container {
      margin-left: 10px;
      cursor: pointer;
      @include flex(flex-start);
      &:not(.zh, .zh_tw) {
        margin-left: 30px;
      }
    }

    .question-img {
      width: 18px;
      height: 18px;
      margin: 0 6px;
    }

    .question-txt {
      color: var(--u_c_4);
    }
  }

  .tab-container {
    @include flex(flex-start);
    height: 50px;
    margin-top: 20px;
    .deposit-tab-item {
      width: 93px;
      cursor: pointer;
      position: relative;
      color: var(--u_c_3);
      @include flex(center);
      position: relative;
      height: 100%;
      margin-right: 24px;
      font-weight: 500;
      &:not(.zh, .zh_tw) {
        width: auto;
        min-width: 93px;
      }
      &.on {
        color: var(--u_c_2);

        &:after {
          position: absolute;
          content: '';
          width: 93px;
          height: 3px;
          bottom: 0;
          border-radius: 4px 4px 0 0;
          background: var(--u_c_2);
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .logo {
        margin-right: 7px;
        width: 14px;
      }
    }
  }
  .box-no-deposit-rode {
    @include flex(center, column, nowrap, center);
    margin: 20px;

    .rode-text {
      position: relative;
      top: 10px;
      left: -15px;
    }
  }
}

.notice-dialog-cont {
  color: var(--u_c_5);
  font-weight: 500;
  font-size: 16px;
}

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

.deposit-container {
  &.template_2_002 {
    .deposit-tab-item.on {
      background: linear-gradient(135deg, #33d6fc 0%, #127dfe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      color: transparent;
    }
  }
}
</style>
<style lang="scss">
._jmtip {
  background-color: rgba(40, 41, 47, 1);
  border-radius: 10px;
}

.el-dialog__header {
  background-color: rgb(50, 51, 56);
  border-radius: 10px 10px 0px 0px;
}

.el-dialog__title {
  color: #fff;
  top: -5px;
  position: relative;
}

._tip {
  color: #fff;

  .ctt {
    padding: 10px 15px 45px;
    box-sizing: border-box;
    margin: 0;
    text-align: center;
  }

  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;

    i {
      font-style: normal;
      color: #e3d2a5;
      width: 135px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      // background-color: #cab299;
      border: 1px #c1b3a6 solid;
      border-radius: 20px;
      cursor: pointer;

      &:last-child {
        margin-left: 50px;
        color: #393a41;
        background: linear-gradient(135.44deg, #e7d7a6 0.76%, #dcbf80 97%);
      }
    }
  }
}

.el-dialog__title {
  color: #ceced3;
}
</style>
