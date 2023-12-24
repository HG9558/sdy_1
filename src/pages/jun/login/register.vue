<template>
  <layout>
    <div class="form-container">
      <el-form :model="registerForm" :rules="registerFormRule" ref="registerForm">

        <el-form-item prop="loginName" v-if="regSetting.loginNameisVisible">
          <el-input class="user-input" prefix-icon="el-icon-user" v-model="registerForm.loginName" :maxlength="10" clearable :placeholder="$t('用户名')">
          </el-input>
        </el-form-item>

        <el-form-item prop="loginPwd" v-if="regSetting.loginPwdisVisible">
          <el-input class="user-input" prefix-icon="el-icon-lock" v-model.trim="registerForm.loginPwd" type="password" :maxlength="18" clearable :placeholder="$t('密码')">
          </el-input>
        </el-form-item>

        <el-form-item prop="reLoginPwd" v-if="regSetting.reLoginPwdisVisible">
          <el-input class="user-input" prefix-icon="el-icon-lock" v-model.trim="registerForm.reLoginPwd" type="password" :maxlength="18" clearable :placeholder="$t('确认密码')">
          </el-input>
        </el-form-item>

        <el-form-item prop="addressis" v-if="regSetting.addressisVisible">
          <el-input class="user-input" prefix-icon="el-icon-location-information" v-model="registerForm.addressis" :maxlength="50" clearable :placeholder="$t('地址')">
          </el-input>
        </el-form-item>

        <el-form-item prop="email" v-if="regSetting.emailisVisible">
          <el-input class="user-input" prefix-icon="el-icon-message" v-model="registerForm.email" clearable :placeholder="$t('邮箱')">
          </el-input>
        </el-form-item>

        <el-form-item prop="qq" v-if="regSetting.qqisVisible">
          <el-input class="qq-input" prefix-icon="el-icon-qq" v-model="registerForm.qq" :maxlength="15" clearable placeholder="QQ">
          </el-input>
        </el-form-item>

        <el-form-item prop="weChat" v-if="regSetting.weChatisVisible">
          <el-input class="wechat-input" prefix-icon="el-icon-wechat" v-model="registerForm.weChat" :maxlength="20" clearable :placeholder="$t('微信')">
          </el-input>
        </el-form-item>

        <el-form-item prop="whatsapp" v-if="regSetting.whatsappisVisible">
          <el-input class="whatsapp-input" prefix-icon="el-icon-whatsapp" v-model="registerForm.whatsapp" :maxlength="30" clearable placeholder="whatsapp">
          </el-input>
        </el-form-item>

        <el-form-item prop="telegram" v-if="regSetting.telegramisVisible">
          <el-input class="telegram-input" prefix-icon="el-icon-telegram" v-model="registerForm.telegram" :maxlength="30" clearable placeholder="telegram">
          </el-input>
        </el-form-item>

        <el-form-item prop="realName" v-if="regSetting.realNameisVisible">
          <el-input class="user-input" prefix-icon="el-icon-user" v-model="registerForm.realName" :maxlength="20" clearable :placeholder="$t('真实姓名')">
          </el-input>
        </el-form-item>

        <el-form-item :rules="activeMobileAreaCfg.rules" class="mobile-login-form" prop="mobile" v-if="regSetting.mobileisVisible">
          <MobileAreaCodesSelect v-model="mobileAreaCode" @select="registerForm.mobile = ''" />
          <el-input class="mobile-select" prefix-icon="el-icon-mobile-phone" v-model="registerForm.mobile" :maxlength="activeMobileAreaCfg.maxlength" clearable :placeholder="$t('手机号码')">
          </el-input>
        </el-form-item>

        <el-form-item class="code-input" prop="mobileCaptchareg" v-if="regSetting.mobileCaptcharegisVisible">
          <el-input v-model="registerForm.mobileCaptchareg" :maxlength="6" clearable :placeholder="$t('短信验证码')">
            <img width="26" slot="prefix" src="./img/code_icon.png" alt="">

            <count-time class="register-btn" slot="suffix" :waitTime="60" :startCount.sync="startCount" @click="useVerify('mbVerify')" :isPhoneCode="isPhoneCode"></count-time>
          </el-input>
          <Verify @success="verifySuccess($event, 'sms')" mode="pop" captchaType="blockPuzzle" ref="mbVerify" />
        </el-form-item>
        <el-form-item class="code-input" prop="mailCaptchareg" v-if="regSetting.mailCaptcharegisVisible">
					<el-input v-model="registerForm.mailCaptchareg" :maxlength="6" clearable :placeholder="$t('邮箱验证码')">
						<img width="26" slot="prefix" src="./img/code_icon.png" alt="">

						<count-time class="register-btn" slot="suffix" :waitTime="60" :startCount.sync="startCountForEmail" @click="useVerify('emailVerify')" :isPhoneCode="isPhoneCodeForEmail"></count-time>
					</el-input>
					<Verify @success="verifySuccess($event, 'email')" mode="pop" captchaType="blockPuzzle" ref="emailVerify" />
				</el-form-item>
        <el-form-item class="code-from">
          <Verify @success="capSuccess" mode="pop" captchaType="blockPuzzle" ref="capVerify" />
        </el-form-item>
      </el-form>
      <el-button class="bog login-btn" :disabled="btnDisabled" @click="submitRegisterForm" width="360" :loading="isLoading">
        <span class="ft-16" style="cursor: pointer;">{{$t('注册')}}</span>
      </el-button>
      <div class="have-account goto-other">
        <span class="have-account-txt">{{$t('已有账号？')}}</span>
        <span class="go-log" @click="$router.push('/login')">{{$t('请登录')}}</span>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from './component/Layout.vue'
