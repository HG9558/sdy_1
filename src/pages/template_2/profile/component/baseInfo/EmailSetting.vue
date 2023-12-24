<template>
  <div>
    <div :class="['warning-text mobile-tip', site]">
      {{ $t_c('为了您的隐私安全，信息在提交后将无法修改。') }}
      {{ $t_c('请务必如实填写，以保护您的账号安全。') }}
    </div>
    <div class="profile-dialog">
      <el-form :model="emailForm" class="profile-dialog-form" ref="nickNameFormRef" size="small">
        <el-form-item :rules="emialRule" prop="email">
          <el-input :placeholder="$t_c('请输入您的电子邮箱')" v-model="emailForm.email">
            <template #prepend>{{ $t_c('电子邮箱：') }}</template>
          </el-input>
        </el-form-item>

        <el-form-item prop="mobileCaptchareg" :class="['mobile-code-input', globalState.language]">
          <el-input
            class="smcode-input"
            clearable
            v-model="emailForm.code"
            :maxlength="6"
            :placeholder="$t_c('请输入邮箱验证码')">
            <template #prepend>{{ $t_c('验证码：') }}</template>
          </el-input>
          <count-time
            :class="['profile-smcode', globalState.language]"
            :waitTime="60"
            v-model:startCount="startCount"
            @click="useVerify"
            :isPhoneCode="isDisabeld"></count-time>
        </el-form-item>
      </el-form>
      <el-button class="self-footer profile-button" type="primary" @click="_bingEmail" :loading="loading">{{
        $t_c('确定')
      }}</el-button>
    </div>
    <Verify @success="mbSuccess" mode="pop" captchaType="blockPuzzle" ref="mbVerify" />
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import useGetUserHook from '@/hook/useGetUserHook';
import type { FormInstance } from 'element-plus';
import { ref, reactive } from 'vue';
import { lang } from '@/i18n';
import { useSite } from '@/hook/usePath';
// import { useGlobalState } from '@/stores';

const { messageTip } = useDialog();
const { _getUserInfo } = useGetUserHook();
const emits = defineEmits(['update:showDialog']);
const loading = ref(false);
const nickNameFormRef = ref<FormInstance>();
const startCount = ref(false);
const globalState = useGlobalState();
const site = useSite();
const isDisabeld = ref(true);
const mbVerify = ref();
const emailForm = reactive({ email: '', code: '', captchaVerification: '' });

watch(emailForm, () => {
  nickNameFormRef.value?.validateField('email', err => {
    isDisabeld.value = !Boolean(err);
  });
});

const emialRule = [
  { required: true, message: lang('请输入邮箱地址'), trigger: 'blur' },
  {
    type: 'email',
    message: lang('请输入正确的邮箱地址'),
    trigger: ['blur', 'change'],
  },
];

const mbSuccess = (params: { captchaVerification: string }) => {
  emailForm.captchaVerification = params.captchaVerification;
  _getEmailCode();
};

const _getEmailCode = async () => {
  const res = await api.common.sendMailCode({
    module: 7,
    captchaVerification: emailForm.captchaVerification,
    email: emailForm.email,
  });

  if (res.code === 0) {
    startCount.value = true;
    messageTip({ message: lang('发送成功'), type: 'success' });
  } else {
    messageTip({ message: lang('发送失败') });
  }
};

const useVerify = () => {
  mbVerify.value.show();
};

const _bingEmail = async () => {
  loading.value = true;
  try {
    const res = await api.user.setAccMail(emailForm);
    loading.value = false;
    if (res.code) return;
    messageTip({ message: lang('您的信息修改成功'), type: 'success' });
    _getUserInfo();
    emits('update:showDialog', false);
    nickNameFormRef.value?.resetFields();
  } catch (error) {
    loading.value = false;
  }
};

provide('success', mbSuccess);
</script>

<style lang="scss" scoped>
.mobile-tip {
  padding: 30px 30px 0px;
}
.profile-dialog {
  /* flex-wrap: nowrap; */
  .email-form {
    width: 100%;
  }
}

.mobile-code-input {
  &:deep(.el-form-item__content) {
    flex-wrap: nowrap;
    .smcode-input {
      width: 280px;
    }
    .el-input__wrapper {
      width: 220px !important;
      margin-right: 40px;
      .el-input__inner {
        width: 284px;
      }
    }
    .profile-smcode {
      margin-left: 29px;
      height: 44px;
      font-size: 14px;
      &.ms {
        margin-left: 20px;
      }
    }
  }
  &:not(.zh, .zh_tw) {
    .smcode-input {
      width: auto;
    }
    &:deep(.el-form-item__content) {
      .el-input__wrapper {
        width: 250px !important;
        .el-input__inner {
          width: 384px;
        }
      }
    }
  }
}

.template_2_003.mobile-tip {
  background: rgba(246, 248, 254, 0.8) !important;
  border: 5px solid #ffffff;
  border-bottom: none;
  border-top: none;
}
</style>
