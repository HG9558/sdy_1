<template>
  <el-form
    :class="['add-bank-card-form', globalState.language]"
    :model="bankForm"
    :label-width="
      globalState.language === 'zh'
        ? '150px'
        : globalState.language === 'vi'
        ? '270px'
        : globalState.language === 'ms'
        ? '290px'
        : '240px'
    "
    ref="rmbBankFormRef"
    size="small"
    :rules="rmbBankFormDataRule"
    :hide-required-asterisk="true">
    <el-form-item :label="$t_c('真实姓名：')">
      <el-input
        v-if="userState.bankDifferentName"
        v-model="bankForm.realName"
        :placeholder="$t_c('请输入真实姓名')"></el-input>
      <el-input
        v-else
        :disabled="!!userState.userInfo.realName"
        v-model="bankForm.realName"
        :placeholder="$t_c('请输入真实姓名')"></el-input>
    </el-form-item>

    <template v-if="envState.vite_currency_map.type === 'AUD'">
      <el-form-item :label="$t_c('提款方式：')" prop="bankName">
        <el-col :span="24">
          <el-select class="w-100" @change="changeBankType" :placeholder="$t_c('请选择')" v-model="bankForm.bankName">
            <el-option
              :key="item.id"
              :label="item.bankName"
              :value="item.bankName"
              v-for="item in bankList"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item v-if="isSelectBank" label="BSB:" prop="address">
        <el-input :placeholder="$t_c('请输入BSB码')" :maxlength="10" v-model="bankForm.address"></el-input>
      </el-form-item>

      <el-form-item :label="isSelectBank ? $t_c('账户号码：') : 'PAYID:'" prop="cardNo" :rules="cardNoRule">
        <el-input
          type="text"
          :placeholder="isSelectBank ? $t_c('请输入账户号码') : $t_c('请输入PAYID账号')"
          :maxlength="60"
          v-model="bankForm.cardNo"></el-input>
      </el-form-item>
    </template>

    <template v-else>
      <el-form-item :label="$t_c('银行账号：')" prop="cardNo">
        <el-input
          type="number"
          :placeholder="lang('请输入银行账号')"
          :maxlength="19"
          v-model="bankForm.cardNo"></el-input>
      </el-form-item>

      <el-form-item :label="$t_c('开户银行：')">
        <el-col :span="24">
          <el-select class="w-100" @change="_getCitys" :placeholder="$t_c('请选择')" v-model="bankForm.bankName">
            <el-option
              :key="item.id"
              :label="item.bankName"
              :value="item.bankName"
              v-for="item in bankList"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item
        class="account_area"
        :label="$t_c('开户银行区域：')"
        prop="city"
        v-if="envState.vite_currency_map.type === 'RMB'">
        <el-col :span="11">
          <el-select
            class="province w-100"
            popper-class="bog"
            @change="_getCitys"
            :placeholder="$t_c('请选择')"
            v-model="bankForm.province">
            <el-option
              :key="item.provinceId"
              :label="item.prov"
              :value="item.prov"
              v-for="item in provsList"></el-option>
          </el-select>
        </el-col>

        <el-col :span="11" :offset="2">
          <el-select class="city w-100" popper-class="bog" :placeholder="$t_c('请选择')" v-model="bankForm.city">
            <el-option :key="item.city" :label="item.city" :value="item.city" v-for="item in citysList"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item :label="$t_c('支行名称：')" prop="address">
        <el-input :placeholder="$t_c('请输入支行名称')" :maxlength="50" v-model="bankForm.address"></el-input>
      </el-form-item>
    </template>

    <template v-if="globalState.isNeedVfyEMail || globalState.isNeedVfySms || globalState.isNeedGoogle">
      <el-form-item v-if="globalState.isNeedVfySms && otherVerifyType === 'sms'" :label="globalState.isZaloShow ? $t_c('zalo号') : $t_c('手机号：')">
        <el-input disabled v-model="userState.userInfo.mobile"></el-input>
      </el-form-item>

      <el-form-item v-if="globalState.isNeedVfyEMail && otherVerifyType === 'email'" :label="$t_c('邮箱：')" prop="email">
        <el-input disabled v-model="userState.userInfo.email"></el-input>
      </el-form-item>

      <el-form-item
        v-if="(globalState.isNeedVfySms && otherVerifyType === 'sms') || (globalState.isNeedVfyEMail && otherVerifyType === 'email')"
        class="sm-code-input"
        :label="otherVerifyType === 'email' ? $t_c('邮箱验证码：') : globalState.isZaloShow ? $t_c('zalo验证码') : $t_c('短信验证码：')"
        prop="code">
        <el-col :span="globalState.language === 'zh' ? 12 : 16">
          <el-input
            v-model="bankForm.code"
            :maxlength="6"
            :placeholder="otherVerifyType === 'email' ? $t_c('请输入邮箱验证码') : globalState.isZaloShow ? $t_c('请输入zalo验证码') : $t_c('请输入短信验证码')">
          </el-input>
        </el-col>
        <el-col :span="globalState.language === 'zh' ? 12 : 8" style="text-align: right">
          <count-time
            styleName="rmb_count_time"
            :waitTime="60"
            v-model:startCount="startCount"
            @click="useVerify"
            :isPhoneCode="false" />
        </el-col>
        <Verify mode="pop" captchaType="blockPuzzle" ref="bankVerify" />
      </el-form-item>

      <el-form-item v-if="globalState.isNeedGoogle && otherVerifyType === 'google'" :label="$t_c('谷歌验证码：')" prop="code">
        <el-input v-model="bankForm.code" :maxlength="6"></el-input>
      </el-form-item>

      <template v-if="otherVerifyType === 'sms' && globalState.isZaloShow">
        <el-form-item label="">
          <div style="text-align: left;position: relative; top: -20px; color: #f56c6c; font-size: 12px">
            {{ $t_c('需在手机安装zalo并手机号注册账户才能接收验证码') }}
          </div>
        </el-form-item>
      </template>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { api } from '@/api';