import {mapMutations, mapState} from "vuex";
import userRuleMixin from '../../../common/mixin/userRuleMixin.js'
import CountTime from 'components/common/CountTime/index.vue'
import Verify from 'commonComponent/Verify/index.vue'
import { mapData } from 'static_data/register_data.js'
import { getActiveMobileAreaCfg } from 'common/js/mobileAreaCfg'
import MobileAreaCodesSelect from 'components/common/MobileAreaCodesSelect'

export default {
  name: 'register.vue',
  mixins: [userRuleMixin],
  components: {
    Layout,
    CountTime,
    Verify,
    MobileAreaCodesSelect,
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this._initRegistSettingData()
      }
    },
    registerForm: {
      deep: true,
      async handler () {
        if (this.activeMobileAreaCfg.reg) {
          this.isPhoneCode = !this.activeMobileAreaCfg.reg.test(this.registerForm.mobile)
        }

        const bol = Object.values(this.registerForm).some(item => !item);
        if (bol ) return this.btnDisabled = true;
        this.btnDisabled = !await new Promise(resolve => this.$refs.registerForm.validate(resolve));
      }
    },
    'registerForm.email': {
			deep: true,
			handler() {
				this.$refs.registerForm.validateField('email', (err) => {
					this.isPhoneCodeForEmail = Boolean(err);
				})
			},
		},
    regSetting: {  //- 获取登录项之后删除不需要的form属性
      immediate: true,
      deep: true,
      handler (formMap) {
        Object.keys(mapData).forEach(key => {
          !formMap[mapData[key]] && delete this.registerForm[key]
        })
      }
    }
  },
  data () {
    return {
      registerForm: {
        loginName: "",
        loginPwd: "",
        reLoginPwd: "",
        mobile: "",
        addressis: "",
        email: "",
        qq: "",
        realName: "",
        mobileCaptchareg: "",
        mailCaptchareg: "",
        weChat: "",
        whatsapp: "",
        telegram: "",
      },
      btnDisabled: true,
      isLoading: false,
      isPhoneCode: true,
      isPhoneCodeForEmail: true,
      mobileAreaCode: null,
      startCount: false,
      startCountForEmail: false,
    }
  },
  methods: {
    //- 获取用户注册项
    async _initRegistSettingData () {
      const result = await this.$http.getRegistSetting();
      if (result.data.code) return
      this.set_reg_setting(result.data.regSetting)
    },
    //- 登录表单提交
    submitRegisterForm () {
      this.$refs.registerForm.validate(async valid => {
        if (!valid) return false;
        this.isLoading = true;
        const res = await this.$http.isNeedSliderCheck({ loginName: this.registerForm.loginName })
        this.isLoading = false;
        if (res.data.code) return
        if (res.data.msg) {
          this._sendRegisterForm()
        } else {
          this.useVerify('capVerify')
        }
      })
    },
    //- 发送数据到后端(用户注册)
    async _sendRegisterForm () {
      const { codeId, agentId } = this.$route.query;
      const mainDomain = window.location.host;

      if (codeId) {
        this.registerForm.codeId = codeId;
      } else if (agentId) {
        this.registerForm.agentId = agentId;
      }
      this.registerForm.registerDevice = this.equipmentId;
      this.registerForm.mainDomain = mainDomain;
      if (this.mobileAreaCode) {
        this.registerForm.mobileAreaCode = this.mobileAreaCode;
      }
      //- 禁用注册按钮
      this.btnDisabled = true;
      const res = await this.$http.sendRegisterInfo(Object.assign({}, this.registerForm, { loginType: 0 }));
      if (res.data.code === 0) {
        this.set_user_info(res.data.userInfo);
        this.set_user_token(res.data.token);
        this._getNickNameInfo()
        this.messageTip({ message: this.$t('注册成功'), type: 'success', duration: 1000, onClose: () => this.$router.replace("/") });
      } else {
        this.messageTip({ message: res.data.msg, duration: 1500 });
      }
      delete this.registerForm.captchaVerification;
      this.btnDisabled = false;
    },
    useVerify (name) {
      this.$refs[name].show()
    },
    //- 邮箱/短信验证成功
		verifySuccess (params, type) {
      this.$set(this.registerForm, 'captchaVerification', params.captchaVerification)
      this._getCode(type)
    },
    async _getCode (type) {
			const func = type === 'sms' ? this.$http.getSendMobCodeReg : this.$http.sendEmailCodeReg
			const params = type === 'sms' ? { mobile: this.registerForm.mobile, mobileAreaCode: this.mobileAreaCode, } : { email: this.registerForm.email, }
      const res = await func({
        captchaVerification: this.registerForm.captchaVerification,
				...params
      })
      if (res.data.code === 0) {
				type === 'sms' ? (this.startCount = true) : (this.startCountForEmail = true)
        this.messageTip({ message: this.$t('发送成功'), type: 'success' })
      } else {
        this.messageTip({ message: res.data.msg })
      }
    },
    capSuccess (params) {
      this.$set(this.registerForm, 'captchaVerification', params.captchaVerification);
      this._sendRegisterForm()
    },
    ...mapMutations('user', ['set_reg_setting', 'set_user_info', 'set_user_token'])
  },
  computed: {
    ...mapState('global', ['mobileAreaCodes']),
    ...mapState({
      regSetting: state => state.user.regSetting,
      equipmentId: state => state.global.equipmentId,
    }),
    activeMobileAreaCfg() {
      return getActiveMobileAreaCfg(this.mobileAreaCode, this.mobileAreaCodes)
    },
  }
}
</script>

