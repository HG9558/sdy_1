<template>
  <div class="dialog-wrapper">
    <div class="dialog-content" v-for="(item, index) in renderList" :key="index">
      <div>
        <span class="title" v-html="Array.isArray(item.label) ? item.label[0] : item.label"></span>
        <el-input v-if="item.type === 'desp'" style="width: 100px" v-model="depositPostScript"></el-input>
        <span class="text" v-else> {{ item.value }}</span>
        <span v-if="Array.isArray(item.label)" class="required-text">{{ item.label[1] }}</span>
      </div>
      <div
        class="copy"
        v-clipboard:copy="String(item.value)"
        v-clipboard:error="onCopyError"
        v-clipboard:success="onCopySuccess"
      >
        <img class="copy-img" src="../../img/deposit/copy.png" alt="" />
        <span class="copy-text">{{ $t('点击复制') }} </span>
      </div>
    </div>
    <div v-if="certType > 0" class="upload-box">
      <div>*{{ isPaymaya ? 'Please upload the Receipt after you has been successfully transfer to our Account.' : $t('上传凭证：为了您的存款能快速到账，请先上传存款凭证') }}</div>
      <el-upload class="avatar-uploader" action="#" :show-file-list="false" :before-upload="beforeAvatarUpload">
        <!-- :http-request="onHandleUpload" -->
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <span v-if="imageUrl" class="el-icon-close upload-close" @click.stop="removeFile"></span>
        <i v-else slot="trigger" class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div>*{{ $t('文件格式为PNG，JPG，JPEG，且大小不超过3MB（目前仅支持上传一张）') }}</div>
    </div>

    <div v-if="curRmbChannel && curRmbChannel.label === '支付宝'">
      <div>{{ $t('操作步骤:') }}</div>
      <div class="setup">
        <div>{{ $t('1.登录您自己设备上的支付宝账号;') }}</div>
        <div>{{ $t('2.在支付宝首页点击【转账】按钮，然后选择【转到银行卡】;') }}</div>
        <div>
          {{ $t('3.复制下方姓名、卡号、金额，到支付宝对应填写，并点击【下一步】') }}
        </div>
        <div>
          {{ $t('4.复制下方附言，填写至支付宝“备注”一栏，并确认转账完成付款；') }}
        </div>
        <div>
          {{ $t('5.入款成功后，联系客服查询进度。') }}
        </div>
        <div>
          {{ $t('6.请严格按照页面显示的金额转账,请勿修改金额会导致慢到账') }}
        </div>
        <div class="attention">
          {{ $t('注：切勿保存该卡号，如发现没有提交订单直接转款的，平台有理由不给上分。') }}
        </div>
      </div>
    </div>
    <div v-else-if="isPaymaya">
      <div>Deposit Steps:</div>
      <div class="setup">
        <div>1. Login to the PAYMAYA APP on your own device;</div>
        <div>2. Choose "Send Money" on your PAYMAYA APP </div>
        <div>3.Enter receiving 55x PAYMAYA number</div>
        <div>4. Enter the amount in PAYMAYA APP same as your submited in deposit form</div>
        <div>5. Click "continue" , make sure one more time our receiving account is filled correctly</div>
        <div>6. Click "Sent Money" , and view reciept</div>
        <div>7. Upload your Receipt your deposit will be credited instantly to your main wallet.</div>
        <div class="attention">Note : </div>
        <div class="attention">1. Do not save OUR PAYMAYA NUMBER</div>
        <div class="attention">2. PAYMAYA account your deposited must be same as the registered number at 55x.com</div>
      </div>
    </div>
    <div v-else>
      <div>{{ $t('操作步骤:') }}</div>
      <div class="setup">
				<div v-if="isBw1Aud">{{ isPAYID ? $t('1.登录您自己设备上的PAYID') : $t('1.登录您自己设备上的银行APP或银行官网') }} </div>
				<div v-else>{{ $t('1.登录您自己设备上的银行APP或银行官网;') }}</div>
        <div>{{ $t('2.进入转账页，将该信息复制到收款方;') }}</div>
        <div>
          {{ $t('3.入款成功') }}<span class="service">{{ $t('联系客服') }}</span
          >{{ $t('查询进度。') }}
        </div>
        <div>{{ $t('4.请严格按照页面显示的金额转账,请勿修改金额会导致慢到账') }}</div>
				<div v-if="isBw1Aud">{{ $t('5.由于澳洲银行首次转账会有Pending问题，所有转账都以到账时间为准。') }}</div>
        <div v-if="isPhp">{{ $t('5.由于菲律宾银行首次转账会有Pending问题，所有转账都以到账时间为准。') }}</div>
				<div class="attention">
          {{ $t('注：切勿保存该卡号，如发现没有提交订单直接转款的，平台有理由不给上分。') }}
        </div>
        <div class="attention">{{ $t('付款账户姓名与注册姓名需保持一致，否则会导致无法自动到账。') }}</div>
      </div>
    </div>
    <div class="btns">
      <button class="bog deposit-btn self-left-btn" plain @click="depositDone">{{ $t('已完成充值') }}</button>
      <button class="bog deposit-btn self-right-btn" @click="gotoUrl" type="danger">
        {{ $t('充值问题需要协助') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

const { VUE_APP_APP_SIGN, VUE_APP_APP_BANK_ARE_CODE } = process.env

export default {
  name: 'LargePaymentDialog',
  props: {
    bankDialogData: Object,
    curRmbChannel: Object,
    curPayChannel: Object,
  },
  data() {
    return {
      isPhp: VUE_APP_APP_SIGN === 'php',
			isBw1Aud: VUE_APP_APP_SIGN === 'bw1' && VUE_APP_APP_BANK_ARE_CODE === 'AUD',
			imageUrl: '',
      depositPostScript: '',
      uploadFileList: [],
    }
  },
  computed: {
    ...mapState({
      serUrl: state => state.user.serUrl,
    }),
    ...mapGetters('global', ['isZhLanguage']),
    isMgm() {
      const { VUE_APP_APP_SIGN } = process.env
      return VUE_APP_APP_SIGN === 'mgm'
    },
    renderList() {
			const temp = JSON.parse(JSON.stringify(this.bankDialogData))
			let data = []

			if (this.isBw1Aud) {
				data = [{ bankAccount: this.$t('银行卡号：') }, { depositAmount: this.$t('充值金额：') }, { depositPostscript: [this.$t('附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：'), this.$t('(必须正确填写)')] }]
				if (this.isPAYID) {
					data = [ { realName: this.$t('收款姓名：') }, ...data, ];
				} else {
					data = [ { realName: this.$t('收款姓名：') }, { bankBranch: this.$t('BSB码：') }, ...data, ];
				}
			} else {
				data = [
          { realName: this.$t('收款姓名：') }, 
          { bankAccount: this.$t('账户号码：') },
          { bankBranch: this.$t('开户网点：') },
          { depositAmount: this.$t('充值金额') + '：' },
          { depositPostscript: [this.$t('附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：'),this.$t('(必须正确填写)')] }
        ];
				if (this.isMgm) {
					data = [{ realName: this.$t('收款姓名：') }, { bankName: this.$t('银行名称：') }, { bankAccount: this.$t('银行账号：') }, { depositAmount: this.$t('充值金额：') }, { depositPostscript: [this.$t('附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：'), this.$t('(必须正确填写)')] }];
				}
				if (this.isPhp) {
					data = [{ realName: this.$t('收款姓名：') }, { bankName: this.isPaymaya ? 'Paymaya Method:' : this.$t('银行名称：') }, { bankAccount: this.isPaymaya ? 'Paymaya Number:' : this.$t('银行账号：') }, { depositAmount: this.isPaymaya ? 'Recharge amount:' : this.$t('充值金额：') }, { depositPostscript: [this.$t('附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：'),this.$t('(必须正确填写)')], type: 'desp' }];
          if (this.isPaymaya) {
            data.splice(1, 1)
          }
				}
			}

      return data.map(item => {
        return {
          ...item,
          label: Object.entries(item)[0][1],
          value: temp[Object.entries(item)[0][0]]
        }
      })
    },
		isPAYID() {
			return this.curPayChannel.bankCode === 'PAYIDBANK'
		},
    certType() {
      return this.curPayChannel.certType || 0
    },
    isPaymaya() {
      return /paymaya/ig.test(this.bankDialogData.bankName)
    }
  },

  methods: {
    async updateDepositPostScript() {
      const { orderId } = this.bankDialogData
      this.$http.updateDepositPostScript({ orderId, depositPostScript: this.depositPostScript }).then(() => {
        this.depositPostScript = ''
      })
    },
    async depositDone() {
      const { orderId } = this.bankDialogData;
      if (this.isPhp) {
        // if (!this.depositPostScript) return this.$message.error(this.$t('附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：') + ' ' + this.$t('(必须正确填写)'))
        this.updateDepositPostScript()
      }
      if (this.imageUrl) {
        const { data } = await this.$http.depositCertUploadConfirm({ orderId, pictureList: [this.imageUrl] });
        if (data.code === 0) {
          this.$emit('close');
          this.imageUrl = '';
          return
        }
      }
      this.$emit('close');
    },
    removeFile() {
      this.imageUrl = '';
    },
    async beforeAvatarUpload(file) {
      const formData = new FormData();
      formData.append('uploadFile', file);
      const { data } = await this.$http.uploadImage(formData);
      if (data) {
        this.imageUrl = data.path;
      }
    },
    gotoUrl() {
      window.open(this.serUrl);
    },
    onCopySuccess() {
      this.messageTip({ message: this.$t('复制成功'), type: "success" });
    },
    onCopyError() {
      this.messageTip({ message: this.$t('复制失败！') });
    }
  }
}
</script>

<style lang="scss">
@import '../css/dialog.scss';
</style>
<style lang="scss" scoped>
.upload-box {
  width: 100%;
  font-size: 16px;
  .upload-close {
    position: absolute;
    right: 5px;
    top: 5px;
    color: #d9d9d9;
  }
}
::v-deep {
  .avatar-uploader {
    margin-top: 5px;
  }
  .avatar-uploader .el-upload {
    width: 100%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 30px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: auto;
    height: 120px;
    display: block;
    margin: 0 auto;
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  .deposit-btn {
    width: auto;
    height: 48px;
    line-height: 1;
    padding: 0 20px;
    border-radius: 34px;
  }
  .self-left-btn {
    color: #815b39;
    background-color: #fff;
    border: 1px solid #815b39;
  }
  .self-right-btn {
    background: linear-gradient(180deg, #e7d9cc 0%, #c0aa95 100%);
    border: none;
    color: #fff;
  }
}
</style>
