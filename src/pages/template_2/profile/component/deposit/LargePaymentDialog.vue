<template>
  <div :class="['large-payment_dialog_wrapper', site]">
    <div class="dialog-content" v-for="(item, index) in renderList" :key="index">
      <div>
        <span class="title" v-html="Array.isArray(item.label) ? item.label[0] : item.label"></span>
        <span class="text"> {{ item.value }}</span>
        <span v-if="Array.isArray(item.label)" class="required-text">{{ item.label[1] }}</span>
      </div>
      <div class="copy" @click="copy(item.value)">
        <img :src="useImgPath('profile/deposit_copy.png')" alt="" class="copy-img" />
        {{ $t_c('复制') }}
      </div>
    </div>

    <template v-if="curRmbChannel && curRmbChannel.code === 'alipayList'">
      <div class="setup_title">{{ $t_c('操作步骤:') }}</div>
      <div class="setup">
        <div>{{ $t_c('1.登录您自己设备上的支付宝账号;') }}</div>
        <div>
          {{ $t_c('2.在支付宝首页点击【转账】按钮，然后选择【转到银行卡】;') }}
        </div>
        <div>
          {{ $t_c('3.复制下方姓名、卡号、金额，到支付宝对应填写，并点击【下一步】') }}
        </div>
        <div>
          {{ $t_c('4.复制下方附言，填写至支付宝“备注”一栏，并确认转账完成付款；') }}
        </div>
        <div>
          {{ $t_c('5.入款成功后，联系客服查询进度。') }}
        </div>
        <div>
          {{ $t_c('6.请严格按照页面显示的金额转账,请勿修改金额会导致慢到账') }}
        </div>
        <div class="attention">
          {{ $t_c('注：切勿保存该卡号，如发现没有提交订单直接转款的，平台有理由不给上分。') }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="setup_title">{{ $t_c('操作步骤:') }}</div>
      <div class="setup">
        <div>{{ $t_c('1.登录您自己设备上的银行APP或银行官网;') }}</div>
        <div>{{ $t_c('2.进入转账页，将该信息复制到收款方;') }}</div>
        <div>
          {{ $t_c('3.入款成功') }}<span class="service">{{ $t_c('联系客服') }}</span
          >{{ $t_c('查询进度。') }}
        </div>
        <div>
          {{ $t_c('4.请严格按照页面显示的金额转账,请勿修改金额会导致慢到账') }}
        </div>
        <div v-if="envState.vite_currency_map.type === 'AUD'">
          {{ $t_c('5.由于澳洲银行首次转账会有Pending问题，所有转账都以到账时间为准。') }}
        </div>
        <div class="attention">
          {{ $t_c('注：切勿保存该卡号，如发现没有提交订单直接转款的，平台有理由不给上分。') }}
        </div>
        <div class="attention">
          {{ $t_c('付款账户姓名与注册姓名需保持一致，否则会导致无法自动到账。') }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import useDialog from '@/hook/useDialog';
import { useImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
// import { useEnvState } from '@/stores';
import { useClipboard } from '@vueuse/core';
import { computed, watch } from 'vue';

const site = useSite();
const envState = useEnvState();
const props = defineProps<{
  bankDialogData: DepositType.applyPayBankInfo;
  curRmbChannel: DepositType.BankRenderListType;
}>();

const { messageTip } = useDialog();
const { copy, copied } = useClipboard();

watch(copied, _ => {
  if (_) messageTip({ message: lang('复制成功！') });
});

const renderList = computed(() => {
  const temp = JSON.parse(JSON.stringify(props.bankDialogData));
  const data = [
    { realName: lang('收款姓名：') },
    { bankAccount: lang('银行卡号：') },
    { bankBranch: lang('开户网点：') },
    { depositAmount: lang('充值金额：') },
    {
      depositPostscript: [lang('附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：'), `(${lang('必须正确填写')})`],
    },
  ];
  return data.map(item => {
    return {
      label: Object.entries(item)[0][1],
      value: temp[Object.entries(item)[0][0]],
    };
  });
});
</script>

<style lang="scss">
.el-dialog {
  .el-dialog__body {
    padding-top: 27px;
    white-space: pre-wrap;

    .large-payment_dialog_wrapper {
      @include flex(center, column, nowrap, flex-start);
      font-size: 14px;
      .dialog-content {
        padding: 0 92px;
        width: 100%;
        @include flex();
        margin-bottom: 10px;
        .title,
        .text {
          font-size: 18px;
          color: var(--u_c_29);
          font-weight: 500;
        }
        .text {
          font-weight: 400;
        }
        .required-text {
          margin-left: 12px;
          color: var(--u_c_30);
          font-size: 14px;
        }
        .copy {
          width: 80px;
          color: var(--u_c_28);
          font-size: 16px;
          cursor: pointer;
          @include flex(center);
          .copy-img {
            width: 13px;
            margin-right: 6px;
          }
        }
      }
      .setup_title {
        margin-left: 92px;
        font-size: 18px;
        font-weight: 500;
      }
      .setup {
        color: var(--u_c_29);
        margin-top: 10px;
        margin-left: 165px;
        font-size: 14px;
        div {
          margin-bottom: 5px;
          @include flex(flex-start);
          text-align: left;

          &.attention {
            color: var(--u_c_30);
          }

          .service {
            color: var(--u_c_31);
          }
        }
      }
    }
  }
}

//- 002
.large-payment_dialog_wrapper {
  &.template_2_002 {
    .copy {
      background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    .setup_title {
      color: #fff;
    }
  }
}
</style>
