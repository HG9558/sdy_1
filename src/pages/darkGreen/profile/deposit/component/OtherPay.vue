<template>
  <div class="cr-pay-container rm">
    <div v-if="!showLoading && !noData">
      <div class="pay-type-container">
        <div :class="{'py-type-list':true,on:index === payListIndex}" @click="changePayListIndex(index)" v-for="(item,index) in  renderList" :key="index" >
          <span v-show="item.children.length">
            <div class="circle-outer">
              <div class="circle-inner">
                <img :class="`list-img logo_${index+1}`" :src="require(`../../img/deposit/${item.imageUrl}.png`)" alt="">
              </div>
            </div>
            <span class="txt">{{item.label}}</span>
          </span>
        </div>
      </div>
      <div class="tip">{{ $t('选择充值通道') }}</div>
      <div class="select-pay-container rm-pay-container">
        <div :class="{'select-pay-item rm-pay-item':true, active:index === payChannelIndex}" @click="changePayChannelIndex(index)" v-for="(item,index) in renderList[payListIndex].children" :key="index">
          <img class="logo" :src="item.bankLog || item.bankLogo || require('../../img/deposit/bankcard3x.png')" alt="">
          <div class="pay-name">
            <span class="text">{{item.bankName || item.showName || item.name}}</span>
            <span class="number">
              {{item.amountType ?
              `${item.fixedAmount.split(',')[0]}-${item.fixedAmount.split(',').pop()}`
              :`${item.minAmout}-${item.maxAmout}` }} {{$tt('currencyValue')}}
            </span>
          </div>
          <p class="tag" v-if="item.isHot||item.isRecommend"><i>{{item.isHot?$t('热门'):item.isRecommend?$t('推荐'):''}}</i></p>
          <img v-if="payChannelIndex === index" src="../../img/deposit/new_checked.png" class="is-select" alt="">
        </div>
      </div>

      <div class="user-name-container bog el-form" v-if="curPayChannel.paymentType == 17 && curPayChannel.depositName">
        <span>{{$t('存款姓名：')}}</span>
        <el-input v-model="accountName" class="name-input" type="text" :placeholder="$t('请输入存款姓名')" />
        <div class="notice">
          <span class="el-icon-warning"></span>
          <span>{{$t('为及时到账，请务必输入正确的存款人姓名')}}</span>
        </div>
      </div>

      <div class="select-pay-form">
       <div class="tip">
          {{$t('存款金额')}}
          <span v-show="['new_bank','new_qq', 'new_wallet'].includes(renderList[payListIndex].imageUrl)">
            <!-- <span class="tip-text-o">（支持支付宝、微信转入银行卡）</span> -->
            <span class="tip-text-t"
              >{{$t('单笔存款金额：')}}
              {{
                renderList[payListIndex].children[payChannelIndex].amountType
                  ? `${
                      renderList[payListIndex].children[
                        payChannelIndex
                      ].fixedAmount.split(",")[0]
                    }-${renderList[payListIndex].children[
                      payChannelIndex
                    ].fixedAmount
                      .split(",")
                      .pop()} `
                  : `${renderList[payListIndex].children[payChannelIndex].minAmout}-${renderList[payListIndex].children[payChannelIndex].maxAmout}`
              }}{{$tt('currencyValue')}}
            </span>
          </span>
        </div>

        <div class="select-box rm-box">
          <div class="select-card-container">
            <div :class="{'select-item rm-select-item':true,on:recommendMoneyIndex === index}" v-for="(item,index) in recommendList" :key="index" @click="changeRecommendMoneyIndex(index,item)">{{item.label}}{{$tt('currencyValue')}}</div>
          </div>

          <div v-if="curPayChannel.amountType !==1" class="notice">{{$t('注意：转账时请以转账页面的实际金额进行转账')}}</div>

          <div class="select-form-container">

            <el-form class="bog rm-form" :model="feeForm" :rules="feeFormRules" ref="feeForm">
              <el-form-item prop="fee">
                <!-- onkeyup="this.value = this.value.replace(/[^A-z0-9]/, '')" -->
                <el-input type="number" v-show=" curPayChannel.amountType !== 1" :clearable="true" :placeholder="feePlaceholder" v-model.number="feeForm.fee" ></el-input>
              </el-form-item>
              <!-- <el-form-item v-if="curPayChannel.paymentType == 13">
                <el-input type="number" :clearable="true" placeholder="请输入支付卡号" style="width: 250px; margin-top: 0px" v-model="feeForm.depositUserAcc"></el-input>
              </el-form-item> -->
            </el-form>

            <el-button :class="{'handle-btn':true,'bog':true , 'rm-handle-btn':curPayChannel.amountType ===1}" @click="_rmPayDeposit" :loading="buttonLoading">{{$t('立即存款')}}</el-button>
            <div class="handle-btn bog" @click="$router.push('/help_center')">{{$t('存款教程')}}</div>
          </div>

          <div class="tip-text">
            {{ $t('请按照提交后页面实际显示金额充值，否则无法自动到账！') }}
          </div>
        </div>
      </div>

    </div>

    <Loading :showLoading="showLoading" />
    <div v-if="noData" class="box-no-deposit-rode">
      <div class="rode-image">
        <img src="../../img/deposit/nodepositrode.png" alt="" />
      </div>
      <div class="rode-text">{{$t('充值通道维护中')}}</div>
    </div>

    <global-dialog class="deposit-dialog" :showDialog.sync="showDialog" :title="dialogTitle" :hasSelfFooter="hasSelfFooter" :cancelText="cancelText" :confirmText="confirmText" :btnCancelType="btnCancelType" :btnConfirmType="btnConfirmType" @confirmHandle="confirmHandle" width="400px">
      <LargePaymentDialog :bankDialogData="bankDialogData" :curRmbChannel="renderList[payListIndex]" />
    </global-dialog>

    <!-- 扫码支付弹窗 -->

    <global-dialog class="deposit-dialog qr-dialog" :showDialog.sync="isShowQrDialog" :title="$t('扫码支付')" :hasSelfFooter="hasSelfFooter" :cancelText="cancelText" :confirmText="confirmText" :btnCancelType="btnCancelType" :btnConfirmType="btnConfirmType" @confirmHandle="confirmHandle" width="400px">
      <QrDialogContent :qrInfo="qrInfo" />
    </global-dialog>

  </div>
