<template>
  <el-form
    class="add-bank-card-form"
    :model="bankForm"
    :rules="otherPayRule"
    :label-width="globalState.language === 'zh' ? '150px' : globalState.language === 'vi' ? '270px' : '240px'"
    ref="otherPayFormRef"
    size="small"
    :hide-required-asterisk="true">
    <el-form-item :label="$t_c('钱包类型：')" prop="address">
      <el-select
        class="w-100"
        popper-class="bog"
        :placeholder="$t_c('请选择')"
        v-model="bankForm.address"
        value-key="id">
        <el-option label="EBPAY" value="EBPAY"></el-option>
        <el-option label="TOPAY" value="TOPAY"></el-option>
        <el-option label="GOPAY" value="GOPAY"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t_c('钱包地址：')" prop="cardNo">
      <el-input :placeholder="$t_c('请输入钱包地址')" :maxlength="42" v-model="bankForm.cardNo"></el-input>
    </el-form-item>
    <el-form-item :label="$t_c('确认钱包地址:')" :maxlength="42" prop="checkCardNo">
      <el-input :placeholder="$t_c('请输入确认钱包地址')" v-model="bankForm.checkCardNo"></el-input>
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
import { lang } from '@/i18n';
// import { useGlobalState, useUserState } from '@/stores';
import CountTime from 'commonComponent/CountTime/index.vue';
import Verify from 'commonComponent/Verify/index.vue';
import type { FormInstance } from 'element-plus';
import { onDeactivated, provide, reactive, ref } from 'vue';

const emits = defineEmits(['_getMobileCode']);
const props = defineProps(['otherVerifyType'])
const startCount = ref<boolean>(false);
const userState = useUserState();
const bankVerify = ref();
const otherPayFormRef = ref<FormInstance>();
const globalState = useGlobalState();
const bankForm = reactive<BankAPI.OtherFormType>({
  address: null,
  cardNo: null,
  checkCardNo: '',
  mobile: '',
  code: '',
  captchareg: '',
});

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

//- 图形验证
const useVerify = () => {
  bankVerify.value.show();
};

onDeactivated(() => {
  otherPayFormRef.value?.resetFields();
});

provide('success', bankSuccess);

defineExpose({
  otherPayFormRef,
  bankForm,
  startCount,
});

const otherPayRule = {
  address: [{ required: true, message: lang('请选择钱包类型'), trigger: 'change' }],
  cardNo: [
    { required: true, message: lang('请输入钱包地址'), trigger: ['blur'] },
    // { validator: validateAddress, trigger: "blur" },
  ],
  checkCardNo: [
    { required: true, message: lang('请再次输入钱包地址'), trigger: 'blur' },
    {
      validator: (_: any, value: string, callback: Function) => {
        if (value !== bankForm.cardNo) {
          callback(new Error(lang('两次输入钱包地址不一致，请核对后重新输入!')));
        } else {
          callback();
        }
      },
      trigger: 'blur',
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
