<template>
  <div class="box">
    <div class="content">
      <div class="title">使用手机号找回</div>
      <div class="stpe">
        <div class="stpe-one">1、填写手机号</div>
        <div :class="active === 2 ? 'stpe-three' : 'stpe-two'">2、更改密码</div>
      </div>
      <div v-show="active === 1" class="row justify-content-center">
        <div class="row">
          <div class="reg-card col py-3">
            <el-form :model="loginForm" :rules="logindataRule" ref="logindataForm">
              <el-form-item prop="phone">
                <el-select popper-class="forgetpsw-select"  v-model="mobileArea" placeholder="地区" @change="selectChange" :popper-append-to-body="false">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-input class="user-input phone" v-model="loginForm.phone" :maxlength="mobileArea === 1 || mobileArea === '中国' ? 11 : 10  " clearable placeholder="请输入您的手机号">
                </el-input>
              </el-form-item>
              <el-form-item prop="msgcode">
                <el-input class="user-message" v-model="loginForm.msgcode" :maxlength="6" clearable placeholder="请输入您的验证码">
                </el-input>
                <button @click="useVerify" ref="btnPhoneCode" :class="{
                    'mes-code-send': beginAnim,
                    'mes-code-btn-disabled': isPhoneFlog === false,
                  }" class="mes-code-btn" :disabled="isPhoneFlog === false" type="button">
                  获取验证码
                </button>
                <Verify @success="success" mode="pop" captchaType="blockPuzzle" ref="verify" />
              </el-form-item>
            </el-form>
            <el-button @click="dataFormSubmitHandle('logindataForm')" :class="{ 'loginBtn-on': bottonFlog }" class="loginBtn">下一步</el-button>
            <div class="question-customer">
              <span @click="gotoUrl" class="question">遇到问题?</span>
              <span @click="gotoUrl" class="customer">联系客服</span>
            </div>
          </div>
        </div>
      </div>
      <div class="from-div" v-show="active === 2">
        <el-form :model="updatePsw" :rules="updatedataRule" ref="dataForm">
          <el-form-item prop="password">
            <el-input class="user-input" v-model.trim="updatePsw.password" type="password" :maxlength="18" clearable placeholder="新密码">
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input class="user-input" v-model.trim="updatePsw.confirmPassword" type="password" :maxlength="18" clearable placeholder="确认新密码">
            </el-input>
          </el-form-item>
          <el-form-item class="btn-class" prop="btnBack">
            <el-button @click="active = 1" class="btn-pubilc">返回</el-button>
            <el-button @click="dataFormSubmitHandle('dataForm')" class="btn-pubilc change-btn">更改密码</el-button>
          </el-form-item>
          <div class="question-customer-password">
            <span @click="gotoUrl" class="question">遇到问题?</span>
            <span @click="gotoUrl" class="customer">联系客服</span>
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
  TestPhoneRegEXP,
  mediumPassword,
  captcharegEXP,
} from "@/plugins/auth";
import { mapState } from "vuex";
import Verify from 'commonComponent/Verify/index.vue'

export default {
  components: {
    Verify,
  },
  computed: {
    // 修改密码规则校验
    updatedataRule () {
      const validatePassword = (rule, value, callback) => {
        // 密码
        if (!value) {
          callback(new Error("请输入密码"));
        } else if (!mediumPassword(value)) {
          callback(new Error("请输入6~18位数字或字母组合的密码"));
        } else {
          callback();
        }
      };
      const validateComfirmpsw = (rule, value, callback) => {
        // 确认密码
        if (!value) {
          callback(new Error("请输入密码"));
        } else if (this.updatePsw.password !== value) {
          callback(new Error("密码与确认密码不一致，请重新输入"));
        } else {
          callback();
        }
      };
      return {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validateComfirmpsw, trigger: "blur" },
        ],
      };
    },
    // 找回密码规则
    logindataRule () {
      const validatePhone = (rule, value, callback) => {
        // 手机
        if (!value) {
          callback(new Error("请输入手机号"));
        } else if (!TestPhoneRegEXP(value, this.mobileArea)) {
          callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      };
      const validateCaptchareg = (rule, value, callback) => {
        // 图形验证码
        if (!value) {
          callback(new Error("请输入验证码"));
        } else if (!captcharegEXP(value)) {
          callback(new Error("请输入正确验证码"));
        } else {
          callback();
        }
      };
      return {
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          { validator: validatePhone, triggger: "blur" },
        ],
        captchareg: [
          { required: true, message: "图形验证码不能为空", trigger: "blur" },
          { validator: validateCaptchareg, triggger: "blur" },
        ],
        msgcode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      };
    },
    beginAnim () {
      return (
        this.loginForm.phone !== "" && TestPhoneRegEXP(this.loginForm.phone, this.mobileArea)
      );
    },
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
      mobileArea: '中国',
      mobileAreaCode: 86,
      options: [
        {
          value: 1,
          label: "中国",
        },
        {
          value: 2,
          label: "台湾",
        },
      ],
    };
  },
  mounted () {
    this.getCode();
  },
  watch: {
    loginForm: {
      handler (newValue) {
        if (
          newValue.msgcode !== "" &&
          newValue.phone !== ""
        ) {
          this.bottonFlog = true;
        } else {
          this.bottonFlog = false;
        }
        if (
          !TestPhoneRegEXP(newValue.phone, this.mobileArea)
        ) {
          this.isPhoneFlog = false;
        } else {
          this.isPhoneFlog = true;
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
        const htmlText = "获取验证码";
        this.$http.getforgetpsw({
          mobile: this.loginForm.phone,
          captchaVerification: this.loginForm.captchareg,
          codeSign: this.codeSign,
          mobileAreaCode: this.mobileArea === '中国' || this.mobileArea === 1 ? 86 : 886
        })
          .then((res) => {
            if (res.data.code === 0) {
              btnCodeMethods(btn, wait, htmlText, this.time);
              this.messageTip({message:"发送成功，请查看手机"});
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
            return this.messageTip({ message: "请先发送验证码至手机" });
          }
          if (data === "logindataForm") {
            const data = {
              mobile: this.loginForm.phone,
              code: this.loginForm.msgcode,
              token: this.nowToken,
            };
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
              password: this.updatePsw.password,
              confirmPassword: this.updatePsw.confirmPassword,
              token: this.nowToken,
            };
            this.$http.getModpwd(data).then((res) => {
              if (res.status === 200) {
                if (res.data.code !== 0) return this.messageTip({ message: res.data.msg });
                this.messageTip({ message: "密码修改成功!" });
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
</style>