</template>

<script>
import { noticeTextData, getRecommendList } from 'static_data/deposit_data';
import { mapState } from "vuex"
import LargePaymentDialog from './LargePaymentDialog.vue'
import QrDialogContent from './QrDialogContent.vue';

export default {
  name: 'Other',
  props: ['rmPayActivityRules'],
  components: {
    LargePaymentDialog,
    QrDialogContent
  },
  created () {
    this._initOtherPay();
  },
  watch: {
    'feeForm.fee': {
      deep: true,
      handler (val) {
        this.recommendMoneyIndex = this.recommendList.findIndex(item => item.value === val)
      }
    },
  },
  data () {
    return {
      showLoading: true,
      noData: false,
      buttonLoading: false,
      payListIndex: 0,  //- 银行分类
      payChannelIndex: 0, //- 通道分类
      recommendMoneyIndex: -1, //- 存款金额
      feePlaceholder: '0-0',
      money: null,
      renderList: [
        // { label: "EBPAY", children: [], imageUrl: 'new_ebpay' },
        // { label: "TOPAY", children: [], imageUrl: 'new_topay' },
        { label: this.$t("钱包转账"), children: [], imageUrl: 'new_wallet' },
      ],
      bankList: [],
      noticeTextData,
      feeForm: {
        fee: null, //充值数值
      },
      accountName: '',
      feeFormRules: {
        fee: [
          { validator: this.validateFee, trigger: ["blur", "change"], },
        ],
      },
      depositLimit: {}, //- 金额限制
      showDialog: false,
      dialogTitle: this.$t('温馨提示'),
      componentName: "",
      confirmText: "",
      cancelText: "",
      hasSelfFooter: false,
      btnCancelType: "success",
      btnConfirmType: "danger",
      bankDialogData: {},//- 大额支付专用
      isShowQrDialog: false,
      qrInfo: {},
    }
  },
  methods: {
    //- 充值类型切换
    changePayListIndex (index) {
      this.payListIndex = index;
      this.recommendMoneyIndex = -1;
      this.payChannelIndex = 0;
      this.$refs["feeForm"].resetFields();
      this.curPayChannel.amountType !== 1 && (this.feePlaceholder = this.curPayChannel.minAmout + '-' + this.curPayChannel.maxAmout)
    },
    //- 充值通道切换
    changePayChannelIndex (index) {
      this.payChannelIndex = index;
      this.recommendMoneyIndex = -1;
      this.$refs["feeForm"].resetFields();
      this.curPayChannel.amountType !== 1 && (this.feePlaceholder = this.curPayChannel.minAmout + '-' + this.curPayChannel.maxAmout)
    },
    //- 充值金额切换
    changeRecommendMoneyIndex (index, item) {
      this.recommendMoneyIndex = index;
      this.feeForm.fee = item.value;
    },
    async _initOtherPay () {
      const resList = await Promise.allSettled([this.$http.getPzpayPictureUrl(), ])
      resList[0].status === 'fulfilled' && this.getPzpayPictureUrl(resList[0].value);
      this.showLoading = false;
      this.noData = !this.renderList.length;
    },
    //- 第一个通道获取内容
    getPzpayPictureUrl (response) {
      const { code, res } = response.data;
      if (code) return this.messageTip({ message: res.data.msg });
      const { ebpayList, topayList, otherWalletPayList } = res
      // - EBpay
      // ebpayList && res.ebpayList.length && this.renderList[0].children.push(...res.ebpayList);
      // - Topay
      // topayList && res.topayList.length && this.renderList[1].children.push(...res.topayList);
      // - Wallet
      // otherWalletPayList && res.otherWalletPayList.length && this.renderList[2].children.push(...res.otherWalletPayList);
      otherWalletPayList && res.otherWalletPayList.length && this.renderList[0].children.push(...res.otherWalletPayList);

      // !ebpayList && this.renderList.splice(0, 1)
      // let topayIndex = -1
      // if (!topayList) {
      //   topayIndex = this.renderList.findIndex(item => item.label === 'TOPAY')
      //   this.renderList.splice(topayIndex, 1)
      // }
      if ( !this.renderList.length ) return
      this.getFastChannel()
    },
    //- 快充通道
    async getFastChannel () {
      const { minAmout, maxAmout } = this.renderList[0].children[0];
      this.feePlaceholder = `${minAmout}-${maxAmout}`;
    },
    //- 检测存款金额
    async _rmPayDeposit () {
      if (!this.feeForm.fee) return this.messageTip({ message: this.$t('存款金额不能为空') });
      //金额格式不正确，无法存款
      const reg = /^[0-9]*[1-9][0-9]*$/
      if (!reg.test(this.feeForm.fee)) return this.messageTip({ message: this.$t('存款金额格式不正确') });
      this.buttonLoading = false;
      //- 需要输入用户名
      if (this.curPayChannel.paymentType === 17 && this.curPayChannel.depositName && !this.accountName) return this.messageTip({ message: this.$t('存款人姓名不能为空') });

      this.buttonLoading = true;
      const res = await this.$http.getDepositLockStatus();
      if (res.data.code === 0) {
        const depositLimit = res.data.data;
        if (depositLimit.depositLock === 1) {
          //- 提示限制弹窗
          this.openConfirmDialog({ content: this.$t('您已被限制存款，请联系客服！'), cancelButtonText: this.$t('知道了'), confirmButtonText: this.$t('联系客服'), callback: () => { window.open(this.serUrl) } })
          this.buttonLoading = false;
          return;
        }
        if (depositLimit.depositLock === 0 && depositLimit.isSuccessDeposit && this.depositLimit.isReminder) {
          //- 调用客服弹窗
          this.openConfirmDialog({ content: this.$t('存款遇到问题？可以联系客服为您服务！'), cancelButtonText: this.$t('继续存款'), confirmButtonText: this.$t('继续存款'), callback: () => { window.open(this.serUrl) }, cancelFn: () => { this._onlinePayDeposit() } })
          this.buttonLoading = false;
          return;
        }

        this._onlinePayDeposit();
      }

    },
    confirmHandle () {
      window.open(this.serUrl);
    },
    validateFee (rule, value, callback) {
      const reg = /^[0-9]*[1-9][0-9]*$/
      if (this.curPayChannel) {
        if (!value) {
          callback(new Error(this.curPayChannel.amountType === 1 ? this.$t('请选择存款金额') : this.$t('请输入存款金额')))
        }
        if (!reg.test(value)) {
          callback(new Error(this.$t('存款金额格式不正确')));
        }
        if (this.curPayChannel.minAmout || 0 <= value <= this.curPayChannel.manAmout || Number.POSITIVE_INFINITY) {
          callback();
        } else {
					callback(new Error(this.$t('存款金额不符合单笔存款限额')));
				}
      }
    },
    openDialog ({ componentName, dialogTitle, confirmText, hasSelfFooter, cancelText, btnConfirmType, btnCancelType }) {
      this.dialogTitle = dialogTitle;
      this.confirmText = confirmText;
      this.cancelText = cancelText;
      this.componentName = componentName
      this.showDialog = true;
      this.hasSelfFooter = hasSelfFooter;
      this.btnConfirmType = btnConfirmType;
      this.btnCancelType = btnCancelType;
    },
    //- 立即存款
    async _onlinePayDeposit () {
      if (!this.curPayChannel) {
        this.messageTip({ message: this.$t('请先选择充值通道') });
        this.buttonLoading = false;
        return;
      }
      if (this.curPayChannel.payType === 'qr') {
        //- 扫码支付
        const res = await this.$http.applyQrPay({ fee: this.feeForm.fee, depositId: this.curPayChannel.id })
        if (res.data.code === 0) {
          this.cancelText = this.$t('已完成充值');
          this.confirmText = this.$t('需要帮助');
          this.isShowQrDialog = true;
          this.qrInfo = res.data.info;

        }
        this.buttonLoading = false;
        if (res.data.code) {
              return this.messageTip({
                message: res.data.msg,
                onClose: () => {
                  // this.$router.push({ path: "/profile" });
                }
              });
            }
      } else {
        if (this.curPayChannel.alipayFlg === 1) {
          try {
            const res = await this.$http.getPayUrlBank({
              terminal: 0,
              userName: this.curPayChannel.paymentType === 17 && this.curPayChannel.depositName ? this.accountName : this.userInfo.realName,
              // userName: this.userInfo.realName,
              fee: this.feeForm.fee,
              depositId: this.curPayChannel.id,
            })
            this.$refs["feeForm"].resetFields();
            this.buttonLoading = false;

            if (res.data.code) {
              return this.messageTip({
                message: res.data.msg,
                onClose: () => {
                  // this.$router.push({ path: "/profile" });
                }
              });
            }

            this.bankDialogData = res.data.info;
            //- 大额支付专用
            this.openDialog({
              componentName: "LargePaymentDialog",
              dialogTitle: `${this.bankDialogData.bankName}${this.$t('大额支付专用')}`,
              cancelText: this.$t('已完成充值'),
              confirmText: this.$t('充值问题需要协助'),
              btnCancelType: 'success',
              btnConfirmType: 'danger'
            })
          } catch (error) {
            console.log(error)
            this.buttonLoading = false;
            this.$refs["feeForm"].resetFields();
          }
        } else {
          try {
            const res = await this.$http.getPayUrl({
              terminal: 0,
              userName: this.userInfo.realName,
              fee: this.feeForm.fee,
              onlinePayId: this.curPayChannel.onlinePayId,
            })

            this.buttonLoading = false;
            this.$refs["feeForm"].resetFields();
            if (res.data.code) {
              return this.messageTip({
                message: res.data.msg, onClose: () => {
                  // this.$router.push({ path: "/profile" });
                }
              });
            }
            const tempwindow = window.open("_blank");
            tempwindow.document.write(res.data.res.url);
            //- 充值提醒
            this.openConfirmDialog({
              content: [this.$t('请在新页面完成充值支付'), this.$t('充值支付完成前，请勿关闭此窗口。')],
              cancelButtonText: this.$t('已完成充值'),
              confirmButtonText: this.$t('充值问题需要协助'),
              callback: () => { window.open(this.serUrl) },
              cancelFn: () => this._getCenterMoney()
            })
          } catch (error) {
            console.log(error)
            this.buttonLoading = false;
            this.$refs["feeForm"].resetFields();
          }
          
        }
      }

      this.feeForm.fee = null
    },
  },
  computed: {
    ...mapState({
      serUrl: state => state.user.serUrl,
    }),
    recommendList () {
      if (this.curPayChannel.amountType === 1) {
        return [...new Set(this.curPayChannel.fixedAmount.split(","))].sort((a, b) => a - b).map((item) => ({ label: +item, value: +item }));
      }
      const data = this.feePlaceholder.split("-");
      let Min = Math.floor(Number(data[0]))
      let Max = Math.floor(Number(data[1]));
      if (Min === Max) {
        return [
          {
            label: Min,
            value: Max,
          },
        ];
      }
      return getRecommendList(Min, Max, 5, 'isEbpay')
    },
    curPayChannel () {
      return this.renderList[this.payListIndex].children[this.payChannelIndex];
    },
    allActiveText () {
      const { allActiveText } = this.rmPayActivityRules
      return allActiveText
    },
    paymentTextArr () {
      const { textArr } = this.rmPayActivityRules
      return textArr
    },
  },
  deactivated () {
    this.feeForm.fee = null;
    this.currentMoneyIndex = -1;
    this.selectIndex = 0;
    this.feePlaceholder = this.crChannelList[this.selectIndex]?.limitLabel;
    this.noData = false;
    this.showLoading = false;
    this.bankList = [];
    this.payListIndex = 0;  //- 银行分类
    this.payChannelIndex = 0; //- 通道分类
    this.recommendMoneyIndex = -1 //- 存款金额
    this.feePlaceholder = `${this.curPayChannel.minAmout}-${this.curPayChannel.maxAmout}`;
  }
}
</script>

<style lang="scss" scoped>
@import "../css/RmPay.scss";
@import "../css/CrPay.scss";
// @import "../css/Other.scss";
</style>
