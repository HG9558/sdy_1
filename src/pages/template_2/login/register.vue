<template>
  <layout-component componentType="register">
    <div :class="['form-container', site]">
      <el-form :model="registerForm" :rules="registerFormRule(registerForm)" ref="registerFormRef">
        <el-form-item prop="loginName" v-if="userState.regSetting.loginNameisVisible">
          <el-input
            class="user-input"
            v-model="registerForm.loginName"
            :maxlength="10"
            clearable
            :placeholder="$t_c('用户名')">
            <template #prepend>
              <img :src="useImgPath('login/icon-user.png')" slot="prefix" alt="" width="20"
            /></template>
          </el-input>
        </el-form-item>

        <el-form-item prop="loginPwd" v-if="userState.regSetting.loginPwdisVisible">
          <el-input
            class="user-input"
            v-model.trim="registerForm.loginPwd"
            type="password"
            :maxlength="18"
            clearable
            :placeholder="$t_c('密码')">
            <template #prepend>
              <img :src="useImgPath('login/icon-lock.png')" slot="prefix" alt="" width="20"
            /></template>
          </el-input>
        </el-form-item>

        <el-form-item prop="reLoginPwd" v-if="userState.regSetting.reLoginPwdisVisible">
          <el-input
            class="user-input"
            v-model.trim="registerForm.reLoginPwd"
            type="password"
            :maxlength="18"
            clearable
            :placeholder="$t_c('确认密码')">
            <template #prepend>
              <img :src="useImgPath('login/icon-lock.png')" slot="prefix" alt="" width="20"
            /></template>
          </el-input>
        </el-form-item>

        <el-form-item prop="addressis" v-if="userState.regSetting.addressisVisible">
          <el-input
            class="user-input"
            v-model="registerForm.addressis"
            :maxlength="50"
            clearable
            :placeholder="$t_c('地址')">
            <template #prepend>
              <img :src="useImgPath('login/icon-address.png')" slot="prefix" alt="" width="20"
            /></template>
          </el-input>
        </el-form-item>

        <el-form-item prop="email" v-if="userState.regSetting.emailisVisible">
          <el-input
            class="user-input email"
            prefix-icon="Message"
            v-model="registerForm.email"
            clearable
            :placeholder="$t_c('邮箱')">
          </el-input>
        </el-form-item>

        <el-form-item
          :class="['mobile-code-input', globalState.language]"
          prop="mailCaptchareg"
          v-if="userState.regSetting.mailCaptcharegisVisible">
          <el-input v-model="registerForm.mailCaptchareg" :maxlength="6" clearable :placeholder="$t_c('邮箱验证码')">
            <template #prepend>
              <img :src="useImgPath('login/icon-code.png')" slot="prefix" alt="" width="25"
            /></template>
          </el-input>
          <div>
            <count-time
              class="register-btn"
              :waitTime="60"
              :startCount.sync="startCountForEmail"
              @click="useVerify('emailVerifyRef')"
              :isPhoneCode="isPhoneCodeForEmail"></count-time>
          </div>
          <Verify mode="pop" captchaType="blockPuzzle" ref="emailVerifyRef" />
        </el-form-item>

        <el-form-item prop="qq" v-if="userState.regSetting.qqisVisible">
          <el-input class="user-input" v-model="registerForm.qq" :maxlength="15" clearable placeholder="QQ">
            <template #prepend><img :src="useImgPath('login/icon-qq.png')" slot="prefix" alt="" width="20" /></template>
          </el-input>
        </el-form-item>

        <el-form-item prop="weChat" v-if="userState.regSetting.weChatisVisible">
          <el-input
            class="user-input"
            v-model="registerForm.weChat"
            :maxlength="20"
            clearable
            :placeholder="$t_c('微信')">
            <template #prepend>
              <img :src="useImgPath('login/icon-wechat.png')" slot="prefix" alt="" width="20"
            /></template>
          </el-input>
        </el-form-item>

        <el-form-item prop="realName" v-if="userState.regSetting.realNameisVisible">
          <el-input
            class="user-input"
            v-model="registerForm.realName"
            :maxlength="20"
            clearable
            :placeholder="$t_c('真实姓名')">
            <template #prepend>
              <img :src="useImgPath('login/icon-user.png')" slot="prefix" alt="" width="20"
            /></template>
          </el-input>
        </el-form-item>

        <el-form-item
          :rules="mobileLoginRule"
          class="mobile-select"
          prop="mobile"
          v-if="userState.regSetting.mobileisVisible">
          <MobileAreaCodesSelect v-model="mobileAreaCode" @select="mobileAreaCodeSelect" />
          <el-input
            class="mobile-input"
            v-model="registerForm.mobile"
            :maxlength="mobileLoginRule.mobile[0].maxlength"
            clearable
            :placeholder="globalState.isZaloShow ? $t_c('zalo号') : $t_c('手机号码')">
            <template #prepend>
              <img :src="useImgPath('login/icon-iphone.png')" slot="prefix" alt="" width="20"
            /></template>
          </el-input>
        </el-form-item>

        <el-form-item
          :class="['mobile-code-input', globalState.language]"
          prop="mobileCaptchareg"
          v-if="userState.regSetting.mobileCaptcharegisVisible">
          <el-input v-model="registerForm.mobileCaptchareg" :maxlength="6" clearable :placeholder="globalState.isZaloShow ? $t_c('zalo验证码') : $t_c('短信验证码')">
            <template #prepend>
              <img :src="useImgPath('login/icon-code.png')" slot="prefix" alt="" width="25"
            /></template>
          </el-input>
          <div>
            <count-time
              class="register-btn"
              :waitTime="60"
              :startCount.sync="startCount"
              @click="useVerify('mbVerifyRef')"
              :isPhoneCode="isPhoneCode"></count-time>
          </div>
          <Verify mode="pop" captchaType="blockPuzzle" ref="mbVerifyRef" />
        </el-form-item>
        <div style="text-align: left;position: relative; top: -20px; color: #f56c6c; font-size: 12px" v-show="userState.regSetting.mobileisVisible && globalState.isZaloShow">
          {{ $t_c('需在手机安装zalo并手机号注册账户才能接收验证码') }}
        </div>
        <div class="code-from">
          <Verify mode="pop" captchaType="blockPuzzle" ref="capVerifyRef" />
        </div>
      </el-form>
      <el-button
        class="register_btn"
        :disabled="btnDisabled"
        @click="submitRegisterForm"
        width="360"
        :loading="isLoading">
        <span class="login_txt_wrapper">
          {{ loadingTxtShow ? 'Loading' : $t_c('注册') }}
          <LoadingTxt v-if="loadingTxtShow" />
        </span>
      </el-button>
      <div class="have-account">
        <span class="have-account-txt"> {{ $t_c('已有账号？') }}</span>
        <span class="go-log" @click="$router.push('/login')">{{ $t_c('请登录') }}</span>
      </div>
    </div>
  </layout-component>
