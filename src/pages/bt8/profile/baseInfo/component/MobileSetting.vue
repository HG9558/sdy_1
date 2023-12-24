<template>
  <div>
    <div class="warning-text  mobile-tip">
      为了您的隐私安全，信息在提交后将无法修改。
      请务必如实填写，以保护您的账号安全。
    </div>
    <div class="profile-dialog">
      <el-form :model="mobileForm" class="bog mobile-form" ref="mobileForm" size="small" :rules="mobileRules">
        <el-form-item prop="mobile" >
          <el-select :popper-append-to-body="false" v-model="mobileArea" placeholder="地区" @change="mobileLoginForm.mobile=''" popper-class="mobile-drop">
            <el-option label="中国" :value="1">中国</el-option>
            <el-option label="台湾" :value="2">台湾</el-option>
          </el-select>
          <el-input class="mobile-phone" :maxlength="mobileArea === 1 || mobileArea === '中国' ? 11 : 10" placeholder="请输入手机号码" v-model="mobileForm.mobile"></el-input>
        </el-form-item>

        <el-form-item prop="mobileCaptchareg">
          <el-input class="smcode-input" v-model="mobileForm.code" :maxlength="6" clearable placeholder="请输入短信验证码">
            <span slot="prefix">验证码：</span>
            <count-time class="profile-smcode" slot="suffix" :waitTime="60" :startCount.sync="startCount" @click="useVerify" :isPhoneCode="isDisabeld"></count-time>
          </el-input>
          <Verify @success="mbSuccess" mode="pop" captchaType="blockPuzzle" ref="mbVerify" />
        </el-form-item>

      </el-form>
      <el-button class="self-footer" type="primary" @click="_bingMobile" :loading="loading">确定</el-button>
    </div>
  </div>
</template>

<script>
import CountTime from 'components/common/CountTime';
import Verify from 'commonComponent/Verify';
export default {
  name: 'MobileSetting',
  components: {
    CountTime,
    Verify
  },
  data () {
    return {
      loading: false,
      startCount: false, //- 开始倒计时
      isDisabeld: true,
      mobileForm: {
        mobile: "",
        code: "",
        captchareg: "",
      },
      mobileArea: 1,
      mobileAreaCode: 86,
      mobileRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: this.validatePhone, trigger: 'change'},
        ],
        captchareg: [
          { required: true, message: "请输入图形验证码", trigger: "blur" },
          // { validator: validatePhone, trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    _bingMobile () {
      this.$refs.mobileForm.validate(async (valid) => {
        if (!valid) return;
        const data = {
          mobile: this.mobileForm.mobile,
          code: this.mobileForm.code,
        };
        const res = await this.$http.vfyMobCode(data);
        if (res.data.code) {
          this.messageTip({
            message: res.data.msg || '校验验证吗失败',
          })
          return
        }
        this.$emit('update:showDialog', false);
        this.messageTip({ message: '手机绑定成功', type: 'success' })
        //- 重新获取用户信息
        this._getUserInfo();
      });
    },
    useVerify () {
      this.$refs.mbVerify.show()
    },
    mbSuccess (params) {
      this.$set(this.mobileForm, 'captchareg', params.captchaVerification)
      this._getPhoneMesCode();
    },
    async _getPhoneMesCode () {
      const res = await this.$http.sendMobCode({
        mobile: this.mobileForm.mobile,
        captchaVerification: this.mobileForm.captchareg,
        mobileAreaCode: this.mobileArea === 1 ? 86 : 886
      })

      if (res.data.code === 0) {
        (this.startCount = true);
        this.messageTip({ message: '发送成功，请查看手机', type: 'success' })
      } else {
        this.messageTip({ message: res.data.msg })
      }
    },
    validatePhone (rule, value, callback) {
      const reg = this.mobileArea === 2 ? /^09[0-9]\d{7}$/ : /^1[1-9]\d{9}$/
      if (!value) {
        callback(new Error("请输入手机号"));
        this.isDisabeld = true;
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号码"));
        this.isDisabeld = true;
      } else {
        this.isDisabeld = false;
        callback();
      }
    }
  },
}
</script>

<style  lang="scss" scoped>
@import "../css/mobileSetting.scss";
</style>
