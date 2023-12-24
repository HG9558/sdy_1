<template>
  <div class="profile-dialog">
    <el-form
      :model="nickNameForm"
      class="profile-dialog-form"
      ref="nickNameFormRef"
      size="small"
      :rules="nicknameRules">
      <el-form-item prop="nickName">
        <el-input :placeholder="$t_c('新昵称：请输入4-10位中文、英文、数字')" v-model.trim="nickNameForm.nickName">
          <template #prepend>{{ $t_c('昵称：') }}</template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button class="self-footer profile-button" type="primary" @click="_updateNickName" :loading="loading">{{
      $t_c('修改')
    }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
import useGetUserInfoHook from '@/hook/useGetUserHook';
import { api } from '@/api';
import { lang } from '@/i18n';
import type { ruleType } from '@/hook/userRuleHook';

const emits = defineEmits(['update:showDialog']);
const { _getNickNameInfo } = useGetUserInfoHook();
const loading = ref(false);
const nickNameFormRef = ref<FormInstance>();
const nickNameForm = reactive({
  nickName: '',
});

const validateNickname = (_rule: ruleType, value: string, callback: Function) => {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]{4,10}$/;
  if (!value) {
    callback(new Error(lang('请输入昵称')));
  } else if (!reg.test(value)) {
    callback(new Error(lang('请输入正确的昵称格式')));
  } else {
    callback();
  }
};

const nicknameRules = {
  nickName: [
    { min: 4, max: 10, message: lang('昵称格式不正确'), trigger: 'blur' },
    { validator: validateNickname, trigger: 'change' },
  ],
};

const _updateNickName = () => {
  nickNameFormRef?.value?.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    await api.user.updateNickName({ nick: nickNameForm.nickName });
    loading.value = false;
    _getNickNameInfo();
    emits('update:showDialog', false);
    nickNameFormRef?.value?.resetFields();
  });
};
</script>
