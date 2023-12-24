<template>
  <Layout>
    <div class="form-container">
      <!--  用户名密码登录 -->
      <template v-if="isAccountLogin">
        <el-form :model="accountLoginForm" :rules="accountLoginRule" ref="accountLoginForm" key="accountLoginForm">
          <el-form-item prop="loginName">
            <el-input class="user-input" prefix-icon="el-icon-user" v-model="accountLoginForm.loginName" :maxlength="16" clearable :placeholder="$t('用户名')">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="user-input" prefix-icon="el-icon-lock" v-model.trim="accountLoginForm.password" type="password" :maxlength="18" clearable @keyup.enter.native="_dataFormSubmitHandle('accountLoginForm')" :placeholder="$t('密码')">
            </el-input>
          </el-form-item>
          <el-form-item class="code-from" prop="captcha">
            <Verify @success="success" mode="pop" captchaType="blockPuzzle" ref="verify" />
          </el-form-item>
        </el-form>
      </template>
      <!-- 手机号码登录 -->
      <template v-else>
        <el-form class="mobile-login-form" :model="mobileLoginForm" :rules="mobileLoginRule" ref="mobileLoginForm" key="mobileLoginForm">
          <el-form-item :rules="activeMobileAreaCfg.rules" class="mobile-select" prop="mobile">
            <MobileAreaCodesSelect v-model="mobileAreaCode" @select="mobileLoginForm.mobile = ''" />
            <el-input prefix-icon="el-icon-mobile-phone" class="mobile-input" v-model="mobileLoginForm.mobile" :maxlength="activeMobileAreaCfg.maxlength" clearable :placeholder="$t('手机号')">
            </el-input>
          </el-form-item>

          <el-form-item class="code-input" prop="mobileCaptcha">
            <el-input v-model="mobileLoginForm.mobileCaptcha" prefix-icon="el-icon-timer" :maxlength="6" :placeholder="$t('短信验证码')">

              <count-time class="login-phone" slot="suffix" :waitTime="60" :startCount.sync="startCount" @click="useVerify('phVerify')" :isPhoneCode="isPhoneCode"></count-time>

            </el-input>
            <Verify @success="phSuccess" mode="pop" captchaType="blockPuzzle" ref="phVerify" />
          </el-form-item>
        </el-form>
      </template>

      <div class="forget-div" v-if="isAccountLogin">
        <span class="c-r" @click="$router.push('/forgetpsw')">
					{{$t('忘记密码?')}}
        </span>
      </div>
      <el-button class="yszjl login-btn" :disabled="btnDisabled" @click="loginBtnClick" :loading="isLoading" @keydown.native.enter="loginBtnClick">
        <span class="ft-16" style="cursor: pointer;">{{$t('登录')}}</span>
      </el-button>

      <div class="goto-other">
        <span class="c-r" @click="changeLoginType">{{isAccountLogin ? $t('手机号登录') : $t('账号登录')}}</span>
        <span class="c-r register-new-account"><span @click="$router.push('/login/register')">{{$t('注册新账号')}}</span>
          <span class="no-login" @click="$router.push('/')"> / {{$t('先去逛逛')}}</span></span>
      </div>
    </div>
    <!-- 锁定弹窗 -->
    <lock-tip v-if="isShowLocked" :isShowLocked.sync="isShowLocked"></lock-tip>

  </Layout>
</template>

<script>
import Layout from './component/Layout.vue'
import userRuleMixin from '../../../common/mixin/userRuleMixin.js'
import Verify from 'commonComponent/Verify/index.vue'
import { mapMutations, mapActions, mapState } from 'vuex'
import LockTip from './component/LockTip.vue'
import CountTime from 'components/common/CountTime/index.vue'
import { getActiveMobileAreaCfg } from 'common/js/mobileAreaCfg'
import MobileAreaCodesSelect from 'components/common/MobileAreaCodesSelect'

