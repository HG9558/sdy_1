<template>
  <!-- 修改密码弹窗 -->
  <div :class="['profile-dialog', site]">
    <el-form
      :model="pwdForm"
      label-position="left"
      :rules="pwdFormRules"
      class="profile-dialog-form"
      ref="pwdFormRef"
      size="small">
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
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { useSite } from '@/hook/usePath';
import { lang } from '@/i18n';

const site = useSite();
const { messageTip } = useDialog();
const loading = ref(false);
const pwdFormRef = ref<FormInstance>();
const pwdForm = reactive({
  lastPwd: '',
  pwd: '',
  confirmPwd: '',
});
const emits = defineEmits(['update:showDialog']);

const validateLastPass = async (_rule: ruleType, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error(lang('请输入原密码')));
  } else {
    const res = await api.user.verifyPwd({ lastPwd: value });
    if (res.code) return;
    res.msg ? callback() : callback(new Error(lang('原密码错误')));
  }
};

const validatePass = (_rule: ruleType, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error(lang('请输入新密码')));
  } else {
    if (pwdForm.lastPwd === value) {
      callback(new Error(lang('新密码不能与旧密码相同')));
    } else {
      if (pwdForm.confirmPwd !== '') {
        pwdFormRef.value?.validateField('confirmPwd');
      }
      callback();
    }
  }
};

const validatePass2 = (_rule: ruleType, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error(lang('请再次输入新密码')));
  } else if (value !== pwdForm.pwd) {
    callback(new Error(lang('两次输入密码不一致!')));
  } else {
    callback();
  }
};

const pwdFormRules = {
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
  pwdFormRef.value?.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      const res = await api.user.modPwd(pwdForm);
      loading.value = false;
      if (res.code) return;
      messageTip({ message: lang('您的信息修改成功'), type: 'success' });
      emits('update:showDialog', false);
      pwdFormRef.value?.resetFields();
    } catch (error) {
      emits('update:showDialog', false);
    }
  });
};
</script>
