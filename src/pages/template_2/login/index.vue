<template>
  <layout-component>
    <!--  用户名密码登录 -->
    <template v-if="isAccountLogin">
      <el-form
        :model="accountLoginForm"
        :rules="accountLoginRule"
        ref="accountLoginFormRef"
        key="accountLoginFormRef"
        :class="['login-from', globalState.language]">
        <el-form-item prop="loginName">
          <el-input
            class="login-user-input"
            v-model="accountLoginForm.loginName"
            :maxlength="16"
            clearable
            :placeholder="$t_c('用户名')">
            <template #prepend>
              <img :src="useImgPath('login/icon-user.png')" slot="prefix" alt="" width="20"
            /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="login-password-input"
            v-model.trim="accountLoginForm.password"
            type="password"
            :maxlength="18"
            clearable
            :placeholder="$t_c('密码')">
            <template #prepend>
              <img :src="useImgPath('login/icon-lock.png')" slot="prefix" alt="" width="20"
            /></template>
          </el-input>
        </el-form-item>
        <el-form-item class="code-from" prop="captcha">
          <Verify @success="success" ref="verifyRef" />
        </el-form-item>
      </el-form>
    </template>

    <!-- 手机号码登录 -->
    <template v-else>
      <el-form
        v-if="globalState.isNeedVfySms && otherVerifyType === 'sms'"
        :class="['login-from', 'mobile-login-form', site, globalState.language]"
        :model="mobileLoginForm"
        :rules="mobileLoginRule"
        ref="mobileLoginFormRef"
        key="mobileLoginForm">
        <el-form-item :rules="mobileLoginRule.mobile" :class="['mobile-select', site]" prop="mobile">
          <MobileAreaCodesSelect v-model="mobileAreaCode" @select="mobileAreaCodeSelect" />
          <el-input
            class="mobile-input"
            v-model="mobileLoginForm.mobile"
            :maxlength="mobileLoginRule.mobile[0].maxlength"
            clearable
            :placeholder="globalState.isZaloShow ? $t_c('zalo号') : $t_c('手机号')">
            <template #prepend>
              <img :src="useImgPath('login/icon-iphone.png')" slot="prefix" alt="" width="20"
            /></template>
          </el-input>
        </el-form-item>

        <el-form-item class="code-input" prop="mobileCaptcha">
          <el-input
            v-model="mobileLoginForm.mobileCaptcha"
            :maxlength="6"
            :placeholder="
              globalState.isZaloOpen && globalState.mobileAreaCode === '84' ? $t_c('zalo验证码') : $t_c('短信验证码')
            "
            class="mobile-code-input">
            <template #prepend>
              <img :src="useImgPath('login/icon-code.png')" slot="prefix" alt="" width="25"
            /></template>
          </el-input>
          <Verify @success="success" ref="phVerifyRef" />
          <div class="mobile-login-btn">
            <count-time
              class="login-phone"
              :waitTime="60"
              v-model:startCount="startCount"
              @click="useVerify('phVerifyRef')"
              :isPhoneCode="isPhoneCode"></count-time>
          </div>
        </el-form-item>
        <div
          style="text-align: left; position: relative; top: -20px; color: #f56c6c; font-size: 12px"
          v-show="globalState.isZaloOpen && globalState.mobileAreaCode === '84'">
          {{ $t_c('需在手机安装zalo并手机号注册账户才能接收验证码') }}
        </div>
      </el-form>

      <el-form
        v-if="globalState.isNeedVfyEMail && otherVerifyType === 'email'"
        :class="['login-from', 'mobile-login-form', site, globalState.language]"
        :model="emailLoginForm"
        :rules="emailFormRule"
        ref="emailLoginFormRef"
        key="emailLoginForm">
        <el-form-item prop="email">
          <el-input
            prefix-icon="Message"
            class="mobile-input email"
            v-model="emailLoginForm.email"
            clearable
            :placeholder="$t_c('邮箱')">
            <!-- <template #prepend >
              <img :src="useImgPath('login/icon-iphone.png')" slot="prefix" alt="" width="20"
            /></template> -->
          </el-input>
        </el-form-item>

        <el-form-item class="code-input" prop="code">
          <el-input
            v-model="emailLoginForm.code"
            :maxlength="6"
            :placeholder="$t_c('邮箱验证码')"
            class="mobile-code-input">
            <template #prepend>
              <img :src="useImgPath('login/icon-code.png')" slot="prefix" alt="" width="25"
            /></template>
          </el-input>
          <Verify @success="success" ref="phVerifyRef" />
          <div class="mobile-login-btn">
            <count-time
              class="login-phone"
              :waitTime="60"
              v-model:startCount="startCount"
              @click="useVerify('phVerifyRef')"
              :isPhoneCode="isPhoneCode"></count-time>
          </div>
        </el-form-item>
      </el-form>

      <el-form
        v-if="globalState.isNeedGoogle && otherVerifyType === 'google'"
        :class="['login-from', 'mobile-login-form', site, globalState.language]"
        :model="googleLoginForm"
        :rules="googleFormRule"
        ref="googleLoginFormRef"
        key="googleLoginForm">
        <el-form-item prop="loginName">
          <el-input
            class="login-user-input"
            v-model="googleLoginForm.loginName"
            :maxlength="16"
            clearable
            :placeholder="$t_c('用户名')">
            <template #prepend>
              <img :src="useImgPath('login/icon-user.png')" slot="prefix" alt="" width="20"
            /></template>
          </el-input>
        </el-form-item>

        <el-form-item class="code-input" prop="googleCode">
          <el-input
            v-model="googleLoginForm.googleCode"
            :maxlength="6"
            :placeholder="$t_c('谷歌验证码')"
            class="mobile-code-input">
            <template #prepend>
              <img :src="useImgPath('login/icon-code.png')" slot="prefix" alt="" width="25"
            /></template>
          </el-input>
        </el-form-item>
      </el-form>
    </template>

    <div :class="['forget-div', globalState.language]" v-if="isAccountLogin && (globalState.isNeedVfySms || globalState.isNeedVfyEMail || globalState.isNeedGoogle)">
      <span class="c-r" @click="router.push('/forgetpsw')">
        {{ $t_c('忘记密码?') }}
      </span>
    </div>
    <el-button
      :class="['login-btn', globalState.language]"
      :disabled="btnDisabled"
      :loading="isLoading"
      @click="
        loginBtnClick(
          isAccountLogin ? accountLoginFormRef : otherVerifyType === 'sms' ? mobileLoginFormRef : otherVerifyType === 'email' ? emailLoginFormRef : googleLoginFormRef
        )
      ">
      <span class="login_txt_wrapper">
        {{ loadingTxtShow ? 'Loading' : $t_c('登录') }}
        <LoadingTxt v-if="loadingTxtShow" />
      </span>
    </el-button>

    <div :class="['goto-other', globalState.language]">
      <span v-if="globalState.isNeedVfySms || globalState.isNeedVfyEMail || globalState.isNeedGoogle" @click="changeLoginType">{{
        isAccountLogin ? $t_c('其他方式登录') : $t_c('账号登录')
      }}</span>
      <span class="register-new-account">
        <span class="to-register" @click="router.push('/login/register')">{{ $t_c('注册新账号') }}</span>
        <span class="line">|</span>
        <span class="no-login" @click="router.push('/home')">{{ $t_c('先去逛逛') }}</span></span
      >
    </div>

    <div v-show="!isAccountLogin" class="other-verify">
      <div v-if="globalState.isNeedGoogle && otherVerifyType !== 'google'" class="verify-item verify-google" @click="otherVerifyType = 'google'">
        <span>{{ $t_c('谷歌验证') }}</span>
      </div>
      <div v-if="globalState.isNeedVfyEMail && otherVerifyType !== 'email'" class="verify-item verify-email" @click="otherVerifyType = 'email'">
        <span>{{ $t_c('邮箱验证') }}</span>
      </div>
      <div v-if="globalState.isNeedVfySms && otherVerifyType !== 'sms'" class="verify-item verify-sms" @click="otherVerifyType = 'sms'">
        <span>{{ $t_c('短信验证') }}</span>
      </div>
    </div>

    <!-- 锁定弹窗 -->
    <self-dialog
      v-model:isShow="isShowLocked"
      :dialogTitle="$t_c('提示')"
      :confirmTxt="$t_c('我知道了')"
      :showCancel="false"
      :appendToBody="true">
      <div class="notice-dialog-cont">
        {{ $t_c('您输入密码错误次数过多，账号已锁定15分钟，请稍后再试。您可以点击') }}
        <span class="lock-btn" @click="onLockJump(1)">{{ $t_c('忘记密码') }}</span>
        {{ $t_c('来修改密码或者咨询') }}
        <span class="lock-btn" @click="onLockJump(2)">{{ $t_c('在线客服') }}</span>
        {{ $t_c('帮您解锁。') }}
      </div>
    </self-dialog>
  </layout-component>
