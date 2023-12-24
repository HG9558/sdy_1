<template>
  <div>
    <div class="warning-text  mobile-tip">
      为了您的隐私安全，信息在提交后将无法修改。
      请务必如实填写，以保护您的账号安全。
    </div>
    <div class="profile-dialog">
      <el-form :model="mobileForm" class="yszjl mobile-form" ref="mobileForm" size="small" :rules="mobileRules">
        <el-form-item :rules="activeMobileAreaCfg.rules" prop="mobile">
          <MobileAreaCodesSelect v-model="mobileAreaCode" @select="mobileForm.mobile = ''" />
          <el-input class="mobile-phone" clearable :maxlength="activeMobileAreaCfg.maxlength" placeholder="请输入手机号码" v-model="mobileForm.mobile"></el-input>
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
import { getActiveMobileAreaCfg } from 'common/js/mobileAreaCfg'
import MobileAreaCodesSelect from 'components/common/MobileAreaCodesSelect'
import { mapState } from "vuex"

export default {
  name: 'MobileSetting',
  components: {
    CountTime,
    Verify,
    MobileAreaCodesSelect,
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
      mobileAreaCode: null,
      mobileRules: {
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
          mobileAreaCode: this.mobileAreaCode,
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
        mobileAreaCode: this.mobileAreaCode,
      })

      if (res.data.code === 0) {
        (this.startCount = true);
        this.messageTip({ message: '发送成功，请查看手机', type: 'success' })
      } else {
        this.messageTip({ message: res.data.msg })
      }
    },
  },
  computed: {
    ...mapState('global', ['mobileAreaCodes']),
    activeMobileAreaCfg() {
      return getActiveMobileAreaCfg(this.mobileAreaCode, this.mobileAreaCodes)
    }
  },
  watch: {
    mobileForm: {
      deep: true,
      handler () {
        this.$refs.mobileForm.validateField('mobile', (err) => {
          this.isDisabeld = Boolean(err);
        })
      }
    },
  },
}
</script>

<style  lang="scss" scoped>
@import "../css/mobileSetting.scss";

.mobile-form /deep/ {
  .el-form-item .mobile-phone .el-input__inner {
    padding-left: 95px !important;
  }
  .mobileArea-select .el-popover__reference {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 4px 0 0 4px;
  }
}
</style>
