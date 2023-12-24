<template>
	<div>
		<div class="warning-text  mobile-tip">
			{{ $t('为了您的隐私安全，信息在提交后将无法修改。') }}
			{{ $t('请务必如实填写，以保护您的账号安全。') }}
		</div>
		<div class="profile-dialog">
			<el-form :model="emailForm" :rules="emailFormRule" class="email-form bog" ref="emailForm" size="small">
				<el-form-item prop="email">
					<el-input :placeholder="$t('请输入您的电子邮箱')" v-model="emailForm.email">
						<span slot="prefix">{{ $t('电子邮箱：') }}</span>
					</el-input>
				</el-form-item>
				<el-form-item prop="code">
					<el-input class="smcode-input" v-model="emailForm.code" :maxlength="6" clearable
						:placeholder="$t('请输入邮箱验证码')" type="number">
						<span slot="prefix">{{ $t('验证码：') }}</span>
						<count-time class="profile-smcode" slot="suffix" :waitTime="60" :startCount.sync="startCount"
							@click="useVerify" :isPhoneCode="isDisabeld"></count-time>
					</el-input>
					<Verify @success="mbSuccess" mode="pop" captchaType="blockPuzzle" ref="mbVerify" />
				</el-form-item>
			</el-form>
			<el-button class="self-footer" type="primary" @click="_bingEmail" :loading="loading">{{ $t('确定') }}</el-button>
		</div>
	</div>
</template>

<script>
import CountTime from 'components/common/CountTime';
import Verify from 'commonComponent/Verify';
import userRuleMixin from 'common/mixin/userRuleMixin'

export default {
	name: "EmailSetting",
	mixins: [userRuleMixin],
	components: {
		CountTime,
		Verify,
	},
	data() {
		return {
			loading: false,
			startCount: false, //- 开始倒计时
			isDisabeld: true,
			emailForm: {
				email: "",
				code: "",
				captchaVerification: "",
			},
		}
	},
	methods: {
		useVerify () {
			this.$refs.mbVerify.show()
		},
		mbSuccess (params) {
			this.$set(this.emailForm, 'captchaVerification', params.captchaVerification)
			this.sendMailCode()
		},
		async sendMailCode() {
			const res = await this.$http.sendMailCode({
				module: 7,
				email: this.emailForm.email,
				captchaVerification: this.emailForm.captchaVerification,
			})
			if (res.data.code === 0) {
				this.startCount = true
				this.messageTip({ message: this.$t('发送成功'), type: 'success' })
			} else {
				this.messageTip({ message: res.data.msg, duration: 1000 })
			}
		},
		async _bingEmail () {
			this.$refs['emailForm'].validate(async (valid) => {
				if (!valid) return;
				this.loading = true

				try {
					const vfyRes = await this.$http.vfyMailCode({
						module: 7,
						code: this.emailForm.code,
						email: this.emailForm.email,
					})

					this.loading = false

					if (vfyRes.data.code === 0 && vfyRes.data.msg === 'success') {
						const res = await this.$http.setAccMail({
							email: this.emailForm.email,
						})
						this.loading = false
						if (res.data.code) {
							this.messageTip({
								message: res.data.msg,
							})
							return
						}

						this.messageTip({ message: this.$t('您的信息修改成功'), type: 'success' })
						this._getUserInfo()
						this.$emit('update:showDialog', false)
					} else {
						this.messageTip({
							message: vfyRes.data.msg,
						})
					}
				} catch (e) {
					this.loading = false
				}

			})
		}
	},
	watch: {
		emailForm: {
			deep: true,
			handler() {
				this.$refs.emailForm.validateField('email', (err) => {
					this.isDisabeld = Boolean(err);
				})
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import "../css/EmailSetting.scss";
.mobile-tip {
	color: #ffffff;
	font-size: 14px;
	margin-bottom: 20px;
}

.email-form.el-form {
	/deep/ .el-input__inner {
		padding-left: 110px;
	}
}
</style>
