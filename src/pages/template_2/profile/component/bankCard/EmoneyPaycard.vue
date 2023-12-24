<template>
  <el-form
    class="add-bank-card-form"
    :model="bankForm"
    :rules="otherPayRule"
    :label-width="globalState.language === 'zh' ? '150px' : globalState.language === 'vi' ? '270px' : '240px'"
    ref="ePayFormRef"
    size="small"
    :hide-required-asterisk="true">
    <el-form-item :label="$t_c('钱包类型：')" prop="accountType">
      <el-select
        class="w-100"
        popper-class="bog"
        :placeholder="$t_c('请选择')"
        v-model="bankForm.accountType"
        value-key="id">
        <el-option
          :label="item.bankName"
          :value="item.bankCode"
          v-for="item in accountTypeList"
          :key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t_c('钱包账号：')" prop="cardNo">
      <el-input v-model="bankForm.cardNo" :placeholder="$t_c('请输入账号')" type="number" :maxlength="60"></el-input>
    </el-form-item>
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

    <template v-if="globalState.isNeedVfyEMail || globalState.isNeedVfySms || globalState.isNeedGoogle">
      <el-form-item v-if="globalState.isNeedVfySms && otherVerifyType === 'sms'" :label="globalState.isZaloShow ? $t_c('zalo号') + ':' : $t_c('手机号：')">
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
import { lang } from '@/i18n';
// import { useGlobalState, useUserState, useEnvState } from '@/stores';
import CountTime from 'commonComponent/CountTime/index.vue';
import Verify from 'commonComponent/Verify/index.vue';
import type { FormInstance } from 'element-plus';
import { onDeactivated, provide, reactive, ref, onMounted } from 'vue';

const emits = defineEmits(['_getMobileCode']);
const props = defineProps(['otherVerifyType']);
const startCount = ref<boolean>(false);
const userState = useUserState();
const bankVerify = ref();
const ePayFormRef = ref<FormInstance>();
const globalState = useGlobalState();
const bankForm = reactive<BankAPI.EFormType>({
  accountType: null,
  realName: null,
  cardNo: '',
  mobile: '',
  code: '',
  captchareg: '',
});
const envState = useEnvState();
const accountTypeList = reactive<BankAPI.EMoney[]>([]);

watch(() => props.otherVerifyType, () => {
  const formArr = ['code']
  formArr.forEach(item => bankForm[item] = '')
})

//-图形成功点击事件
const bankSuccess = (params: { captchaVerification: string }) => {
  bankForm.captchareg = params.captchaVerification;
  emits('_getMobileCode', {
    captchaVerification: bankForm.captchareg,
    callback: () => {
      startCount.value = true;
    },
  });
};

onMounted(() => {
  _getAccountType();
  bankForm.realName = userState.userInfo.realName as string;
});

const _getAccountType = async () => {
  const res = await api.bank.eMoneys({
    areaCode: envState.vite_currency_map.type === 'RMB' ? 'CN' : envState.vite_currency_map.type,
  });
  if (res.code) return;
  accountTypeList.length = 0;
  accountTypeList.push(...res.eMoneys);
};

//- 图形验证
const useVerify = () => {
  bankVerify.value.show();
};

onDeactivated(() => {
  ePayFormRef.value?.resetFields();
});

provide('success', bankSuccess);

defineExpose({
  ePayFormRef,
  bankForm,
  startCount,
});

const otherPayRule = {
  accountType: [{ required: true, message: lang('请选择钱包类型'), trigger: 'change' }],
  cardNo: [
    {
      required: true,
      message: lang('钱包账号不能为空，请输入钱包账号！'),
      trigger: 'blur',
    },
    {
      min: 1,
      max: 60,
      message: lang('请输入正确的钱包账号'),
      trigger: ['blur', 'change'],
    },
  ],
  captchareg: [
    { required: true, message: lang('验证码不能为空'), trigger: 'blur' },
    {
      validator: (_: any, value: string, callback: Function) => {
        if (!value) {
          callback(new Error(lang('验证码不能为空')));
        } else if (!/[0-9]/.test(value)) {
          callback(new Error(lang('请输入正确验证码')));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
  code: [
    {
      validator: (_: any, value: string, callback: Function) => {
        if (!value) {
          callback(new Error(lang('验证码不能为空')));
        } else if (!/[0-9]{4,6}$/.test(value)) {
          callback(new Error(globalState.isZaloShow ? lang('请输入正确的zalo验证码') : lang('请输入正确的短信验证码')));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
};
</script>

<style scoped lang="scss">
:deep(.sm-code-input) {
  .el-input__suffix {
    display: flex;
    top: 1px;
  }
}
</style>
