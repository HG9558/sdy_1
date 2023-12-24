<template>
  <el-form class="bog add-bank-card-form" :model="rmbBankForm" label-width="130px" ref="rmbBankForm" size="small" :rules="rmbBankFormDataRule">

    <el-form-item label="真实姓名：">
      <el-input disabled v-model="userInfo.realName"></el-input>
    </el-form-item>

    <el-form-item label="银行账号：" prop="cardNo">
      <el-input type="number" placeholder="请输入银行账号" :maxlength="19" v-model="rmbBankForm.cardNo"></el-input>
    </el-form-item>

    <el-form-item label="* 开户银行：">
      <el-col :span="24">
        <el-select class="w-100" popper-class="bog" @change="_getCitys" placeholder="请选择" v-model="rmbBankForm.bankName">
          <el-option :key="item.id" :label="item.bankName" :value="item.bankName" v-for="item in bankList"></el-option>
        </el-select>
      </el-col>
    </el-form-item>

    <el-form-item class="account_area" label="开户银行区域：" prop="city">
      <el-col :span="11">
        <el-select class="province w-100" popper-class="bog" @change="_getCitys" placeholder="请选择" v-model="rmbBankForm.province">
          <el-option :key="item.value" :label="item.prov" :value="item.prov" v-for="item in provsList"></el-option>
        </el-select>
      </el-col>

      <el-col :span="11" :offset="2">
        <el-select class="city w-100" popper-class="bog" placeholder="请选择" v-model="rmbBankForm.city">
          <el-option :key="item.value" :label="item.city" :value="item.city" v-for="item in citysList"></el-option>
        </el-select>
      </el-col>

    </el-form-item>

    <el-form-item label="* 支行名称：" prop="address">
      <el-input placeholder="请输入支行名称" :maxlength="50" v-model="rmbBankForm.address"></el-input>
    </el-form-item>
    <el-form-item label="手机号：">
      <el-input disabled v-model="userInfo.mobile"></el-input>
    </el-form-item>

    <el-form-item class="sm-code-input" label="* 短信验证码：" prop="code">
      <el-input v-model="rmbBankForm.code" :maxlength="6" placeholder="请输入短信验证码">
        <count-time className="count-time" :round="true" slot="suffix" :waitTime="60" :startCount.sync="startCount" @click="useVerify"></count-time>
      </el-input>

      <Verify @success="bankSuccess" mode="pop" captchaType="blockPuzzle" ref="bankVerify" />
    </el-form-item>
  </el-form>
</template>

<script>
import getBankcardInfo from 'bankcardinfo';
import CountTime from 'components/common/CountTime/index.vue'
import Verify from 'commonComponent/Verify/index.vue'
import userRuleMixin from 'common/mixin/userRuleMixin.js'
export default {
  name: 'RmbBank.vue',
  mixins: [userRuleMixin],
  components: {
    CountTime,
    Verify
  },
  created () {
    this._getProvs()
    this.getBackEndBankList();
  },
  watch: {
    'rmbBankForm.cardNo': {
      handler (val) {
        if (this.timer !== null) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(this.getBankName, 3000)
      },
    },
  },
  data () {
    return {
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
    }
  },
  methods: {
    //- 查询银行名称
    getBankName () {
      getBankcardInfo.getBankBin(this.rmbBankForm.cardNo, (err, data) => {
        if (err) {
          this.rmbBankForm.bankName = ""
          return this.messageTip({ message: '请输入正确的银行卡号或暂不支持该银行' })
        }
        data.bankName && (this.rmbBankForm.bankName = data.bankName)
      })
    },
    //- 获取后端返回银行卡列表
    async getBackEndBankList () {
      const res = await this.$http.getBackEndBankList();
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
    width: 288px;
  }
  .el-input__suffix-inner {
    @include flex(center);
  }
}
</style>