</template>

<script setup lang="ts">
import LayoutComponent from './component/Layout.vue';
import Verify from 'commonComponent/Verify/index.vue';
import selfDialog from 'commonComponent/Dialog/Dialog.vue';
import CountTime from 'commonComponent/CountTime/index.vue';
import MobileAreaCodesSelect from 'commonComponent/MobileAreaCodesSelect/index.vue';
import { provide, reactive, ref, watch } from 'vue';
import useRuleHook from '@/hook/userRuleHook';
import useGetUserHook from '@/hook/useGetUserHook';
import type { FormInstance } from 'element-plus';
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { useRouter } from 'vue-router';
import { useImgPath, useSite } from '@/hook/usePath';
import { lang } from '@/i18n';
import LoadingTxt from 'commonComponent/LoadingText/LoadingText.vue';

const googleIcon = `url(${useImgPath('login/icon-google.png')}) no-repeat center`;
const emailIcon = `url(${useImgPath('login/icon-email.png')}) no-repeat center`;
const smsIcon = `url(${useImgPath('login/icon-sms.png')}) no-repeat center`;

const site = useSite();
const userState = useUserState();
const globalState = useGlobalState();
const router = useRouter();
const { messageTip } = useDialog();
const { accountLoginRule, mobileLoginRule, emailFormRule, googleFormRule } = useRuleHook();
const { _getNickNameInfo } = useGetUserHook();
const isAccountLogin = ref(true);
const btnDisabled = ref(true);
const isLoading = ref(false);
const isShowLocked = ref(false);
const startCount = ref(false);
const isPhoneCode = ref(true);
const captchaVerification = ref('');
const accountLoginFormRef = ref<FormInstance>();
const mobileLoginFormRef = ref<FormInstance>();
const emailLoginFormRef = ref<FormInstance>();
const googleLoginFormRef = ref<FormInstance>();
const normalState = useNormalState();
const loadingTxtShow = ref(false);
const mobileAreaCode = ref(normalState.mobileAreaCode);
const otherVerifyType = ref('')

