<template>
  <layout>
    <div class="form-container">
      <el-form :model="registerForm" :rules="registerFormRule" ref="registerForm">

        <el-form-item prop="loginName" v-if="regSetting.loginNameisVisible">
          <el-input class="user-input" v-model="registerForm.loginName" :maxlength="10" clearable placeholder="用户名">
            <img slot="prefix" src="./img/icon-user.png" />
          </el-input>
        </el-form-item>

        <el-form-item prop="loginPwd" v-if="regSetting.loginPwdisVisible">
          <el-input class="user-input" v-model.trim="registerForm.loginPwd" type="password" :maxlength="18" clearable placeholder="密码">
              <img slot="prefix" src="./img/icon-lock.png" />
          </el-input>
        </el-form-item>

        <el-form-item prop="reLoginPwd" v-if="regSetting.reLoginPwdisVisible">
          <el-input class="user-input"   v-model.trim="registerForm.reLoginPwd" type="password" :maxlength="18" clearable placeholder="确认密码">
              <img slot="prefix" src="./img/icon-lock.png" />
          </el-input>
        </el-form-item>

        <el-form-item prop="addressis" v-if="regSetting.addressisVisible">
          <el-input class="user-input" prefix-icon="el-icon-location-information" v-model="registerForm.addressis" :maxlength="50" clearable placeholder="地址">
          </el-input>
        </el-form-item>

        <el-form-item prop="emailis" v-if="regSetting.emailisVisible">
          <el-input class="user-input" prefix-icon="el-icon-message" v-model="registerForm.emailis" :maxlength="20" clearable placeholder="邮箱">
          </el-input>
        </el-form-item>

        <el-form-item prop="qq" v-if="regSetting.qqisVisible">
          <el-input class="user-input" v-model="registerForm.qq" :maxlength="15" clearable placeholder="QQ">
          </el-input>
        </el-form-item>

        <el-form-item prop="weChat" v-if="regSetting.weChatisVisible">
          <el-input class="user-input" v-model="registerForm.weChat" :maxlength="20" clearable placeholder="微信">
          </el-input>
        </el-form-item>

        <el-form-item prop="realName" v-if="regSetting.realNameisVisible">
          <el-input class="user-input" prefix-icon="el-icon-user" v-model="registerForm.realName" :maxlength="20" clearable placeholder="真实姓名">
          </el-input>
        </el-form-item>

        <el-form-item class="mobile-login-form" prop="mobile" v-if="regSetting.mobileisVisible">
          <el-select :popper-append-to-body="false" v-model="mobileArea" placeholder="地区" @change="mobileLoginForm.mobile=''">
            <el-option label="中国" :value="1">中国</el-option>
            <el-option label="台湾" :value="2">台湾</el-option>
          </el-select>
          <el-input class="mobile-select" prefix-icon="el-icon-mobile-phone" v-model="registerForm.mobile" :maxlength="
                    mobileArea === 1 || mobileArea === '中国' ? 11 : 10
                  " clearable placeholder="手机号码">
          </el-input>
        </el-form-item>

        <el-form-item class="code-input" prop="mobileCaptchareg" v-if="regSetting.mobileCaptcharegisVisible">
          <el-input v-model="registerForm.mobileCaptchareg" :maxlength="6" clearable placeholder="短信验证码">
            <img width="26" slot="prefix" src="./img/code_icon.png" alt="">

            <count-time class="register-btn" slot="suffix" :waitTime="60" :startCount.sync="startCount" @click="useVerify('mbVerify')" :isPhoneCode="isPhoneCode"></count-time>
          </el-input>
          <Verify @success="mbSuccess" mode="pop" captchaType="blockPuzzle" ref="mbVerify" />
        </el-form-item>
        <el-form-item class="code-from">
          <Verify @success="capSuccess" mode="pop" captchaType="blockPuzzle" ref="capVerify" />
        </el-form-item>
      </el-form>
      <el-button class="bog login-btn" :disabled="btnDisabled" @click="submitRegisterForm" width="360" :loading="isLoading">
        <span class="ft-16">注册</span>
      </el-button>
      <div class="have-account goto-other">
        <span class="have-account-txt"> 已有账号？</span>
        <span class="go-log" @click="$router.push('/login')">请登录</span>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from './component/Layout.vue'
import { mapMutations, mapState } from "vuex";
import userRuleMixin from '../../../common/mixin/userRuleMixin.js'
import CountTime from 'components/common/CountTime/index.vue'
import Verify from 'commonComponent/Verify/index.vue'
import { mapData } from 'static_data/register_data.js'

export default {
  name: 'register.vue',
  mixins: [userRuleMixin],
  components: {
    Layout,
    CountTime,
    Verify
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
      async handler (data) {
        this.$refs.registerForm.validateField('mobile', (err) => {
          this.isPhoneCode = Boolean(err);
        })
        const bol = Object.values(this.registerForm).some(item => !item);
        if (bol ) return this.btnDisabled = true;
        this.btnDisabled = !await new Promise(resolve => this.$refs.registerForm.validate(resolve));
      }
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
        emailis: "",
        qq: "",
        realName: "",
        mobileCaptchareg: "",
        weChat: "",
      },
      btnDisabled: true,
      isLoading: false,
      isPhoneCode: true,
      mobileArea: 1,
      startCount: false,
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
      //- 禁用注册按钮
      this.btnDisabled = true;
      const res = await this.$http.sendRegisterInfo(Object.assign({}, this.registerForm, { loginType: 0 }));
      if (res.data.code === 0) {
        this.set_user_info(res.data.userInfo);
        this.set_user_token(res.data.token);
        this._getNickNameInfo()
        this.messageTip({ message: '注册成功', type: 'success', duration: 1000, onClose: () => this.$router.replace("/") });
      } else {
        this.messageTip({ message: res.data.msg, duration: 1500 });
      }
      delete this.registerForm.captchaVerification;
      this.btnDisabled = false;
    },
    useVerify (name) {
      this.$refs[name].show()
    },
    //- 验证成功
    mbSuccess (params) {
      this.$set(this.registerForm, 'captchaVerification', params.captchaVerification)
      this._getPhoneMesCode();
    },
    //- 获取手机号注册登录验证码
    async _getPhoneMesCode () {
      const res = await this.$http.getSendMobCodeReg({
        mobile: this.registerForm.mobile,
        captchaVerification: this.registerForm.captchaVerification,
        mobileAreaCode: this.mobileArea === 1 ? 86 : 886
      })
      if (res.data.code === 0) {
        (this.startCount = true);
        this.messageTip({ message: '发送成功，请查看手机', type: 'success' })
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
    ...mapState({
      regSetting: state => state.user.regSetting,
      equipmentId: state => state.global.equipmentId
    })
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
.register-btn.el-button--success {
  background: $c-ff5;
  opacity: 0.5;
  color: $c-f;
  width: 108px;
  height: 40px;
  &:hover {
    background: $c-ff5;
    border-color: $c-ff5;
  }
}
</style>