// import { useEnvState, useGlobalState, useUserState } from '@/stores';
import getBankcardInfo from 'bankcardinfo';
import CountTime from 'commonComponent/CountTime/index.vue';
import Verify from 'commonComponent/Verify/index.vue';
import { computed, onDeactivated, onMounted, provide, reactive, ref, watch } from 'vue';
import useRuleHook from '@/hook/userRuleHook';
import useDialog from '@/hook/useDialog';
import type { FormInstance } from 'element-plus';
import { lang } from '@/i18n';

const { rmbBankFormDataRule } = useRuleHook();
const userState = useUserState();
const provsList = reactive<BankAPI.Prov[]>([]);
const citysList = reactive<BankAPI.CityData[]>([]);
const bankList = reactive<BankAPI.BankData[]>([]);
const startCount = ref<boolean>(false);
const { messageTip } = useDialog();
const timer = ref<number>(0);
const rmbBankFormRef = ref<FormInstance>();
const bankVerify = ref();
const emits = defineEmits(['_getMobileCode']);
const globalState = useGlobalState();
const envState = useEnvState();
const props = defineProps(['otherVerifyType'])

const bankForm = reactive<BankAPI.rmbBankFormType>({
  address: '',
  bankName: '',
  cardNo: '',
  city: '',
  province: '',
  code: '',
  captchareg: '',
});

onMounted(() => {
  envState.vite_currency_map.type === 'RMB' && _getProvs();
  _getBackEndBankList();
  bankForm.realName = userState.userInfo.realName;
});

watch(() => props.otherVerifyType, () => {
  const formArr = ['code']
  formArr.forEach(item => bankForm[item] = '')
})

const changeBankType = () => {
  bankForm.cardNo = '';
  rmbBankFormRef.value?.clearValidate();
};

const isSelectBank = computed(() => bankForm.bankName !== 'PAYID');

const cardNoRule = computed(() => [
  {
    required: true,
    message: isSelectBank.value ? lang('账户号码不能为空！') : lang('PAYID不能为空！'),
    trigger: 'blur',
    min: 1,
    max: 60,
  },
]);

//- 省份
const _getProvs = async () => {
  const res = await api.bank.getProvs();
  if (res.code) return;
  provsList.length = 0;
  provsList.push(...res.provs);
  if (provsList.length) {
    bankForm.province = provsList[0].prov;
    _getCitys();
  }
};
//- 城市
const _getCitys = async () => {
  if (envState.vite_currency_map.type !== 'RMB') return;
  const res = await api.bank.getCitys({ prov: bankForm.province });
  if (res.code) return;
  citysList.length = 0;
  citysList.push(...res.citys);
  bankForm.city = citysList[0].city;
};

//- 查询银行名称
const getBankName = () => {
  getBankcardInfo.getBankBin(bankForm.cardNo, (err: any, data: { bankName: any }) => {
    if (err) {
      bankForm.bankName = '';
      return messageTip({ message: lang('请输入正确的银行卡号或暂不支持该银行') });
    }
    data.bankName && (bankForm.bankName = data.bankName);
  });
};

const useVerify = () => {
  bankVerify.value.show();
};

const bankSuccess = (params: { captchaVerification: string }) => {
  bankForm.captchareg = params.captchaVerification;
  emits('_getMobileCode', {
    captchaVerification: bankForm.captchareg,
    callback: () => {
      startCount.value = true;
    },
  });
};

const _getBackEndBankList = async () => {
  const res = await api.bank.getBackEndBankList(
    envState.vite_currency_map.type !== 'RMB' ? { areaCode: envState.vite_currency_map.type } : {}
  );
  if (res.code) return;
  bankList.length = 0;
  bankList.push(...res.banks);
};

watch(
  () => bankForm.cardNo,
  (_: string) => {
    if (envState.vite_currency_map.type !== 'RMB') return;
    if (timer.value > 0) {
      clearTimeout(timer.value);
    }
    timer.value = setTimeout(getBankName, 3000);
  }
);

onDeactivated(() => {
  rmbBankFormRef.value?.resetFields();
  timer.value && clearTimeout(timer.value);
});

provide('success', bankSuccess);

defineExpose({
  rmbBankFormRef,
  bankForm,
  startCount,
});
</script>

<style scoped lang="scss">
:deep(.sm-code-input) {
  .el-input__inner {
    width: 288px;
  }

  .el-input__suffix-inner {
    @include flex(center);
  }
}

.add-bank-card-form {
  &:not(.zh, .zh_tw) {
    :deep() {
      .sm-code-input {
        .el-input__inner {
          width: auto;
        }
      }
    }
  }
}
</style>