watch(() => globalState.isNeedGoogle, () => {
  const { isNeedVfySms, isNeedVfyEMail, isNeedGoogle } = globalState
  if (isNeedVfySms) {
    otherVerifyType.value = 'sms'
  } else if (isNeedVfyEMail) {
    otherVerifyType.value = 'email'
  } else if (isNeedGoogle) {
    otherVerifyType.value = 'google'
  } else {
    otherVerifyType.value = ''
  }
}, { immediate: true })

watch(
  () => mobileAreaCode.value,
  (_: string) => {
    normalState.setMobileAreaCode(_);
  }
);

const accountLoginForm = reactive({
  loginName: '',
  password: '',
});

const mobileLoginForm = reactive({
  mobile: '',
  captchaVerification: '',
  mobileCaptcha: '',
});

const emailLoginForm = reactive({
  email: '',
  captchaVerification: '',
  code: '',
});

const googleLoginForm = reactive({
  loginName: '',
  googleCode: '',
});

const verifyRef = ref();
const phVerifyRef = ref();

watch(
  accountLoginForm,
  async () => {
    const bol = Object.values(accountLoginForm).some(item => !item);
    if (bol) return (btnDisabled.value = true);
    btnDisabled.value = !(await new Promise(resolve => accountLoginFormRef?.value?.validate(resolve)));
  },
  { deep: true }
);

watch(
  mobileLoginForm,
  async () => {
    mobileLoginFormRef?.value?.validateField('mobile', err => {
      isPhoneCode.value = !Boolean(err);
    });
    const bol = Object.values(mobileLoginForm).some(item => !item);
    if (bol) return (btnDisabled.value = true);
    btnDisabled.value = !(await new Promise(resolve => mobileLoginFormRef?.value?.validate(resolve)));
  },
  { deep: true }
);

watch(
  emailLoginForm,
  async () => {
    emailLoginFormRef?.value?.validateField('email', err => {
      isPhoneCode.value = !Boolean(err);
    });
    const bol = Object.values(emailLoginForm).some(item => !item);
    if (bol) return (btnDisabled.value = true);
    btnDisabled.value = !(await new Promise(resolve => emailLoginFormRef?.value?.validate(resolve)));
  },
  { deep: true }
);

watch(
  googleLoginForm,
  async () => {
    const bol = Object.values(googleLoginForm).some(item => !item);
    if (bol) return (btnDisabled.value = true);
    btnDisabled.value = !(await new Promise(resolve => googleLoginFormRef?.value?.validate(resolve)));
  },
  { deep: true }
);

const mobileAreaCodeSelect = (code: string) => {
  mobileLoginForm.mobile = '';
  mobileAreaCode.value = code;
};

