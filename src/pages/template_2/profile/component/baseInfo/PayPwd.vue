<template>
  <!-- 修改密码弹窗 -->
  <div :class="['profile-dialog', site]">
    <el-form
      :model="pwdForm"
      label-position="left"
      :rules="pwdFormRules"
      class="profile-dialog-form"
      ref="paypwdFormRef"
      size="small">
      <el-form-item prop="securePwd" v-if="!isHavePwd">
        <el-input type="password" :placeholder="$t_c('请输入您的支付密码')" :maxlength="18" v-model="pwdForm.securePwd">
          <template #prepend>{{ $t_c('支付密码：') }}</template>
        </el-input>
      </el-form-item>
      <template v-else>
        <el-form-item prop="lastPwd">
          <el-input type="password" :placeholder="$t_c('请输入您的原始密码')" :maxlength="18" v-model="pwdForm.lastPwd">
            <template #prepend>{{ $t_c('原密码：') }}</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            type="password"
            :placeholder="$t_c('新密码（6-18位数字字母组合）')"
            prop="pwd"
            :maxlength="18"
            v-model="pwdForm.pwd">
            <template #prepend>{{ $t_c('新密码：') }}</template>
          </el-input>
        </el-form-item>
      </template>
      <el-form-item prop="confirmPwd">
        <el-input type="password" :placeholder="$t_c('再次输入新密码')" :maxlength="18" v-model="pwdForm.confirmPwd">
          <template #prepend>{{ $t_c('确认密码：') }}</template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button class="self-footer profile-button" type="primary" @click="_updatePassword" :loading="loading">{{
      $t_c('确定')
    }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import type { ruleType } from '@/hook/userRuleHook';
import useGetUserHook from '@/hook/useGetUserHook';
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { useSite } from '@/hook/usePath';
import { lang } from '@/i18n';

const { _getUserInfo } = useGetUserHook();
const site = useSite();
const { messageTip } = useDialog();
const loading = ref(false);
const paypwdFormRef = ref<FormInstance>();
const pwdForm = reactive({
  lastPwd: '',
  pwd: '',
  confirmPwd: '',
  securePwd: ''
});
const emits = defineEmits(['update:showDialog']);

const userState = useUserState()

const isHavePwd = computed(() => {
  return !!userState.userInfo.securePwd
})

const validateLastPass = async (_rule: ruleType, value: string, callback: Function) => {
  if (value === '') return callback(new Error(lang('请输入原密码')));
  callback()
};

const validatePass = (_rule: ruleType, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error(lang('请输入新密码')));
  } else {
    if (pwdForm.lastPwd === value) {
      callback(new Error(lang('新密码不能与旧密码相同')));
    } else {
      if (pwdForm.confirmPwd !== '') {
        paypwdFormRef.value?.validateField('confirmPwd');
      }
      callback();
    }
  }
};

const validatePass2 = (_rule: ruleType, value: string, callback: Function) => {
  if (value === '') {
    return callback(new Error(lang('请再次输入新密码')));
  }
  if (isHavePwd.value) {
    if (value !== pwdForm.pwd) return callback(new Error(lang('两次输入密码不一致!')));
  } else {
    if (value !== pwdForm.securePwd) return callback(new Error(lang('两次输入密码不一致!')));
  }
  callback();
};

const pwdFormRules = {
  securePwd: [
    { min: 6, max: 18, message: lang('密码不符合要求'), trigger: 'blur' },
  ],
  lastPwd: [
    { min: 6, max: 18, message: lang('密码不符合要求'), trigger: 'blur' },
    { validator: validateLastPass, trigger: 'blur' },
  ],
  pwd: [
    { min: 6, max: 18, message: lang('密码不符合要求'), trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' },
  ],
  confirmPwd: [
    { min: 6, max: 18, message: lang('密码不符合要求'), trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' },
  ],
};

const _updatePassword = async () => {
  paypwdFormRef.value?.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      const data: any = isHavePwd.value ? { lastPwd: pwdForm.lastPwd, pwd: pwdForm.pwd } : { securePwd: pwdForm.securePwd }
      const res = isHavePwd.value ? await api.user.modScPwd(data) : await api.user.setSecurePwdOfFirst(data);
      loading.value = false;
      if (res.code) return;
      _getUserInfo()
      messageTip({ message: lang('您的信息修改成功'), type: 'success' });
      emits('update:showDialog', false);
      paypwdFormRef.value?.resetFields();
    } catch (error) {
      emits('update:showDialog', false);
    }
  });
};
</script>
