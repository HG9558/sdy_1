<template>
  <el-form :model="ecnyBankForm" class="bog add-bank-card-form" label-width="130px" ref="ecnyBankForm" size="small" :rules="ecnyBankRule">
    <el-form-item label="数字人民币编码：" prop="cardNo">
      <el-input placeholder="请输入数字人民币编码" :maxlength="32" v-model="ecnyBankForm.cardNo"></el-input>
    </el-form-item>
    <el-form-item label="数字人民币姓名：" prop="realName">
      <el-input placeholder="请输入数字人民币姓名" v-model="ecnyBankForm.realName"></el-input>
    </el-form-item>
    <el-form-item label="* 手机号：" prop="mobile">
      <el-input disabled v-model="userInfo.mobile"></el-input>
    </el-form-item>
    <el-form-item class="sm-code-input" label="短信验证码：" prop="code">
      <el-input v-model="ecnyBankForm.code" :maxlength="6">
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
import { mapState } from 'vuex'

export default {
  name: 'AliBank.vue',
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
      ecnyBankForm: {
        cardNo: "",
        code: "",
        captchareg: "",
        realName: "",
      },
      startCount: false,
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    bankSuccess (params) {
      this.ecnyBankForm.captchareg = params.captchaVerification;
      this.$emit('_getMobileCode', {
        captchaVerification: this.ecnyBankForm.captchareg, callback: () => {
          this.startCount = true;
        }
      })
    },
    //- 图形验证
    useVerify () {
      this.$refs.verify.show()
    },
  },
  deactivated () {
    this.$refs.ecnyBankForm.resetFields()
  },
   ...mapState({
    realName: state => !!state.user.realName
  }),
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