</template>

<script setup lang="ts">
import LayoutComponent from './component/Layout.vue';
import Verify from 'commonComponent/Verify/index.vue';
import CountTime from 'commonComponent/CountTime/index.vue';
import MobileAreaCodesSelect from 'commonComponent/MobileAreaCodesSelect/index.vue';
import useRuleHook from '@/hook/userRuleHook';
// import { useUserState, useGlobalState, useNormalState } from '@/stores';
import { api } from '@/api';
import { useRoute, useRouter } from 'vue-router';
import { useImgPath, useSite } from '@/hook/usePath';
import useDialog from '@/hook/useDialog';
import useGetUserHook from '@/hook/useGetUserHook';
import { lang } from '@/i18n';
import LoadingTxt from 'commonComponent/LoadingText/LoadingText.vue';

const { _getNickNameInfo } = useGetUserHook();
const { messageTip } = useDialog();
const { mobileLoginRule, activeCfg, registerFormRule } = useRuleHook();
const userState = useUserState();
const globalState = useGlobalState();
const router = useRouter();
const route = useRoute();
const isPhoneCode = ref(true);
const isPhoneCodeForEmail = ref(true);
const btnDisabled = ref(true);
const startCount = ref(false);
const startCountForEmail = ref(false);
const isLoading = ref(false);

