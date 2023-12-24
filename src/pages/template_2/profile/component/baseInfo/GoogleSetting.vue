<template>
  <div>
    <!-- <div :class="['warning-text mobile-tip', site]">
      {{ $t_c('为了您的隐私安全，信息在提交后将无法修改。') }}
      {{ $t_c('请务必如实填写，以保护您的账号安全。') }}
    </div> -->
    <div class="profile-dialog">
      <div class="google-box">
        <h1>{{ $t_c('设置谷歌验证器（Google Authenticator）') }}</h1>
        <div>
          <h2>{{ $t_c('1、扫描以下二维码') }}</h2>
          <p>{{ $t_c('在应用中，点击“+”按钮，用手机摄像头扫描二维码') }}</p>
          <div class="google-qr">
            <img :src="qrCode" />
            <span>{{ $t_c('无法扫描二维码？') }}<i @click="getGoogleQrCode">{{ $t_c('刷新') }}</i></span>
          </div>
        </div>
        <div>
          <h2>{{ $t_c('2、输入您的验证码') }}</h2>
          <p>{{ $t_c('请在下面的输入框中输入验证器应用产生的6位验证码') }}</p>
        </div>
      </div>
      <el-form :model="emailForm" class="profile-dialog-form" ref="nickNameFormRef" size="small">
        <el-form-item :rules="googleFormRule.googleCode" prop="googleCode">
          <el-input :placeholder="$t_c('请输入谷歌验证码')" :maxlength="6" v-model="emailForm.code">
            <template #prepend>{{ $t_c('谷歌验证：') }}</template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button class="self-footer profile-button" type="primary" @click="_bingGoogle" :loading="loading">{{
        $t_c('确定')
      }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import useGetUserHook from '@/hook/useGetUserHook';
import useRuleHook from '@/hook/userRuleHook';
import type { FormInstance } from 'element-plus';
import { ref, reactive } from 'vue';
import { lang } from '@/i18n';
import { useSite } from '@/hook/usePath';
// import { useGlobalState } from '@/stores';

const { googleFormRule } = useRuleHook();
const { messageTip } = useDialog();
const { _getUserInfo } = useGetUserHook();
const emits = defineEmits(['update:showDialog']);
const loading = ref(false);
const nickNameFormRef = ref<FormInstance>();
const globalState = useGlobalState();
const site = useSite();
const isDisabeld = ref(true);
const emailForm = reactive({ code: '' });
const qrCode = ref('')

watch(emailForm, () => {
  nickNameFormRef.value?.validateField('email', err => {
    isDisabeld.value = !Boolean(err);
  });
});

onMounted(() => {
  getGoogleQrCode()
})

const getGoogleQrCode = async () => {
  const data: any = await api.user.getGoogleAuthQRCode()
  qrCode.value = "data:image/png;base64," + data.qrCode
}

const _bingGoogle = async () => {
  loading.value = true;
  try {
    const res: any = await api.user.bindGoogleAuth(emailForm);
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

.google-box {
  width: 100%;
  text-align: left;
  h1 {
    font-size: 16px;
    line-height: 22px;
  }
  h2 {
    font-size: 14px;
    line-height: 20px;
    margin-top: 10px;
  }
  p {
    font-size: 12px;
    line-height: 17px;
    color: var(--u_friend_55);
    margin: 10px 0;
  }
  .google-qr {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 120px;
      height: 120px;
      border-radius: 10px;
    }
    span {
      font-size: 14px;
      line-height: 20px;
      color: #73BAFD;
      margin-top: 10px;
    }
    i {
      cursor: pointer;
      text-decoration: underline;
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