<style scoped lang="scss">
.slider-check {
  background: $bg-ddd;
  border-radius: 8px;
  color: $c-f;
  cursor: pointer;
  @include flex(center);
  font-size: 16px;
}
.form-container {
  padding: 0 20px;
  .qq-input {
    /deep/ {
      .el-input__prefix i {
        width: 25px;
        height: 25px;
        background: url("./img/qq.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
  .wechat-input {
    /deep/ {
      .el-input__prefix i {
        width: 25px;
        height: 25px;
        background: url("./img/wechat.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
  .whatsapp-input {
    /deep/ {
      .el-input__prefix i {
        width: 25px;
        height: 25px;
        background: url("./img/whatsapp.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
  .telegram-input {
    /deep/ {
      .el-input__prefix i {
        width: 22px;
        height: 19px;
        background: url("./img/telegram.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
  .bog.login-btn {
    width: 359px;
    height: 39px;
    background: $c-a5 !important;
    border: 1px solid $c-a5;
  }
}
.register-btn.el-button--success {
  background: $c-ff5;
  opacity: 0.5;
  color: $c-f;
  width: 125px;
  height: 40px;
  &:hover {
    background: $c-ff5;
    border-color: $c-ff5;
  }
}

.multi-language {
	.register-btn.el-button--success {
		white-space: normal;
		word-wrap: break-word;
		word-break: normal;
	}
}
</style>
