<template>
  <el-form class="bog add-bank-card-form" :model="cyBankForm" :rules="cyBankRules" label-width="130px" ref="cyBankForm" size="small">

    <el-form-item label="协议类型：" prop="currencyProtocol">
      <el-select class="w-100" popper-class="bog" placeholder="请选择协议类型" v-model="cyBankForm.currencyProtocol" value-key="id" @change="protocolChange">
        <el-option :key="item.id" :label="item.name" :value="item" v-for="item in protocalList"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="钱包类型：" prop="walletName">
      <el-select class="w-100" popper-class="bog" placeholder="请选择" v-model="cyBankForm.walletName" value-key="id">
        <el-option :key="item.id" :label="item.name" :value="item" v-for="item in crLogoList"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="钱包地址：" prop="walletAddress">
      <el-input placeholder="请输入钱包地址" :maxlength="42" v-model="cyBankForm.walletAddress"></el-input>
    </el-form-item>
    <el-form-item label="确认地址：" :maxlength="42" prop="checkWalletAddress">
      <el-input placeholder="请输入确认钱包地址" v-model="cyBankForm.checkWalletAddress"></el-input>
    </el-form-item>
    <el-form-item label="* 手机号：">
      <el-input disabled v-model="userInfo.mobile"></el-input>
    </el-form-item>

    <el-form-item class="sm-code-input" label="* 短信验证码：" prop="code">
      <el-input v-model="cyBankForm.code" :maxlength="6">
        <count-time className="count-time" :round="true" slot="suffix" :waitTime="60" :startCount.sync="startCount" @click="useVerify('verify')"></count-time>
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
  props: {
    crLogoList: Array,
  },
  data () {
    return {
      protocalList: [
        {
          id: 'ERC20',
          name: '以太坊（ERC20）'
        },
        {
          id: 'TRC20',
          name: '波场（TRC20）'
        },
      ],
      cyBankForm: {
        currencyProtocol: null,
        walletName: null,
        walletAddress: "",
        checkWalletAddress: "",
        code: "",
        captchareg: "",
      },
      startCount: false,
    }
  },
  methods: {
    bankSuccess (params) {
      this.cyBankForm.captchareg = params.captchaVerification;
      this.$emit('_getMobileCode', {
        captchaVerification: this.cyBankForm.captchareg, callback: () => {
          this.startCount = true;
        }
      })
    },
    //- 图形验证
    useVerify () {
      this.$refs.verify.show()
    },
    protocolChange () {
      this.cyBankForm.walletAddress && this.$refs.cyBankForm.validateField('walletAddress')
    }
  },
  deactivated () {
    this.$refs.cyBankForm.resetFields()
  }
}
</script>

<style scoped lang="scss">
/deep/ .sm-code-input {
  .el-input__inner {
    width: 288px;
  }
  .el-input__suffix-inner {
    @include flex(center);
  }
}
</style>