export default {
  name: 'login.vue',
  mixins: [userRuleMixin],
  components: {
    Layout,
    Verify,
    LockTip,
    CountTime,
    MobileAreaCodesSelect,
  },
  watch: {
    accountLoginForm: {
      deep: true,
      async handler () {
        const bol = Object.values(this.accountLoginForm).some(item => !item);
        if (bol) return this.btnDisabled = true;
        this.btnDisabled = ! await new Promise(resolve => this.$refs.accountLoginForm.validate(resolve));
      }
    },
    mobileLoginForm: {
      deep: true,
      async handler () {
        this.$refs.mobileLoginForm.validateField('mobile', (err) => {
          this.isPhoneCode = Boolean(err);
        })
        const bol = Object.values(this.mobileLoginForm).some(item => !item);
        if (bol) return this.btnDisabled = true;
        this.btnDisabled = ! await new Promise(resolve => this.$refs.mobileLoginForm.validate(resolve));
      }
    },
  },
  data () {
    return {
      accountLoginForm: {
        loginName: "",
        password: "",
      },
      mobileLoginForm: {
        mobile: "",
        captchaVerification: "",
        mobileCaptcha: "",
      },
      browserType: window.navigator.appCodeName || "unkonw",
      btnDisabled: true,
      isLoading: false,
      isAccountLogin: true,
      isPhoneCode: true,
      mobileAreaCode: null,
      isShowLocked: false,
      startCount: false,
      deviceData: {},
      captchaVerification: "",
		}
  },
  methods: {
    useVerify (name) {
      this.$refs[name].show()
    },
    loginBtnClick () {
      this.$refs[this.isAccountLogin ? 'accountLoginForm' : 'mobileLoginForm'].validate(async (valid) => {
        if (!valid) return
        //- 手机号码登录不需要验证
        if (!this.isAccountLogin) {
          this._checkVfydevice();
        } else {
          this.isLoading = true;
          const res = await this.$http.isNeedSliderCheck({ loginName: this.accountLoginForm.loginName })
          this.isLoading = false;
          if (res.data.code) return
          if (res.data.msg || this.captchaVerification) {
            this._checkVfydevice();
          } else {
            this.useVerify('verify')
          }
        }
      })
    },
    async _checkVfydevice () {
      let loginData = null;
      let loginType = null;
      if (this.isAccountLogin) {
        loginType = 'accountLoginForm';
        loginData = Object.assign({}, this[loginType], { captchaVerification: this.captchaVerification });
      } else {
        loginType = 'mobileLoginForm';
        loginData = {
          mobile: this.mobileLoginForm.mobile,
          mobileCaptcha: this.mobileLoginForm.mobileCaptcha,
          mobileAreaCode: this.mobileAreaCode,
        }
      }
      this._loginForm({ ...loginData, loginType: 0 });
    },
    //- 发起登录请求
    async _loginForm (loginData) {
      this.btnDisabled = true;
      try {
        const res = await this.$http.userLogin(loginData);
        if (res.data.code === 0) {
          this.$router.push("/");
          this.set_user_info(res.data.userInfo);
          this.set_user_token(res.data.token);
          this._getNickNameInfo()
          this._searchCrFlagType();  //- 是否可以使用虚拟币
          if (this.equipmentId) {
            await this.$http.sendEquipmentId({
              deviceUuid: this.equipmentId,
              deviceType: "PC",
              browserType: this.browserType,
            });
          }
        } else if (res.data.code === 10086) {
          this.isShowLocked = true;
        } else {
          this.messageTip({
            type: 'error',
            message: res.data.msg,
            duration: 500
          })
        }
        this.btnDisabled = false;
      } catch (error) {
        this.btnDisabled = false;
      }
    },
    //- 滑动验证码检测
    success (params) {
      this.captchaVerification = params.captchaVerification;
      this._checkVfydevice()
    },
    phSuccess (params) {
      this.$set(this.mobileLoginForm, 'captchaVerification', params.captchaVerification);
      this._getPhoneMesCode();
    },
    //- 获取手机号登录验证码
    async _getPhoneMesCode () {
      const res = await this.$http.sendMobCodeLog({
        mobile: this.mobileLoginForm.mobile,
        captchaVerification: this.mobileLoginForm.captchaVerification,
        mobileAreaCode: this.mobileAreaCode,
      })
      if (res.data.code === 0) {
        (this.startCount = true);
        this.messageTip({ message: this.$t('发送成功，请查看手机'), type: 'success' })
      } else {
        this.messageTip({ message: res.data.msg, duration: 1000 });
      }
    },
    changeLoginType () {
      this.isAccountLogin ? this.$refs.accountLoginForm.clearValidate() : this.$refs.mobileLoginForm.clearValidate();
      this.isAccountLogin = !this.isAccountLogin;
      this.btnDisabled = true;
    },
    ...mapMutations('user', ['set_user_token']),
    ...mapActions('user', ['_searchCrFlagType', '_searchCrFlagType'])
  },
  computed: {
		...mapState('global', ['mobileAreaCodes']),
		...mapState({
      equipmentId: state => state.global.equipmentId
    }),
    activeMobileAreaCfg() {
			return getActiveMobileAreaCfg(this.mobileAreaCode, this.mobileAreaCodes)
		},
  }

}
</script>

<style scoped lang="scss">
.slider-check {
  background: $bg-c4;
  border-radius: 8px;
  color: $c-f;
  cursor: pointer;
  @include flex(center);
  font-size: 16px;
}
.form-container {
  .yszjl.login-btn {
    width: 100%;
    background: $bg-ead;
    border-radius: 6px;
    border: inherit;
    // &:disabled {
    //   background: $c-c9 !important;
    // }
  }
  /deep/.el-input__inner{
    width: 100%;
    height: 48px;
    line-height: 48px;
    padding-left: 50px;
    background: #D5D7E9;
    border: 1px solid #ADB0C9;
    border-radius: 6px;
    box-shadow: none;
    color: #6F6F87;
  }
  /deep/.el-input{
    width: 100%;
  }
}
.register-new-account {
  color: #808293;
}
.code-input{
  margin-top: 40px !important;
  margin-bottom: 40px;
  .el-input__inner{
    width: 345px;
  }
}
.el-button {
  background: $bg-ead;
  border-color: transparent;
  color: #3B4165;
  width: 108px;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
}
::v-deep .code-input {
  .el-input__inner {
    width: 345px;
    border: none;
  }
}

.multi-language {
  .code-input {
    /deep/ {
      .el-input__inner {
        width: 290px;
      }
    }
  }
  .el-button.login-phone {
    white-space: pre-wrap;
    word-break: break-word;
    width: 168px;
    padding: 0 10px;
  }
  .mobile-login-form {
    .mobile-select /deep/ .el-input__inner {
      padding-left: 140px;
    }
    .area-select {
      width: 90px;
    }
  }

}
</style>
