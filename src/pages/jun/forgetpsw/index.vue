<template>
  <div class="box">
    <div class="content">
      <div class="title">{{ isNeedVfySms? $t('使用手机号找回') : $t('使用邮箱找回') }}</div>
      <div class="stpe">
        <div class="stpe-one">{{ isNeedVfySms ? $t('1、填写手机号') : $t('1、填写邮箱') }}</div>
        <div :class="active === 2 ? 'stpe-three' : 'stpe-two'">{{$t('2、更改密码')}}</div>
      </div>
      <div v-show="active === 1" class="row justify-content-center">
        <div class="row">
          <div class="reg-card col py-3">
            <el-form :model="loginForm" :rules="logindataRule" ref="logindataForm">
              <el-form-item v-if="isNeedVfySms" :rules="activeMobileAreaCfg.rules" prop="phone">
                <MobileAreaCodesSelect v-model="mobileAreaCode" @select="loginForm.phone = ''" />
                <el-input class="user-input phone" v-model="loginForm.phone" :maxlength="activeMobileAreaCfg.maxlength" clearable :placeholder="$t('请输入您的手机号')">
                </el-input>
              </el-form-item>

              <el-form-item v-else :rules="emailRule" prop="email">
								<el-input class="user-input" v-model="loginForm.email" clearable :placeholder="$t('请输入您的电子邮箱')">
								</el-input>
							</el-form-item>

              <el-form-item prop="msgcode">
                <el-input class="user-message" v-model="loginForm.msgcode" :maxlength="6" clearable :placeholder="$t('请输入您的验证码')">
                </el-input>
                <button @click="useVerify" ref="btnPhoneCode" :class="{
                    'mes-code-send': beginAnim,
                    'mes-code-btn-disabled': isPhoneFlog === false,
                  }" class="mes-code-btn" :disabled="isPhoneFlog === false" type="button">
                  {{$t('获取验证码')}}
                </button>
                <Verify @success="success" mode="pop" captchaType="blockPuzzle" ref="verify" />
              </el-form-item>
            </el-form>
            <el-button @click="dataFormSubmitHandle('logindataForm')" :class="{ 'loginBtn-on': bottonFlog }" class="loginBtn">{{$t('下一步')}}</el-button>
            <div class="question-customer">
              <span @click="gotoUrl" class="question">{{$t('遇到问题?')}}</span>
              <span @click="gotoUrl" class="customer">{{$t('联系客服')}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="from-div" v-show="active === 2">
        <el-form :model="updatePsw" :rules="updatedataRule" ref="dataForm">
          <el-form-item prop="password">
            <el-input class="user-input" v-model.trim="updatePsw.password" type="password" :maxlength="18" clearable :placeholder="$t('新密码')">
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input class="user-input" v-model.trim="updatePsw.confirmPassword" type="password" :maxlength="18" clearable :placeholder="$t('确认新密码')">
            </el-input>
          </el-form-item>
          <el-form-item class="btn-class" prop="btnBack">
            <el-button @click="active = 1" class="btn-pubilc">{{$t('返回')}}</el-button>
            <el-button @click="dataFormSubmitHandle('dataForm')" class="btn-pubilc change-btn">{{$t('更改密码')}}</el-button>
          </el-form-item>
          <div class="question-customer-password">
            <span @click="gotoUrl" class="question">{{$t('遇到问题?')}}</span>
            <span @click="gotoUrl" class="customer">{{$t('联系客服')}}</span>
          </div>
        </el-form>
      </div>
      `
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import {
  btnCodeMethods,
  mediumPassword,
  captcharegEXP,
  getEail,
} from "@/plugins/auth";
import {mapGetters, mapState} from "vuex";
import Verify from 'commonComponent/Verify/index.vue'
import { getActiveMobileAreaCfg } from 'common/js/mobileAreaCfg'
import MobileAreaCodesSelect from 'components/common/MobileAreaCodesSelect'

export default {
  components: {
    Verify,
    MobileAreaCodesSelect,
  },
  computed: {
		...mapGetters('global', ['isViLanguage']),
    ...mapState('global', ['mobileAreaCodes']),
    // 修改密码规则校验
    updatedataRule () {
      const validatePassword = (rule, value, callback) => {
        // 密码
        if (!value) {
					callback(new Error(this.$t('请输入密码')));
				} else if (!mediumPassword(value)) {
					callback(new Error(this.$t('请输入6~18位数字或字母组合的密码')));
				} else {
          callback();
        }
      };
      const validateComfirmpsw = (rule, value, callback) => {
        // 确认密码
        if (!value) {
					callback(new Error(this.$t('请输入密码')));
				} else if (this.updatePsw.password !== value) {
					callback(new Error(this.$t('密码与确认密码不一致，请重新输入')));
				} else {
          callback();
        }
      };
      return {
        password: [
          { required: true, message: this.$t('请输入密码'), trigger: "blur" },
          { validator: validatePassword, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: this.$t('确认密码不能为空'), trigger: "blur" },
          { validator: validateComfirmpsw, trigger: "blur" },
        ],
      };
    },
    // 找回密码规则
    logindataRule () {
      const validateCaptchareg = (rule, value, callback) => {
        // 图形验证码
        if (!value) {
					callback(new Error(this.$t('验证码不能为空')));
        } else if (!captcharegEXP(value)) {
					callback(new Error(this.$t('请输入正确验证码')));
        } else {
          callback();
        }
      };
      return {
        captchareg: [
					{ required: true, message: this.$t('图形验证码不能为空'), trigger: "blur" },
					{ validator: validateCaptchareg, triggger: "blur" },
        ],
        msgcode: [
					{ required: true, message: this.$t('验证码不能为空'), trigger: "blur" },
        ],
      };
    },
    emailRule() {
			const validateEmail = (rule, value, callback) => {
				if (!value) {
					callback(new Error('请输入邮箱'))
				} else if (!getEail(value)) {
					callback(new Error('请输入正确的邮箱'))
				} else {
					callback()
				}
			}
			return [
				{ required: true, message: this.$t('邮件地址不能为空'), trigger: 'blur' },
				{ validator: validateEmail, trigger: 'blur' },
			]
		},
    beginAnim () {
			if (this.isNeedVfySms) {
				return this.loginForm.phone !== "" && this.activeMobileAreaCfg.reg.test(this.loginForm.phone)
			}

			return this.loginForm.email !== "" && getEail(this.loginForm.email)
    },
    activeMobileAreaCfg() {
      return getActiveMobileAreaCfg(this.mobileAreaCode, this.mobileAreaCodes)
    },
    ...mapState('global', ['mobileAreaCodes', 'isNeedVfySms', 'isNeedVfyEMail']),
    ...mapState({ serUrl: state => state.user.serUrl }),
  },
  data () {
    return {
      active: 1,
      loginForm: {
        phone: "",
        msgcode: "",
        captchareg: "",
      },
      updatePsw: {
        password: "",
        confirmPassword: "",
      },
      nowToken: "",
      isPhoneFlog: false,
      bottonFlog: false,
      isRefresh: false,
      imgCode: "",
      codeSign: "",
      mobileAreaCode: null,
    };
  },
  mounted () {
    this.getCode();
  },
  watch: {
    loginForm: {
      handler (newValue) {
				if (this.isNeedVfySms) {
					this.bottonFlog = newValue.msgcode !== "" && newValue.phone !== ""
					this.$refs.logindataForm.validateField('phone', (err) => {
						this.isPhoneFlog = Boolean(!err)
					})
				} else {
					this.bottonFlog = newValue.msgcode !== "" && newValue.email !== ""
					this.$refs.logindataForm.validateField('email', (err) => {
						this.isPhoneFlog = Boolean(!err)
					})
				}
      },
      deep: true,
    },
  },
  methods: {
    selectChange () {
      this.loginForm.phone = ''
    },
    // 前往客服
    gotoUrl () {
      window.open(this.serUrl);
    },
    // 获取图形验证码
    getCode () {
      this.isRefresh = true;
      this.$http.getCaptcha({ terminal: 0 })
        .then((res) => {
          if (res.status === 200) {
            this.imgCode = "data:image/jpeg;base64," + res.data.code;
            this.codeSign = res.data.codeSign;
            this.isRefresh = false;
          } else {
            this.isRefresh = false;
          }
        })
        .catch(() => {
          this.isRefresh = false;
        });
    },
    // 获取验证码
    mesgcodeClick: debounce(
      function () {
        let btn = this.$refs.btnPhoneCode;
        let wait = 60;
        const htmlText = this.$t('获取验证码');
        const params = this.isNeedVfySms ? {
					mobile: this.loginForm.phone,
					mobileAreaCode: this.mobileAreaCode,
				} : {
					vaildType: 0,
					email: this.loginForm.email,
				}
        this.$http.getforgetpsw({
          captchaVerification: this.loginForm.captchareg,
          codeSign: this.codeSign,
					...params,
        })
          .then((res) => {
            if (res.data.code === 0) {
              btnCodeMethods(btn, wait, htmlText, this.time);
              this.messageTip({message: this.$t('发送成功，请查看手机'), type: 'success'});
              this.nowToken = res.data.token;
            } else {
              this.messageTip({message:res.data.msg})
            }
          })
          .catch((err) => {
            btn.innerText = htmlText;
            btn.removeAttribute("disabled");
            clearInterval(this.time);
            this.getCode();
          });
      },
      1000,
      { leading: true, trailing: false }
    ),
    // 表单提交
    dataFormSubmitHandle: debounce(
      function (data) {
        this.$refs[data].validate((valid) => {
          if (!valid) {
            return false;
          }
          if (this.nowToken === "") {
            return this.messageTip({ message: this.$t('请先发送验证码至手机') });
          }
          if (data === "logindataForm") {
            const params = this.isNeedVfySms ? {
							mobile: this.loginForm.phone,
						} : {
							vaildType: 0,
							email: this.loginForm.email,
						}

            const data = {
              code: this.loginForm.msgcode,
              token: this.nowToken,
							...params,
            }
            this.$http.getValidCode(data).then((res) => {
              if (res.status === 200) {
                if (res.data.code !== 0) return this.messageTip({ message: res.data.msg });
                if (this.active++ > 2) this.active = 0;
                this.nowToken = res.data.token;
              } else {
                this.messageTip({ message: res.data.msg });
              }
            });
          } else {
            const data = {
              vaildType: this.isNeedVfySms ? 1 : 0,
              password: this.updatePsw.password,
              confirmPassword: this.updatePsw.confirmPassword,
              token: this.nowToken,
            };
            this.$http.getModpwd(data).then((res) => {
              if (res.status === 200) {
                if (res.data.code !== 0) return this.messageTip({ message: res.data.msg });
                this.messageTip({ message: this.$t('密码修改成功!') });
                this.$router.push("/login");
              } else {
                this.messageTip({ message: res.data.msg });
              }
            });
          }
        });
      },
      1000,
      { leading: true, trailing: false }
    ),
    useVerify () {
      this.$refs.verify.show()
    },
    success (params) {
      this.loginForm.captchareg = params.captchaVerification
      this.mesgcodeClick()
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";

.box /deep/ {
  .mobileArea-select .el-popover__reference {
    position: absolute;
    left: 0;
    height: 100%;
    border-radius: 4px 0 0 4px;
  }
}
</style>
