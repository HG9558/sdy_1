<template>
  <el-form :model="alipayBankForm" class="bog add-bank-card-form" label-width="130px" ref="alipayBankForm" size="small" :rules="alipayBankRule">
    <el-form-item label="支付宝账号：" prop="cardNo">
      <el-input placeholder="请输入支付宝账号" :maxlength="32" v-model="alipayBankForm.cardNo"></el-input>
    </el-form-item>
    <el-form-item label="* 支付宝姓名：" prop="realName">
      <el-input v-if="isHaveReavName" disabled placeholder="请输入支付宝姓名" v-model="alipayBankForm.realName"></el-input>
      <el-input v-else v-model="alipayBankForm.realName" placeholder="请输入支付宝姓名"></el-input>
    </el-form-item>

    <el-form-item label="手机号：" prop="mobile">
      <el-input disabled v-model="userInfo.mobile"></el-input>
    </el-form-item>
    <el-form-item class="sm-code-input" label="短信验证码：" prop="code">
      <el-input v-model="alipayBankForm.code" :maxlength="6" placeholder="请输入短信验证码">
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
      alipayBankForm: {
        cardNo: "",
        code: "",
        captchareg: "",
        realName: "",
      },
      startCount: false,
    }
  },
  created () {
    this.$set(this.alipayBankForm, 'realName', this.userInfo.realName)
  },
  computed: {
    isHaveReavName () {
      return this.userInfo.realName
    }
  },
  methods: {
    bankSuccess (params) {
      this.alipayBankForm.captchareg = params.captchaVerification;
      this.$emit('_getMobileCode', {
        captchaVerification: this.alipayBankForm.captchareg, callback: () => {
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
    this.$refs.alipayBankForm.resetFields()
  },
  ...mapState({
    realName: state => !!state.user.realName
  }),
}
</script>

<style scoped lang="scss">

</style>