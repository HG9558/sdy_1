<template>
  <div :class="['forget_box', site]">
    <div class="content">
      <div class="forget_title">{{ $t_c('找回密码') }}</div>
      <div class="stpe">
        <div :class="['stpe-one', { 'dark-bg': active === 2 }]">
          1、{{ $t_c('填写验证信息') }}
        </div>
        <div :class="active === 2 ? 'stpe-three' : 'stpe-two'">2、{{ $t_c('更改密码') }}</div>
      </div>
      <div v-show="active === 1" class="row justify-content-center">
        <div class="row">
          <div class="reg-card col py-3">
            <el-form :model="loginForm" :rules="logindataRule" ref="logindataForm">
              <el-form-item
                v-if="globalState.isNeedVfySms && otherVerifyType === 'sms'"
                :rules="mobileLoginRule.mobile"
                prop="phone"
                :class="['mobile-select', site, 'forgetpsw-mobile-input']">
                <MobileAreaCodesSelect v-model="mobileAreaCode" @select="mobileAreaCodeSelect" />
                <el-input
                  class="user-input phone"
                  v-model="loginForm.phone"
                  :maxlength="mobileLoginRule.mobile[0].maxlength"
                  clearable
                  :placeholder="globalState.isZaloShow ? $t_c('请输入zalo号') : $t_c('请输入您的手机号')">
                </el-input>
              </el-form-item>

              <el-form-item v-if="globalState.isNeedVfyEMail && otherVerifyType === 'email'" :rules="mobileLoginRule.email" prop="email" :class="[site]">
                <el-input
                  class="user-input"
                  v-model="loginForm.email"
                  clearable
                  :placeholder="$t_c('请输入您的电子邮箱')">
                </el-input>
              </el-form-item>

              <el-form-item v-if="(globalState.isNeedVfySms && otherVerifyType === 'sms')||(globalState.isNeedVfyEMail && otherVerifyType === 'email')" prop="msgcode" class="verify-code">
                <el-input
                  class="user-message"
                  v-model="loginForm.msgcode"
                  :maxlength="6"
                  clearable
                  :placeholder="otherVerifyType === 'email' ? $t_c('请输入邮箱验证码') : globalState.isZaloShow ? $t_c('请输入zalo验证码') : $t_c('请输入短信验证码')">
                </el-input>
                <button
                  @click="useVerify"
                  ref="btnPhoneCode"
                  :class="{
                    'mes-code-send': beginAnim,
                    'mes-code-btn-disabled': isPhoneFlog,
                  }"
                  class="mes-code-btn"
                  :disabled="isPhoneFlog === false"
                  type="button">
                  {{ $t_c('获取验证码') }}
                </button>
                <Verify @success="success" ref="verifyRef" />
              </el-form-item>
              <div v-show="globalState.isZaloShow && otherVerifyType === 'sms'" style="text-align: left;position: relative; top: -20px; color: #f56c6c; font-size: 12px">
                {{ $t_c('需在手机安装zalo并手机号注册账户才能接收验证码') }}
              </div>

              <el-form-item v-if="globalState.isNeedGoogle && otherVerifyType === 'google'" prop="userName" :class="[site]">
                <el-input
                  v-if="googleStep === 1"
                  class="user-input"
                  v-model="loginForm.userName"
                  clearable
                  :placeholder="$t_c('请输入您的用户名')">
                </el-input>
                <el-input
                  v-if="googleStep === 2"
                  v-model="loginForm.msgcode"
                  :maxlength="6"
                  :placeholder="$t_c('请输入谷歌验证码')"
                  class="user-input">
                </el-input>
              </el-form-item>
            </el-form>
            <el-button
              @click="dataFormSubmitHandle('logindataForm')"
              :class="{ 'loginBtn-on': bottonFlog }"
              class="loginBtn"
              >{{ $t_c('下一步') }}</el-button
            >

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

            <div class="question-customer">
              <span @click="gotoUrl" class="question">{{ $t_c('遇到问题') }}?</span>
              <span @click="gotoUrl" class="customer">{{ $t_c('联系客服') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="from-div" v-show="active === 2">
        <el-form :model="updatePsw" :rules="updatedataRule" ref="dataForm">
          <el-form-item prop="password">
            <el-input
              class="user-input"
              v-model.trim="updatePsw.password"
              type="password"
              :maxlength="18"
              clearable
              :placeholder="$t_c('新密码')">
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              class="user-input"
              v-model.trim="updatePsw.confirmPassword"
              type="password"
              :maxlength="18"
              clearable
              :placeholder="$t_c('确认新密码')">
            </el-input>
          </el-form-item>
          <el-form-item class="btn-class" prop="btnBack">
            <el-button @click="active = 1" class="btn-pubilc">{{ $t_c('返回') }}</el-button>
            <el-button @click="dataFormSubmitHandle('dataForm')" class="btn-pubilc change-btn">{{
              $t_c('更改密码')
            }}</el-button>
          </el-form-item>
          <div class="question-customer">
            <span @click="gotoUrl" class="question">{{ $t_c('遇到问题') }}?</span>
            <span @click="gotoUrl" class="customer">{{ $t_c('联系客服') }}</span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<route>
 {
    meta: {bg: 'bg_3'}
  }
</route>

<script setup lang="ts">
import MobileAreaCodesSelect from 'commonComponent/MobileAreaCodesSelect/index.vue';
import Verify from 'commonComponent/Verify/index.vue';
import type { ruleType } from '@/hook/userRuleHook';
import { btnCodeMethods, captcharegEXP, mediumPassword } from '@/hook/useAuth';
import useRuleHook from '@/hook/userRuleHook';
import { useDebounceFn } from '@vueuse/core';
// import { useUserState, useGlobalState, useNormalState } from '@/stores';
import { useImgPath, useSite } from '@/hook/usePath';
import { api } from '@/api';
import useDialog from '@/hook/useDialog';
import { useRouter } from 'vue-router';
import { lang } from '@/i18n';

const googleIcon = `url(${useImgPath('login/icon-google.png')}) no-repeat center`;
const emailIcon = `url(${useImgPath('login/icon-email.png')}) no-repeat center`;
const smsIcon = `url(${useImgPath('login/icon-sms.png')}) no-repeat center`;

const site = useSite();
const { messageTip } = useDialog();
const userState = useUserState();
const router = useRouter();
const { mobileLoginRule, activeCfg } = useRuleHook();
const active = ref(1);
const codeSign = ref('');
const nowToken = ref('');
const imgCode = ref('');
const verifyRef = ref();
const dataForm = ref();
const btnPhoneCode = ref();
const logindataForm = ref();
const isPhoneFlog = ref(false);
const bottonFlog = ref(false);
const isRefresh = ref(false);
const time = ref(0);
const globalState = useGlobalState();
const normalState = useNormalState();
const mobileAreaCode = ref(normalState.mobileAreaCode);
const otherVerifyType = ref('')
const googleStep = ref(1)


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

const loginForm = reactive({
  phone: '',
  msgcode: '',
  captchareg: '',
  email: '',
  userName: '',
});

const updatePsw = reactive({
  password: '',
  confirmPassword: '',
});

const beginAnim = computed(() => {
  return loginForm.phone !== '' && activeCfg().reg.test(loginForm.phone);
});

onMounted(() => {
  getCode();
});
watch(loginForm, newValue => {
  if (globalState.isNeedVfySms) {
    bottonFlog.value = newValue.msgcode !== '' && newValue.phone !== '';

    logindataForm.value.validateField('phone', (err: boolean) => {
      isPhoneFlog.value = Boolean(err);
    });
  } else {
    bottonFlog.value = newValue.msgcode !== '' && newValue.email !== '';
    logindataForm.value.validateField('email', (err: boolean) => {
      isPhoneFlog.value = Boolean(err);
    });
  }
});

// 找回密码规则
const logindataRule = () => {
  const validateCaptchareg = (_rule: ruleType, value: string, callback: Function) => {
    // 图形验证码
    if (!value) {
      callback(new Error(lang('请输入验证码')));
    } else if (!captcharegEXP(value)) {
      callback(new Error(lang('请输入正确验证码')));
    } else {
      callback();
    }
  };
  return {
    captchareg: [
      { required: true, message: lang('图形验证码不能为空'), trigger: 'blur' },
      { validator: validateCaptchareg, triggger: 'blur' },
    ],
    msgcode: [{ required: true, message: lang('验证码不能为空'), trigger: 'blur' }],
  };
};
// 修改密码规则校验
const updatedataRule = () => {
  const validatePassword = (_rule: ruleType, value: string, callback: Function) => {
    // 密码
    if (!value) {
      callback(new Error(lang('请输入密码')));
    } else if (!mediumPassword(value)) {
      callback(new Error(lang('请输入6~18位数字或字母组合的密码')));
    } else {
      callback();
    }
  };
  const validateComfirmpsw = (_rule: ruleType, value: string, callback: Function) => {
    // 确认密码
    if (!value) {
      callback(new Error(lang('请输入密码')));
    } else if (updatePsw.password !== value) {
      callback(new Error(lang('密码与确认密码不一致，请重新输入')));
    } else {
      callback();
    }
  };
  return {
    password: [
      { required: true, message: lang('密码不能为空'), trigger: 'blur' },
      { validator: validatePassword, trigger: 'blur' },
    ],
    confirmPassword: [
      { required: true, message: lang('确认密码不能为空'), trigger: 'blur' },
      { validator: validateComfirmpsw, trigger: 'blur' },
    ],
  };
};

const useVerify = () => {
  verifyRef.value.show();
};

const success = (params: { captchaVerification: string }) => {
  loginForm.captchareg = params.captchaVerification;
  mesgcodeClick();
};

const mesgcodeClick = useDebounceFn(
  () => {
    let btn = btnPhoneCode;
    let wait = 60;
    const htmlText = lang('获取验证码');

    let params;

    if (otherVerifyType.value === 'sms') {
      params = {
        vaildType: 1,
        mobile: loginForm.phone,
        mobileAreaCode: mobileAreaCode.value,
      };
    } else {
      params = {
        vaildType: 0,
        email: loginForm.email,
      };
    }
    api.user
      .getforgetpsw({
        captchaVerification: loginForm.captchareg,
        codeSign: codeSign.value,
        ...params,
      })
      .then(res => {
        if (res.code === 0) {
          btnCodeMethods(btn, wait, htmlText, time.value);
          messageTip({ message: globalState.isNeedVfySms ? lang('发送成功，请查看手机') : lang('发送成功') });
          nowToken.value = res.token;
        } else {
          messageTip({ message: res.msg });
        }
      })
      .catch(_err => {
        btn.value.innerText = htmlText;
        btn.value.removeAttribute('disabled');
        clearInterval(time.value);
        getCode();
      });
  },
  1000,
  { maxWait: 5000 }
);

// 获取图形验证码
const getCode = () => {
  isRefresh.value = true;
  api.user
    .getCaptcha({ terminal: 0 })
    .then(res => {
      if (res.msg === 'success') {
        imgCode.value = 'data:image/jpeg;base64,' + res.code;
        codeSign.value = res.codeSign;
        isRefresh.value = false;
      } else {
        isRefresh.value = false;
      }
    })
    .catch(() => {
      isRefresh.value = false;
    });
};

const dataFormSubmitHandle = useDebounceFn(
  data => {
    (data === 'logindataForm' ? logindataForm.value : dataForm.value)?.validate((valid: boolean) => {
      if (!valid) return false;
      if (otherVerifyType.value === 'google' && googleStep.value === 1) {
        const params = {
          vaildType: 2,
          userName: loginForm.userName,
        };
        api.user
          .getforgetpsw({
            codeSign: codeSign.value,
            ...params,
          })
          .then(res => {
            if (res.code === 0) {
              nowToken.value = res.token;
              googleStep.value++
            } else {
              messageTip({ message: res.msg });
            }
          })
          .catch(_err => {
            getCode();
          });
        return
      }
      if (nowToken.value === '') return messageTip({ message: lang('请先发送验证码至手机') });
      if (data === 'logindataForm') {
        let params;
        if (otherVerifyType.value === 'sms') {
          params = {
            vaildType: 1,
            mobile: loginForm.phone,
          }
        } else if (otherVerifyType.value === 'email') {
          params = {
            vaildType: 0,
            email: loginForm.email,
          }
        } else if (otherVerifyType.value === 'google') {
          params = {
            vaildType: 2,
            code: loginForm.msgcode,
          }
        }

        const data = {
          code: loginForm.msgcode,
          token: nowToken.value,
          ...params,
        };
        api.user.getValidCode(data).then(res => {
          if (res.msg === 'success') {
            if (res.code !== 0) return messageTip({ message: res.msg });
            if (active.value++ > 2) active.value = 0;
            nowToken.value = res.token;
          } else {
            messageTip({ message: res.msg });
          }
        });
      } else {
        const vType = otherVerifyType.value
        const data = {
          vaildType: vType === 'google' ? 2 : vType === 'email' ? 0 : 1,
          password: updatePsw.password,
          confirmPassword: updatePsw.confirmPassword,
          token: nowToken.value,
        };
        api.user.getModpwd(data).then(res => {
          if (res.msg === 'success') {
            if (res.code !== 0) return messageTip({ message: res.msg });
            messageTip({ message: lang('密码修改成功!') });
            router.push('/login');
          } else {
            messageTip({ message: res.msg });
          }
        });
      }
    });
  },
  1000,
  { maxWait: 5000 }
);

const gotoUrl = () => {
  window.open(userState.serUrl);
};

const mobileAreaCodeSelect = (code: string) => {
  loginForm.phone = '';
  mobileAreaCode.value = code;
  normalState.setMobileAreaCode(mobileAreaCode.value);
};

const stpe_first = `url(${useImgPath('forgetpsw/stpe_first.png')})`;
const stpe_first2 = `url(${useImgPath('forgetpsw/stpe_first2.png')})`;
const stpe_second = `url(${useImgPath('forgetpsw/step_second.png')})`;
const stpe_second2 = `url(${useImgPath('forgetpsw/step_second2.png')})`;

provide('success', success);
</script>

<style lang="scss" scoped>
.phone {
  &:deep(.el-input__inner) {
    padding-left: 88px !important;
  }
}
.el-input__inner {
  height: 48px;
}
.el-select {
  width: 80px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
}
.el-form-item {
  margin-bottom: 40px;
}
.forget_box {
  padding: 103px 0 83px;
  background-size: 100% 100%;
  background: var(--l_19);

  .content {
    width: 940px;
    background: var(--l_20);
    margin: 0 auto;

    .forget_title {
      height: 123px;
      line-height: 123px;
      font-size: 34px;
      font-weight: 600;
      margin-top: 0;
      background: var(--l_21);
      -webkit-background-clip: text;
      color: transparent;

      &::after {
        content: '';
        display: block;
        width: 940px;
        height: 1px;
        background: var(--l_22);
      }
    }
    .stpe {
      display: flex;
      justify-content: center;
      color: var(--l_23);
      font-weight: bold;
      font-size: 16px;
      margin: 32px 0;

      .stpe-one,
      .stpe-two,
      .stpe-three {
        width: 268px;
        height: 48px;
        line-height: 48px;
        text-align: center;
      }

      .stpe-one {
        width: 266.3px;
        height: 48px;
        background-size: contain;
      }

      .stpe-two {
        margin-right: 2px;
        background-size: 100% 100%;
      }

      .stpe-three {
        margin-right: 2px;
        color: var(--l_23);
        background-size: 100% 100%;
      }
    }
  }
}

.code-from {
  position: relative;

  img {
    display: inline-block;
    width: 65px;
    height: 30px;
    position: absolute;
    right: 25px;
    top: 5px;
  }
}
.row {
  width: 100%;
  display: flex;
  .reg-card {
    transition: 0.5s ease-in-out;
    .el-select {
      z-index: 1;
    }
  }
  .py-3 {
    padding-bottom: 1rem !important;
  }

  .col {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }
}
.justify-content-center {
  display: flex;
  justify-content: center !important;
  margin: 0 auto;
}

.forget_title {
  font-weight: 500;
  margin: 1.5rem auto 1.5rem;
  font-size: 18px;
  text-align: center;
}

.mes-code-btn {
  width: 113px;
  height: 48px;
  color: var(--l_23);
  border: 0;
  position: absolute;
  right: 0;
  font-size: 12px;
  font-weight: 500;
  background: var(--l_24);
  border-radius: 10px;
}
.user-message {
  .el-input__inner {
    width: 335px;
    border-radius: 10px;
  }
}

.loginBtn {
  width: 470px;
  height: 45px;
  margin: 0px auto 0;
  background: var(--l_24);
  border-radius: 10px;
  display: block;
  border: 0;
  color: var(--l_23);
  font-size: 16px;
}

.loginBtn-on {
  background: var(--l_24);
}

.question-customer {
  width: 100%;
  margin: 30px auto;
  text-align: center;

  span {
    cursor: pointer;
  }

  .question {
    color: #808293;
    margin-right: 3px;
  }

  .customer {
    color: var(--l_25);
    cursor: pointer;
    margin-left: 4px;
  }
}

.from-div {
  margin: 50px auto;
  padding-bottom: 40px;
}

.el-form {
  margin: 0 238px;
  .el-input__inner {
    background: rgba(34, 35, 40, 0.8);
    border: 1px solid var(--l_26);
    position: relative;
    color: var(--l_27);
  }

  &:deep(.el-form-item__content) {
    height: 50px;
    width: 465px;

    .el-input {
      width: 100%;
      height: 100%;

      .el-input__wrapper {
        border: 1px solid var(--l_28);
        border-radius: 10px;
        .el-input__inner {
          font-size: 16px;

          &::-webkit-input-placeholder {
            font-size: 16px;
          }
        }
      }
    }
  }

  .btn-pubilc {
    width: 210px;
    height: 50px;
    background: var(--l_23);
    border-radius: 6px;
    color: var(--l_29);
    border: 1px solid var(--l_29);
    font-size: 24px;
    width: 210px;
    border-radius: 10px;
  }

  .change-btn {
    margin-left: auto;
    background: var(--l_24);
    color: var(--l_20);
    border: 0;
  }

  .verify-code {
    display: flex;
    justify-content: space-between;

    .el-form-item__content {
      .user-message {
        width: 325px;
        height: 50px;
        border: 1px solid var(--l_28);
        border-radius: 10px;
        padding-left: 10px;

        :deep(.el-input__wrapper) {
          border: none !important;
        }
      }
    }
  }
}

.stpe-one {
  background-image: v-bind(stpe_first);
  color: var(--l_20);
  background-size: 100% 100% !important;

  &.dark-bg {
    background-image: v-bind(stpe_first2);
    color: var(--l_7);
  }
}

.stpe-two {
  background-image: v-bind(stpe_second);
  color: var(--l_7);
}

.stpe-three {
  background-image: v-bind(stpe_second2);
}

.mobile-select {
  .el-input {
    width: 465px;
    height: 50px;
  }
}

.other-verify {
    width: 400px;
    margin: 25px auto 0;
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

//002
.template_2_002.forget_box {
  background-color: transparent !important;
  .forget_title,
  .stpe-one {
    color: #fff;
  }
  .stpe-two {
    color: #ff00f3;
  }
  :deep() {
    .el-input__wrapper,
    .el-input--suffix {
      background: #161e2b !important;
      border: none !important;
    }
    .el-input__inner {
      color: #878ea6;
      padding-left: 20px;
    }
  }
  .mes-code-btn {
    background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%);
  }
  .loginBtn {
    background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%);
  }
  .customer {
    color: #ff00f3;
  }
  .btn-pubilc {
    background-color: #3d5477 !important;
    color: #fff;
    border: none;
  }
  .change-btn {
    background: linear-gradient(90deg, #ff00ff 0%, #0088ff 100%);
  }
  .dark-bg {
    color: #ff00f3;
  }
}
</style>