//- 发起登录请求
const _loginForm = async (loginData: API.loginParams | API.loginByEmailParams) => {
  btnDisabled.value = true;
  loadingTxtShow.value = true;
  try {
    let res;
    if (otherVerifyType.value === 'email' && !isAccountLogin.value) {
      res = await api.common.loginByEmail(loginData as API.loginByEmailParams);
    } else if (otherVerifyType.value === 'google' && !isAccountLogin.value) {
      res = await api.common.loginByGoogle(loginData as API.loginByGoogleParams);
    } else {
      // 短信验证登陆
      res = await api.user.userLogin(loginData as API.loginParams);
    }
    if (res.code === 0) {
      userState.set_user_info(res.userInfo);
      userState.setToken(res.token);
      _getNickNameInfo();
      userState._searchCrFlagType(); //- 是否可以使用虚拟币
      if (globalState.equipmentId) {
        await api.user.sendEquipmentId({
          deviceUuid: globalState.equipmentId,
          deviceType: 'PC',
          browserType: window.navigator.appCodeName || 'unkonw',
        });
      }
      loadingTxtShow.value = false;
      router.replace('/home');
    } else if (res.code === 10086) {
      isShowLocked.value = true;
    } else {
      messageTip({
        message: res.msg as string,
        type: 'error',
        duration: 500,
      });
    }
    loadingTxtShow.value = false;
    btnDisabled.value = false;
  } catch (error) {
    btnDisabled.value = false;
    loadingTxtShow.value = false;
  }
};

//- 滑动验证码检测
const success = (params: { captchaVerification: string }) => {
  if (isAccountLogin.value) {
    captchaVerification.value = params.captchaVerification;
    _checkVfydevice();
  } else {
    if (otherVerifyType.value === 'sms') {
      Object.assign(mobileLoginForm, {
        captchaVerification: params.captchaVerification,
      });
      _getPhoneMesCode();
    } else if (otherVerifyType.value === 'email') {
      Object.assign(emailLoginForm, {
        captchaVerification: params.captchaVerification,
      });
      _getEmailMesCode();
    }
  }
};

///邮箱登录验证码
const _getEmailMesCode = async () => {
  const res = await api.common.sendEmailCodeLog({
    email: emailLoginForm.email,
    captchaVerification: emailLoginForm.captchaVerification,
  });
  if (res.code === 0) {
    startCount.value = true;
    messageTip({ message: lang('发送成功'), type: 'success' });
  } else {
    messageTip({ message: res.msg, duration: 1000 });
  }
};

//- 获取手机号
const _getPhoneMesCode = async () => {
  const res = await api.user.sendMobCodeLog({
    mobile: mobileLoginForm.mobile,
    captchaVerification: mobileLoginForm.captchaVerification,
    mobileAreaCode: mobileAreaCode.value,
  });
  if (res.code === 0) {
    startCount.value = true;
    messageTip({ message: lang('发送成功，请查看手机'), type: 'success' });
  } else {
    messageTip({ message: res.msg, duration: 1000 });
  }
};

const _checkVfydevice = async () => {
  let loginData = {};
  if (isAccountLogin.value) {
    loginData = Object.assign({}, accountLoginForm, {
      captchaVerification: captchaVerification.value,
    });
  } else {
    if (otherVerifyType.value === 'sms') {
      loginData = {
        mobile: mobileLoginForm.mobile,
        mobileCaptcha: mobileLoginForm.mobileCaptcha,
        mobileAreaCode: mobileAreaCode.value,
      };
    } else if (otherVerifyType.value === 'email') {
      loginData = {
        email: emailLoginForm.email,
        mailCaptcha: emailLoginForm.code,
      };
    } else if (otherVerifyType.value === 'google') {
      loginData = {
        loginName: googleLoginForm.loginName,
        googleCode: googleLoginForm.googleCode,
      };
    }
  }
  _loginForm({ ...loginData, loginType: 0 });
};

const loginBtnClick = (formEl: FormInstance | undefined) => {
  formEl?.validate(async (valid: any) => {
    if (!valid) return;
    if (!isAccountLogin.value) {
      _checkVfydevice();
    } else {
      isLoading.value = true;
      const res = await api.user.isNeedSliderCheck({
        loginName: accountLoginForm.loginName,
      });
      isLoading.value = false;
      if (res.code) return;
      if (res.msg || captchaVerification.value) {
        _checkVfydevice();
      } else {
        useVerify('verifyRef');
      }
    }
  });
};

const useVerify = (type: string) => {
  type === 'verifyRef' ? verifyRef.value.show() : phVerifyRef.value.show();
};

