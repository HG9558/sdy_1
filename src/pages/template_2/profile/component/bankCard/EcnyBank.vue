<template>
  <el-form
    :model="bankForm"
    class="add-bank-card-form"
    :label-width="globalState.language === 'zh' ? '156px' : globalState.language === 'vi' ? '270px' : '240px'"
    ref="ecnyBankFormRef"
    size="small"
    :rules="ecnyBankRule"
    :hide-required-asterisk="true">
    <el-form-item :label="$t_c('数字人民币编码：')" prop="cardNo">
      <el-input :placeholder="$t_c('请输入数字人民币编码')" :maxlength="32" v-model="bankForm.cardNo"></el-input>
    </el-form-item>
    <el-form-item :label="$t_c('数字人民币姓名：')" prop="realName">
      <el-input :placeholder="$t_c('请输入数字人民币姓名')" v-model="bankForm.realName"></el-input>
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
// import { useGlobalState, useUserState } from '@/stores';
import CountTime from 'commonComponent/CountTime/index.vue';
import Verify from 'commonComponent/Verify/index.vue';
import type { FormInstance } from 'element-plus';
import { onDeactivated, provide, reactive, ref } from 'vue';
import useRuleHook from '@/hook/userRuleHook';

const bankForm = reactive<BankAPI.EcnyBankFormType>({
  cardNo: '',
  code: '',
  captchareg: '',
  realName: '',
});
const emits = defineEmits(['_getMobileCode']);
const props = defineProps(['otherVerifyType'])
const bankVerify = ref();
const ecnyBankFormRef = ref<FormInstance>();
const userState = useUserState();
const globalState = useGlobalState();
const startCount = ref<boolean>(false);
const { ecnyBankRule } = useRuleHook();

watch(() => props.otherVerifyType, () => {
  const formArr = ['code']
  formArr.forEach(item => bankForm[item] = '')
})

//- 图形验证
const useVerify = () => {
  bankVerify.value.show();
};

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
provide('success', bankSuccess);

onDeactivated(() => {
  ecnyBankFormRef.value?.resetFields();
});

defineExpose({
  ecnyBankFormRef,
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
</style>
