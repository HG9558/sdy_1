<template>
  <el-form class="bog add-bank-card-form" :model="rmbBankForm" :label-width="isZhLanguage ? '130px' : '185px'" ref="rmbBankForm" size="small" :rules="rmbBankFormDataRule">

    <el-form-item prop="realName" :label="$t('真实姓名：')">
      <el-input v-if="bankDifferentName" v-model="rmbBankForm.realName" :maxlength="60" :placeholder="$t('请输入真实姓名')"></el-input>
      <el-input v-else :disabled="!!isHaveReavName" v-model="rmbBankForm.realName" :maxlength="60" :placeholder="$t('请输入真实姓名')"></el-input>
    </el-form-item>

		<!--	澳币站点	-->
		<template v-if="isAud">
			<el-form-item :label="$t('提款方式：')" prop="bankName">
				<el-col :span="24">
					<el-select @change="handleChangeBankName" class="w-100" popper-class="yszjl" :placeholder="$t('请选择')" v-model="rmbBankForm.bankName">
						<el-option
							:key="item.id"
							:label="item.bankName"
							:value="item.bankName"
							v-for="item in bankList"
						></el-option>
					</el-select>
				</el-col>
			</el-form-item>

			<el-form-item v-if="isSelectBank" label="* BSB：" prop="address">
				<el-input :placeholder="$t('请输入BSB码')" :maxlength="10" v-model="rmbBankForm.address"></el-input>
			</el-form-item>

			<el-form-item :label="isSelectBank ? $t('账户号码：') : 'PAYID：'" prop="cardNo" :rules="cardNoRule">
				<el-input type="text" :placeholder="isSelectBank ? $t('请输入账户号码') : $t('请输入PAYID账号')" :maxlength="60" v-model="rmbBankForm.cardNo"></el-input>
			</el-form-item>
		</template>

    <template v-else>
			<el-form-item :label="$t('银行账号：')" prop="cardNo">
				<el-input type="number" :placeholder="$t('请输入银行账号')" v-model="rmbBankForm.cardNo"></el-input>
			</el-form-item>

			<el-form-item :label="$t('开户银行：')" prop="bankName">
				<el-col :span="24">
					<el-select class="w-100" popper-class="bog" @change="handleChangeBank" :placeholder="$t('请选择')" v-model="rmbBankForm.bankName">
						<el-option :key="item.id" :label="item.bankName" :value="item.bankName" v-for="item in bankList"></el-option>
					</el-select>
				</el-col>
			</el-form-item>

			<!--    <el-form-item class="account_area" :label="$t('开户银行区域：')" prop="city">-->
			<!--      <el-col :span="11">-->
			<!--        <el-select class="province w-100" popper-class="bog" @change="_getCitys" :placeholder="$t('请选择')" v-model="rmbBankForm.province">-->
			<!--          <el-option :key="item.value" :label="item.prov" :value="item.prov" v-for="item in provsList"></el-option>-->
			<!--        </el-select>-->
			<!--      </el-col>-->

			<!--      <el-col :span="11" :offset="2">-->
			<!--        <el-select class="city w-100" popper-class="bog" :placeholder="$t('请选择')" v-model="rmbBankForm.city">-->
			<!--          <el-option :key="item.value" :label="item.city" :value="item.city" v-for="item in citysList"></el-option>-->
			<!--        </el-select>-->
			<!--      </el-col>-->

			<!--    </el-form-item>-->

			<el-form-item :label="$t('支行名称：')" prop="address">
				<el-input :placeholder="$t('请输入支行名称')" :maxlength="60" v-model="rmbBankForm.address"></el-input>
			</el-form-item>
		</template>
    <template v-if="isNeedVfySms || isNeedVfyEMail">
      <el-form-item v-if="isNeedVfySms" :label="$t('* 手机号：')">
        <el-input disabled v-model="userInfo.mobile"></el-input>
      </el-form-item>
    
			<el-form-item v-else :label="$t('* 邮箱：')">
				<el-input disabled v-model="userInfo.email"></el-input>
			</el-form-item>

    <el-form-item class="sm-code-input" :label="isNeedVfySms ? $t('* 短信验证码：') : $t('* 邮箱验证码：')" prop="code">
      <el-input v-model="rmbBankForm.code" :maxlength="6" :placeholder="isNeedVfySms ? $t('请输入短信验证码') : $t('请输入邮箱验证码')">
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
    this.$set(this.rmbBankForm, 'realName', this.userInfo.realName)
  },
  computed: {
    ...mapState('global', ['isNeedVfySms', 'isNeedVfyEMail']),
		...mapGetters('global', ['isZhLanguage']),
		...mapState({
      bankDifferentName: state=> state.user.bankDifferentName
    }),
    isHaveReavName () {
      return this.userInfo.realName
    },
		isSelectBank () {
			return this.rmbBankForm.bankName !== 'PAYID'
		},
		cardNoRule() {
			return [{ required: true, message: (this.isSelectBank ? this.$t('账户号码不能为空！') : this.$t('PAYID不能为空！')), trigger: 'blur', min: 1, max: 60, }]
		},
  },
  watch: {
    'rmbBankForm.cardNo': {
      handler (val) {
        // if (this.timer !== null) {
        //   clearTimeout(this.timer)
        // }
        // this.timer = setTimeout(this.getBankName, 3000)
      },
    },
  },
  data () {
		const isAud = VUE_APP_APP_BANK_ARE_CODE === 'AUD'
    return {
			isAud,
      rmbBankForm: {
        address: "",
        bankName: "",
        cardNo: "",
        city: "",
        province: "",
        code: "",
        captchareg: "",
      },
      startCount: false,
      timer: null,
      provsList: [],
      citysList: [],
      bankList: [],
      rmbBankFormDataRule: {
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
            message: this.$t('请输入正确的银行账号'),
            trigger: ['blur', 'change'],
          },
        ],
        address: isAud ? [{ validator: this.validateBSB, trigger: "blur" }] : [],
				bankName: [{ required: true, trigger: 'change', message: isAud ? this.$t('请选择提款方式') : this.$t('请选择开户银行') }],
			},
		}
  },
  methods: {
		validateBSB(rule, value, callback) {
			if (!value) {
				callback(new Error(this.$t('bsb码不能为空！')));
			} else if (!/[0-9]{6,10}$/.test(value)) {
				callback(new Error(this.$t('请输入正确的bsb码')));
			} else {
				callback();
			}
		},
		handleChangeBankName() {
			this.rmbBankForm.cardNo = ''
			this.$nextTick(() => {
				this.$refs.rmbBankForm && this.$refs.rmbBankForm.clearValidate()
				if (!this.selectBank) {
					delete this.rmbBankForm.address
				}
			})
		},
    //- 查询银行名称
    getBankName () {
      getBankcardInfo.getBankBin(this.rmbBankForm.cardNo, (err, data) => {
        if (err) {
          this.rmbBankForm.bankName = ""
          return this.messageTip({ message: this.$t('请输入正确的银行卡号或暂不支持该银行') })
        }
        data.bankName && (this.rmbBankForm.bankName = data.bankName)
      })
    },
    //- 获取后端返回银行卡列表
    async getBackEndBankList () {
      const res = await this.$http.getBackEndBankList({ areaCode: VUE_APP_APP_BANK_ARE_CODE || 'CN' });
      if (res.data.code) return
      this.bankList = res.data.banks;
    },
    //- 省份
    async _getProvs () {
      const res = await this.$http.getProvs();
      if (res.data.code) return
      this.provsList = res.data.provs;
      if (this.provsList.length) {
        this.rmbBankForm.province = this.provsList[0].prov;
        this._getCitys();
      }
    },
    //- 城市
    async _getCitys () {
      const res = await this.$http.getCitys({ prov: this.rmbBankForm.province });
      if (res.data.code) return
      this.citysList = res.data.citys;
      this.rmbBankForm.city = this.citysList[0].city;
    },
    handleChangeBank() {
      // this._getCitys()
    },
    //- 图形验证
    useVerify () {
      this.$refs.bankVerify.show()
    },
    //-图形成功点击事件
    bankSuccess (params) {
      this.rmbBankForm.captchareg = params.captchaVerification;
      this.$emit('_getMobileCode', {
        captchaVerification: this.rmbBankForm.captchareg, callback: () => {
          this.startCount = true;
        }
      })
    },
  },
  deactivated () {
    this.$refs.rmbBankForm.resetFields()
  }
}
</script>

<style scoped lang="scss">
/deep/ .sm-code-input {
  .el-input__inner {
    width: 275px;
  }
  .el-input__suffix-inner {
    @include flex(center);
  }
}
</style>