const registerFormRef = ref();
const captchaVerification = ref('');
const mbVerifyRef = ref();
const emailVerifyRef = ref();
const capVerifyRef = ref();
const isMobile = ref(false);
const isEmail = ref(false);
const site = useSite();
const loadingTxtShow = ref(false);
const normalState = useNormalState();
const mobileAreaCode = ref(normalState.mobileAreaCode);

watch(
  () => mobileAreaCode.value,
  (_: string) => {
    normalState.setMobileAreaCode(_);
  }
);

const registerForm = reactive({
  loginName: '',
  loginPwd: '',
  reLoginPwd: '',
  mobile: '',
  addressis: '',
  email: '',
  qq: '',
  realName: '',
  mobileCaptchareg: '',
  mailCaptchareg: '',
  weChat: '',
});

//- 获取用户注册项
const _initRegistSettingData = async () => {
  const result = await api.user.getRegistSetting();
  if (result.code) return;
  userState.set_reg_setting(result.regSetting);
};

onMounted(() => {
  _initRegistSettingData();
});

watch(registerForm, async () => {
  isPhoneCode.value = !activeCfg().reg.test(registerForm.mobile);
  const bol = Object.values(registerForm).some(item => {
    return !item;
  });
  if (bol) return (btnDisabled.value = true);
  btnDisabled.value = !(await new Promise(resolve => registerFormRef.value.validate(resolve)));
});

watch(
  () => registerForm.email,
  () => {
    registerFormRef.value?.validateField('email', (status: boolean) => {
      isPhoneCodeForEmail.value = !status;
    });
  }
);

watch(
  () => mobileAreaCode.value,
  (_: string) => {
    normalState.setMobileAreaCode(_);
  }
);

watch(
  () => userState.regSetting,
  async formMap => {
    const mapData = {
      loginName: 'loginNameisVisible',
      loginPwd: 'loginPwdisVisible',
      reLoginPwd: 'reLoginPwdisVisible',
      mobile: 'mobileisVisible',
      addressis: 'addressisVisible',
      email: 'emailisVisible',
      qq: 'qqisVisible',
      realName: 'realNameisVisible',
      mobileCaptchareg: 'mobileCaptcharegisVisible',
      weChat: 'weChatisVisible',
      captchareg: 'captcharegisVisible',
      mailCaptchareg: 'mailCaptcharegisVisible',
    };
    Object.keys(mapData).forEach((key: string) => {
      !(formMap as any)[mapData[key as keyof typeof mapData]] && delete registerForm[key as keyof typeof registerForm];
    });
  },
  { immediate: true }
);

const useVerify = (name: string) => {
  isMobile.value = name === 'mbVerifyRef';
  isEmail.value = name === 'emailVerifyRef';
  name === 'mbVerifyRef'
    ? mbVerifyRef.value.show()
    : name === 'emailVerifyRef'
    ? emailVerifyRef.value.show()
    : capVerifyRef.value.show();
};

const mobileAreaCodeSelect = (code: string) => {
  registerForm.mobile = '';
  mobileAreaCode.value = code;
};

//- 获取手机号注册登录验证码
const _getPhoneMesCode = async () => {
  const res = await api.user.getSendMobCodeReg({
    mobile: registerForm.mobile,
    captchaVerification: captchaVerification.value,
    mobileAreaCode: mobileAreaCode.value,
  });
  if (res.code === 0) {
    startCount.value = true;
    messageTip({ message: lang('发送成功，请查看手机'), type: 'success' });
  } else {
    messageTip({ message: res.msg });
  }
};
//- 获取邮箱登录验证码
const _getEmailCode = async () => {
  const res = await api.common.sendEmailCodeReg({
    email: registerForm.email,
    captchaVerification: captchaVerification.value,
  });
  if (res.code === 0) {
    startCount.value = true;
    startCountForEmail.value = true;
    messageTip({ message: lang('发送成功'), type: 'success' });
  } else {
    startCountForEmail.value = false;
    messageTip({ message: res.msg });
  }
};

