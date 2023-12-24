<template>
  <el-form class="bog add-bank-card-form" :model="elecBankForm" :label-width="isZhLanguage ? '130px' : '185px'" ref="elecBankForm" size="small" :rules="elecBankFormDataRule">

    <el-form-item prop="realName" :label="$t('真实姓名：')">
      <el-input v-if="bankDifferentName" v-model="elecBankForm.realName" :maxlength="60" :placeholder="$t('请输入真实姓名')"></el-input>
      <el-input v-else :disabled="!!isHaveReavName" v-model="elecBankForm.realName" :maxlength="60" :placeholder="$t('请输入真实姓名')"></el-input>
    </el-form-item>

    <el-form-item :label="$t('钱包类型：')" prop="bankName">
      <el-col :span="24">
        <el-select class="w-100" popper-class="bog" :placeholder="$t('请选择')" v-model="elecBankForm.bankName">
          <el-option :key="item.id" :label="item.bankName" :value="item.bankName" v-for="item in bankList"></el-option>
        </el-select>
      </el-col>
    </el-form-item>

    <el-form-item :label="$t('钱包账号：')" prop="cardNo">
      <el-input type="number" :placeholder="$t('请输入钱包账号：')" :maxlength="60" v-model="elecBankForm.cardNo"></el-input>
    </el-form-item>

    <template v-if="isNeedVfySms || isNeedVfyEMail">
      <el-form-item v-if="isNeedVfySms" :label="$t('手机号：')">
        <el-input disabled v-model="userInfo.mobile"></el-input>
      </el-form-item>

      <el-form-item v-else :label="$t('* 邮箱：')">
				<el-input disabled v-model="userInfo.email"></el-input>
			</el-form-item>

      <el-form-item class="sm-code-input" :label="isNeedVfySms ? $t('* 短信验证码：') : $t('* 邮箱验证码：')" prop="code">
        <el-input v-model="elecBankForm.code" :maxlength="6" :placeholder="isNeedVfySms ? $t('请输入短信验证码') : $t('请输入邮箱验证码')">
          <count-time className="count-time" :round="true" slot="suffix" :waitTime="60" :startCount.sync="startCount" @click="useVerify"></count-time>
        </el-input>

        <Verify @success="bankSuccess" mode="pop" captchaType="blockPuzzle" ref="bankVerify" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import getBankcardInfo from 'bankcardinfo';
import CountTime from 'components/common/CountTime/index.vue'
import Verify from 'commonComponent/Verify/index.vue'
import userRuleMixin from 'common/mixin/userRuleMixin.js'
import {mapGetters, mapState} from 'vuex'

const { VUE_APP_APP_SIGN, VUE_APP_APP_BANK_ARE_CODE } = process.env

export default {
  name: 'RmbBank.vue',
  mixins: [userRuleMixin],
  components: {
    CountTime,
    Verify
  },
  created () {
    // this._getProvs()
    this.getBackEndBankList();
    this.$set(this.elecBankForm, 'realName', this.userInfo.realName)
  },
  computed: {
    ...mapState('global', ['isNeedVfySms', 'isNeedVfyEMail']),
    ...mapGetters('global', ['isZhLanguage']),
    ...mapState({
      bankDifferentName: state=> state.user.bankDifferentName
    }),
    isHaveReavName () {
      return this.userInfo.realName
    }
  },
  watch: {
    'elecBankForm.cardNo': {
      handler (val) {
        // if(!val) return
        // if (this.timer !== null) {
        //   clearTimeout(this.timer)
        // }
        // this.timer = setTimeout(this.getBankName, 3000)
      },
    },
  },
  data () {
    return {
      elecBankForm: {
        bankName: "",
        cardNo: "",
        code: "",
        captchareg: "",
      },
      startCount: false,
      timer: null,
      bankList: [],
      elecBankFormDataRule: {
        realName: [
          { required: true, trigger: 'blur', message: this.$t('真实姓名不能为空'), },
        ],
        cardNo: [
          {
            required: true,
            message: this.$t('银行账号不能为空，请输入银行账号！'),
            trigger: 'blur',
          },
          {
            min: 1,
            max: 60,
            message: this.$t('请输入正确的钱包账号'),
            trigger: ['blur', 'change'],
          },
        ],
        bankName: [{ required: true, trigger: 'change', message: this.$t('请选择钱包类型') }],
      },
    }
  },
  methods: {
    //- 获取后端返回银行卡列表
    async getBackEndBankList () {
      const res = await this.$http.getElecTypeList({ areaCode: VUE_APP_APP_BANK_ARE_CODE || 'CN' });
      // const res = await this.$http.getElecTypeList({ areaCode: 'PH' || 'CN' });
      if (res.data.code) return
      this.bankList = res.data.eMoneys;
    },
    //- 图形验证
    useVerify () {
      this.$refs.bankVerify.show()
    },
    //-图形成功点击事件
    bankSuccess (params) {
      this.elecBankForm.captchareg = params.captchaVerification;
      this.$emit('_getMobileCode', {
        captchaVerification: this.elecBankForm.captchareg, callback: () => {
          this.startCount = true;
        }
      })
    },
  },
  deactivated () {
    this.$refs.elecBankForm.resetFields()
  }
}
</script>

<style scoped lang="scss">
</style>
