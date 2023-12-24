<template>
  <div class="real-info-description">
    <div class="title">
      您的基本资料尚未全部完善，请完善你的基本信息，信息提交后将无法修改，请务必如实填写。
    </div>
    <el-form :model="form" class="bog real-form" label-position="top" label-width="115px" ref="form" :rules="registerFormRule">
      <el-form-item label="真实姓名：" prop="realName">
        <el-input class="user-name" placeholder="姓名需与银行卡持卡人姓名一致，否则无法提款" style="width: 362px" v-model="form.realName"></el-input>
      </el-form-item>
      <el-form-item>
        <span class="gender-label" slot="label">性 别：</span>
        <el-select class="gender-box" popper-class="bog gender-select" v-model="form.gender" placeholder="请选择性别">
          <i v-if="form.gender" :class="`${form.gender === '男'?'el-icon-male':'el-icon-female'} gender-icon`" slot="prefix"></i>
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="real-info-date" label="出生日期：">
        <div class="birthday">
          <el-date-picker :clearable="false" placeholder="选择日期" type="date" value-format="yyyy-MM-dd" v-model="form.birthday"></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="bog submit-userinfo-button" :disabled="btnDisabled" @click="_onSubmitForm" :loading="loading">提交信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import userRuleMixin from '../../../../../common/mixin/userRuleMixin.js'
export default {
  name: "RealInfo",
  mixins: [userRuleMixin],
  data () {
    return {
      loading: false,
      form: {
        realName: "",
        birthday: "",
        gender: "",
      },
      btnDisabled: true,
    }
  },
  watch: {
    form: {
      deep: true,
      async handler () {
        const bol = Object.values(this.form).some(item => !item);
        if (bol) return this.btnDisabled = true;
        this.btnDisabled = !await new Promise(resolve => this.$refs.form.validate(resolve));
      }
    },
  },
  methods: {
    ...mapMutations('user', ['set_user_info']),
    async _onSubmitForm () {
      this.loading = true;
      try {
        const [realNameRes, birthdayRes, genderRes] = await Promise.all([
          this.$http.modRealName({ realName: this.form.realName }),
          this.$http.setBirthday({ birthday: this.form.birthday }),
          this.$http.setGender({ gender: this.form.gender })
        ])

        this.loading = false;
        if (
          (realNameRes.data.code) || birthdayRes.data.code || genderRes.data.code) {
          this.messageTip({ message: realNameRes.data.msg || birthdayRes.data.msg || genderRes.data.msg })
          return
        }

        this.messageTip({ message: "添加成功" })
        this._getUserInfo()
      } catch (error) {
        console.log(error)
        this.loading = false;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../css/realInfo.scss";
</style>