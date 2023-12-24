<template>
  <el-form class="bog add-bank-card-form" :model="otherPayForm" :rules="otherPayRule" label-width="130px"
    ref="otherPayForm" size="small">
    <el-form-item label="钱包类型：" prop="address">
      <el-select class="w-100" popper-class="bog" placeholder="请选择" v-model="otherPayForm.address" value-key="id">
        <el-option label="EBPAY" value="EBPAY"></el-option>
        <el-option label="TOPAY" value="TOPAY"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="钱包地址：" prop="cardNo">
      <el-input placeholder="请输入钱包地址" :maxlength="42" v-model="otherPayForm.cardNo"></el-input>
    </el-form-item>
    <el-form-item label="确认钱包地址:" :maxlength="42" prop="checkCardNo">
      <el-input placeholder="请输入确认钱包地址" v-model="otherPayForm.checkCardNo"></el-input>
    </el-form-item>
    <el-form-item label="手机号：">
      <el-input disabled v-model="userInfo.mobile"></el-input>
    </el-form-item>

    <el-form-item class="sm-code-input" label="短信验证码：" prop="code">
      <el-input v-model="otherPayForm.code" :maxlength="6" placeholder="请输入短信验证码">
        <count-time className="count-time" :round="true" slot="suffix" :waitTime="60" :startCount.sync="startCount"
          @click="useVerify('verify')"></count-time>
      </el-input>
      <Verify @success="bankSuccess" mode="pop" captchaType="blockPuzzle" ref="verify" />
    </el-form-item>
  </el-form>
</template>

<script>
import CountTime from 'components/common/CountTime/index.vue'
import Verify from 'commonComponent/Verify/index.vue'
import userRuleMixin from 'common/mixin/userRuleMixin.js'

export default {
  name: 'CryBank.vue',
  mixins: [userRuleMixin],
  components: {
    CountTime,
    Verify,
  },
  data () {
    return {
      otherPayForm: {
        address: null,
        cardNo: null,
        checkCardNo: "",
        mobile: "",
        code: "",
        captchareg: "",
      },
      startCount: false,
    }
  },
  methods: {
    bankSuccess (params) {
      this.otherPayForm.captchareg = params.captchaVerification;
      this.$emit('_getMobileCode', {
        captchaVerification: this.otherPayForm.captchareg, callback: () => {
          this.startCount = true;
        }
      })
    },
    //- 图形验证
    useVerify () {
      this.$refs.verify.show()
    },
    protocolChange () {
      this.otherPayForm.walletAddress && this.$refs.otherPayForm.validateField('walletAddress')
    }
  },
  deactivated () {
    this.$refs.otherPayForm.resetFields()
  }
}
</script>

<style scoped lang="scss">
/deep/ .sm-code-input {
  .el-input__suffix {
    display: flex;
    top: 1px;
  }
}
</style>