const success = (params: { captchaVerification: string }) => {
  (captchaVerification.value = params.captchaVerification),
    isMobile.value ? _getPhoneMesCode() : isEmail.value ? _getEmailCode() : _sendRegisterForm();
};

//- 发送数据到后端(用户注册)
const _sendRegisterForm = async () => {
  const mainDomain = window.location.host;
  //- 添加设备ID
  let registerAddParams:any = {
    registerDevice: globalState.equipmentId,
    mainDomain: mainDomain,
    mobileAreaCode: mobileAreaCode.value,
  };

  const { codeId, agentId } = route.query;
  if (codeId) {
    registerAddParams.codeId = codeId;
  } else if (agentId) {
    registerAddParams.agentId = agentId;
  }

  //- 禁用注册按钮
  btnDisabled.value = true;
  loadingTxtShow.value = true;
  const res = await api.user.sendRegisterInfo({
    ...registerForm,
    ...registerAddParams,
    loginType: 0,
    captchaVerification: captchaVerification.value,
  });
  if (res.code === 0) {
    userState.set_user_info(res.userInfo);
    userState.setToken(res.token);
    _getNickNameInfo();
    messageTip({
      message: lang('注册成功'),
      type: 'success',
      duration: 1000,
      onClose: () => router.replace('/home'),
    });
  } else {
    messageTip({ message: res.msg, duration: 1500 });
  }
  loadingTxtShow.value = false;
  btnDisabled.value = false;
};

//- 登录表单提交
const submitRegisterForm = () => {
  registerFormRef.value.validate(async (valid: boolean) => {
    if (!valid) return false;
    isLoading.value = true;
    const res = await api.user.isNeedSliderCheck({ loginName: registerForm.loginName });
    isLoading.value = false;
    if (res.code) return;
    if (res.msg) {
      _sendRegisterForm();
    } else {
      useVerify('capVerifyRef');
    }
  });
};

provide('success', success);
</script>

<style scope lang="scss">
.form-container {
  width: 100%;
  margin-top: 40px;

  .el-form {
    .el-form-item {
      margin-bottom: 38px;

      .el-input {
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
          padding-left: 0px;

          .el-input__inner {
            font-size: 16px;

            &::-webkit-input-placeholder {
              font-size: 16px;
            }
          }
        }
      }
    }

    .el-form-item__content {
      width: 465px;
      height: 50px;

      .el-input__wrapper {
        height: 50px;
        border-radius: 8px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        .el-input__inner {
          border-radius: 0px;
        }
      }

      .mobile-input {
        .el-input__inner {
          padding-left: 90px;
        }
      }
    }

    .mobile-code-input {
      .el-form-item__content {
        display: flex;
        justify-content: space-between;
        .el-input {
          width: 325px;
        }
      }
      &:not(.zh, .zh_tw) {
        .el-input {
          width: 270px !important;
        }
      }
      &:has(.ms) {
        .el-input {
          width: 255px !important;
        }
      }
    }
  }

  .register_btn {
    width: 100%;
    height: 49px;
    border-color: transparent;
    background: var(--l_3);
    border-radius: 8px;
    color: var(--l_4);

    &:hover {
      background: var(--l_3);
      color: var(--l_4);
    }
    .login_txt_wrapper {
      @include flex();
    }
  }
}

.register-btn.el-button--success {
  background: var(--l_3);
  border-radius: 10px;
  color: var(--l_4);
  width: 108px;
  height: 50px;
  border: 0;

  &:hover {
    border: 0;
  }
}

.have-account {
  margin-top: 10px;
  text-align: right;
  color: var(--l_5);

  .go-log {
    color: var(--l_6);
    cursor: pointer;
  }
}

//- 002
.form-container {
  &.template_2_002 {
    .el-input__wrapper {
      background-color: var(--l_1);
    }
  }
}
//- 003
.form-container {
  &.template_2_003 {
    padding: 0 237px;
  }
  .register-btn.el-button--success {
    background: var(--l_33);
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
}
</style>