const changeLoginType = () => {
  isAccountLogin.value ? accountLoginFormRef?.value?.clearValidate() : mobileLoginFormRef?.value?.clearValidate();
  isAccountLogin.value = !isAccountLogin.value;
  btnDisabled.value = true;
};

const { stationSetting } = globalState;
const onLockJump = (type: number) => {
  if (type === 1) {
    router.push({ path: '/forgetpsw' });
  } else {
    let customerUrl = stationSetting && (stationSetting.configCodePc || stationSetting.configCodePc1);
    window.open(customerUrl);
  }
};

provide('success', success);
</script>

<style scope lang="scss">
.login-from {
  margin-top: 40px;

  &.vi {
    .el-input {
      width: 505px !important;
    }
  }

  &.mobile-login-form {
    .el-form-item {
      margin-bottom: 38px;
    }
  }

  .el-form-item {
    &.mobile-select {
      .el-form-item__error {
        margin-left: 150px;
      }

      .el-input__inner {
        padding-left: 100px;
      }
    }

    .login-password-input + .el-form-item__error {
      width: 280px;
    }

    .el-input {
      width: 465px;
      height: 50px;
      font-size: 16px;
      border-radius: 8px;

      &.login-user-input {
        margin-bottom: 0px;
      }

      &.login-password-input {
        margin-top: 20px;
        margin-bottom: 0px;
      }

      .el-icon {
        font-size: 20px;
      }

      .el-input-group__prepend {
        background-color: var(--l_1);
        border: 1px solid var(--l_2);
        border-right: 0px;
        box-shadow: none;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }

      .el-input__wrapper {
        border: 1px solid var(--l_2);
        border-left: 0px;
        box-shadow: none;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        padding-left: 0px;
        .el-input__inner {
          border-radius: 0px;
          font-size: 16px;
        }
      }
    }
  }
}

.mobile-login-form {
  &.en {
    .el-form-item__content {
      .mobile-code-input {
        width: 285px !important;
      }
    }
  }
  &.ms {
    .el-form-item__content {
      .mobile-code-input {
        width: 255px !important;
      }
    }
  }
  .el-form-item__content {
    display: flex;
    justify-content: space-between;
    align-items: end;

    .mobile-code-input {
      width: 325px !important;
    }
  }
}

.login-btn {
  width: 465px;
  height: 50px;
  background: var(--l_3);
  color: var(--l_4);
  border-radius: 8px;

  &.vi {
    width: 505px !important;
  }

  &.is-disabled {
    background: var(--l_3);
    color: var(--l_4);

    &:hover {
      background: var(--l_3);
      color: var(--l_4);
    }
  }

  &:hover {
    color: var(--l_4);
  }
  .login_txt_wrapper {
    @include flex();
  }
}

.forget-div {
  color: var(--l_5);
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0px;
  text-align: right;
  position: absolute;
  right: 0;
  bottom: 150px;
}

.goto-other {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  color: var(--l_5);
  font-weight: 500;
  cursor: pointer;

  .no-login {
    cursor: pointer;
  }

  .register-new-account {
    display: flex;

    .to-register {
      color: var(--l_6);
    }

    .line {
      margin: 0 3px;
    }
  }
}

.lock-btn {
  color: var(--l_6);
}

.email {
  .el-input__prefix {
    width: 60px;
    .el-input__prefix-inner {
      margin-left: 10px;
      width: 100%;
      .el-icon {
        font-size: 28px;
      }
    }
  }
}

.other-verify {
    width: 400px;
    margin-top: 25px;
    display: flex;
    justify-content: space-around;
    .verify-item {
      color: var(--u_friend_55);
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        margin-top: 5px;
      }
    }
    .verify-google::before {
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      background: v-bind(googleIcon);
      background-size: contain;
    }
    .verify-email::before {
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      background: v-bind(emailIcon);
      background-size: contain;
    }
    .verify-sms::before {
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      background: v-bind(smsIcon);
      background-size: contain;
    }
}
//- 002
.template_2_002 {
  .login-btn {
    border: none !important;
  }
  .el-input__wrapper {
    background: #161e2b !important;
    .el-input__inner {
      color: #878ea6;
    }
  }
  .forget-div,
  .goto-other {
    color: #ff00f3;
  }
  .line,
  .no-login {
    color: #878ea6;
  }
}

//- 003
.template_2_003 {
  .goto-other {
    padding: 0 237px;
    &.vi {
      padding: 0 215px;
    }
  }
  .forget-div {
    bottom: 234px;
    right: 237px;
    &.vi {
      right: 215px;
    }
  }
  .login-btn {
    &:hover {
      background-color: var(--l_3);
    }
  }
}
</style>
