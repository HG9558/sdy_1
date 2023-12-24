<template>
  <div class="profile-dialog">
    <el-form :model="nickNameForm" class="bog nick-name" ref="nickNameForm" size="small" :rules="nicknameRules">
      <el-form-item prop="nickName">
        <el-input :placeholder="$t('新昵称：请输入4-10位中文、英文、数字')" v-model.trim="nickNameForm.nickName">
          <span slot="prefix">{{$t('新昵称：')}}</span>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button class="self-footer" type="primary" @click="_updateNickName" :loading="loading">{{$t('修改')}}</el-button>
  </div>
</template>

<script>
export default {
  name: "NickNameSetting",
  data () {
    return {
      loading: false,
      nickNameForm: {
        nickName: '',
      },
      nicknameRules: {
        nickName: [
          { min: 4, max: 10, message: this.$t('昵称格式不正确'), trigger: "blur" },
          { validator: this.validateNickname, trigger: "change" },
        ]
      }
    }
  },
  methods: {
    async _updateNickName () {
      this.$refs['nickNameForm'].validate(async (valid) => {
        if (!valid) return
        this.loading = true
        await this.$http.updateNickName({ nick: this.nickNameForm.nickName })
        this.loading = false
        this._getNickNameInfo();
        this.$emit('update:showDialog', false);
        this.$refs['nickNameForm'].resetFields();
      })
    },
    //- 昵称校验
    validateNickname: (rule, value, callback) => {
      const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]{4,10}$/
      if (!value) {
        callback(new Error(this.$t('请输入昵称')));
      } else if (!reg.test(value)) {
				callback(new Error(this.$t('请输入正确的昵称格式')));
			} else {
        callback();
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.nick-name.el-form {
  /deep/ .el-input__inner {
    padding-left: 60px;
  }
}
.multi-language {
	.nick-name.el-form {
		/deep/ .el-input__inner {
			padding-left: 120px;
		}
	}
}
.language-ms {
	.nick-name.el-form {
		/deep/ .el-input__inner {
			padding-left: 120px;
		}
	}
}


</style>
