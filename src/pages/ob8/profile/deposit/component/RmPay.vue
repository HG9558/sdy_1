<template>
  <div class="cr-pay-container rm">
    <div v-if="!showLoading && !noData">
      <div class="pay-type-container">
        <div :class="{'py-type-list':true,on:index === payListIndex}" @click="changePayListIndex(index)" v-for="(item,index) in  renderList" :key="index">
          <div class="circle-outer">
            <!-- <div class="circle-inner-top" v-show="index !== 4 && index === payListIndex && (allActiveText  || paymentTextArr[index])">
            {{ allActiveText || paymentTextArr[index] }}
            </div> -->
            <div class="circle-inner">
              <img :class="`list-img logo_${index+1} ${item.imageUrl}`" :src="require(`../../img/deposit/${item.imageUrl}.png`)" alt="">
            </div>
          </div>
          <span class="txt">{{item.label}}</span>
        </div>
      </div>
      <div class="tip">选择充值通道</div>
      <div class="select-pay-container rm-pay-container">
        <div :class="{'select-pay-item rm-pay-item':true,on:index === payChannelIndex}" @click="changePayChannelIndex(index)" v-for="(item,index) in renderList[payListIndex].children" :key="index">
          <img class="logo" :src="item.bankLog || item.bankLogo || require('../../img/deposit/bankcard3x.png')" alt="">
          <div class="pay-name">
            <span class="text">{{item.bankName || item.showName || item.name}}</span>
            <span class="number">
              {{item.amountType ?
              `${item.fixedAmount.split(',')[0]}-${item.fixedAmount.split(',').pop()}`
              :`${item.minAmout}-${item.maxAmout}` }} 元
            </span>
          </div>
          <p class="tag" v-if="item.isHot||item.isRecommend"><i>{{item.isHot?'热门':item.isRecommend?'推荐':''}}</i></p>
          <img v-if="payChannelIndex === index" src="../../img/deposit/new_checked.png" class="is-select" alt="">
        </div>
      </div>

      <div class="user-name-container bog el-form" v-if="curPayChannel.paymentType == 13&&curPayChannel.depositName">
        <span>存款姓名：</span>
        <el-input v-model="accountName" class="name-input" type="text" placeholder="请输入存款姓名" />
        <div class="notice">
          <span class="el-icon-warning"></span>
          <span>为及时到账，请务必输入正确的存款人姓名</span>
        </div>
      </div>

      <div class="select-pay-form">
          <div class="tip">
          存款金额
          <span v-show="['new_bank','new_qq'].includes(renderList[payListIndex].imageUrl)">
            <span class="tip-text-o">（支持支付宝、微信转入银行卡）</span>
            <span class="tip-text-t"
              >单笔存款金额：
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
              }}元
            </span>
          </span>
        </div>
        <div class="select-box rm-box">
          <div class="select-card-container">
            <div :class="{'select-item rm-select-item':true,on:recommendMoneyIndex === index}" v-for="(item,index) in recommendList" :key="index" @click="changeRecommendMoneyIndex(index,item)">{{item.label}}元</div>
          </div>

          <div v-if="curPayChannel.amountType !==1" class="notice">注意：转账时请以转账页面的实际金额进行转账</div>

          <div class="select-form-container">

            <el-form class="bog rm-form" :model="feeForm" :rules="feeFormRules" ref="feeForm">
              <el-form-item prop="fee">
                <el-input type="number" v-show=" curPayChannel.amountType !== 1" :clearable="true" :placeholder="feePlaceholder" v-model.number="feeForm.fee"></el-input>
              </el-form-item>
              <!-- <el-form-item v-if="curPayChannel.paymentType == 13">
                <el-input type="number" :clearable="true" placeholder="请输入支付卡号" style="width: 250px; margin-top: 0px" v-model="feeForm.depositUserAcc"></el-input>
              </el-form-item> -->
            </el-form>

            <el-button :class="{'handle-btn':true,'bog':true , 'rm-handle-btn':curPayChannel.amountType ===1}" @click="_rmPayDeposit" :loading="buttonLoading">立即存款</el-button>
            <div class="handle-btn bog" @click="$router.push('/help_center')">存款教程</div>
          </div>

          <div class="tip-text">
            {{renderList[payListIndex].label ==="本地银行"?noticeTextData[renderList[payListIndex].label] : noticeTextData[renderList[payListIndex].label]+'请按照提交后页面实际显示金额充值，否则无法自动到账！'}}
          </div>
        </div>
      </div>

    </div>

    <Loading :showLoading="showLoading" />
    <div v-if="noData" class="box-no-deposit-rode">
      <div class="rode-image">
        <img src="../../img/deposit/nodepositrode.png" alt="" />
      </div>
      <div class="rode-text">充值通道维护中</div>
    </div>

    <global-dialog class="deposit-dialog" :showDialog.sync="showDialog" :title="dialogTitle" :hasSelfFooter="hasSelfFooter" :cancelText="cancelText" :confirmText="confirmText" @confirmHandle="confirmHandle" width="600px">
      <LargePaymentDialog :bankDialogData="bankDialogData" :curRmbChannel="renderList[payListIndex]" />
    </global-dialog>

    <!-- 扫码支付弹窗 -->
    <global-dialog class="deposit-dialog qr-dialog" :showDialog.sync="isShowQrDialog" title="扫码支付" :hasSelfFooter="hasSelfFooter" :cancelText="cancelText" :confirmText="confirmText" @confirmHandle="confirmHandle" width="400px">
      <QrDialogContent :qrInfo="qrInfo" />
    </global-dialog>
  </div>
</template>

<script>
import { noticeTextData, getRecommendList } from 'static_data/deposit_data';
import { mapState } from "vuex"
import LargePaymentDialog from './LargePaymentDialog.vue'
import QrDialogContent from './QrDialogContent.vue';
import Loading from "commonComponent/Loading"

export default {
  name: 'RmPay',
  props: ['rmPayActivityRules'],
  components: {
    LargePaymentDialog,
    QrDialogContent,
    Loading

  },
  created () {
    this._initRmb();
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
        { label: "本地银行", children: [], imageUrl: 'new_bank' },
        { label: "支付宝", children: [], imageUrl: 'new_alipay' },
        { label: "微信", children: [], imageUrl: 'new_wechat' },
        { label: "网银支付", children: [], imageUrl: 'new_unionpay' },
        { label: "扫码支付", children: [], imageUrl: 'new_qrcode' },
        { label: "QQ支付", children: [], imageUrl: 'new_qq' },
      ],
      bankList: [],
      noticeTextData,
      feeForm: {
        fee: null, //充值数值
      },
      accountName: '',
      feeFormRules: {
        fee: [
          { type: "number", message: "金额必须为数字值" },
          { validator: this.validateFee },
        ],
      },
      depositLimit: {}, //- 金额限制
      showDialog: false,
      dialogTitle: "温馨提示",
      componentName: "",
      confirmText: "",
      cancelText: "",
      hasSelfFooter: false,
      bankDialogData: {}, //- 大额支付专用
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
      // this.
    },
    //- 充值通道切换
    changePayChannelIndex (index) {
      this.payChannelIndex = index;
      this.recommendMoneyIndex = -1;
      this.$refs["feeForm"].resetFields();
      this.curPayChannel.amountType !== 1 && (this.feePlaceholder = this.curPayChannel.minAmout + '-' + this.curPayChannel.maxAmout)
      // this.
    },
    //- 充值金额切换
    changeRecommendMoneyIndex (index, item) {
      this.recommendMoneyIndex = index;
      this.feeForm.fee = item.value;
    },
    async _initRmb () {
      const resList = await Promise.allSettled([this.$http.getPzpayPictureUrl(), this.$http.getBankList(), this.$http.getFastBankList()])
      resList[0].status === 'fulfilled' && this.getPzpayPictureUrl(resList[0].value);
      resList[1].status === 'fulfilled' && this.getBankList(resList[1].value);
      resList[2].status === 'fulfilled' && this.getFastBankList(resList[2].value);
      this.showLoading = false;
      this.noData = !this.renderList.length;
    },
    //- 第一个通道获取内容
    getPzpayPictureUrl (response) {
      const { code, res } = response.data;
      if (code) return this.messageTip({ message: res.data.msg });

      res.bankTransferList && res.bankTransferList.forEach(item => item.alipayFlg = 0);
      res.alipayList && res.alipayList.forEach(item => item.alipayFlg = 0)
      //- 本地银行
      res.bankTransferList && this.renderList[0].children.push(...res.bankTransferList);
      //- 支付宝
      res.alipayList && res.alipayList.length && this.renderList[1].children.push(...res.alipayList);
      //- 微信添加内容
      res.weChatList && res.weChatList.length && this.renderList[2].children.push(...res.weChatList);
      //-  网银支付
      res.wyList && res.wyList.length && this.renderList[3].children.push(...res.wyList);

      //- 扫码支付
      if (res.qrCodeList && res.qrCodeList.length) {
        res.qrCodeList.forEach(item => {
          item.payType = 'qr';
        })
        this.renderList[4].children.push(...res.qrCodeList);
      }
       //- QQ支付
      res.qqList && res.qqList.length && this.renderList[5].children.push(...res.qqList);
    },
    //- 银行卡获取内容
    getBankList (response) {
      const { code, data } = response.data;
      if (code || !data) return
      this.bankList.push(...data.bankCards);
    },
    //- 快充通道
    async getFastBankList (response) {
      const { code, fastBanks } = response.data;
      let aliList = [];
      if (code === 0 && fastBanks && fastBanks.length) {
        fastBanks.forEach((item) => {
          if (item.alipayFlg == 0) {
            item.bankCards.forEach((items) => {
              items.bankName = item.showName;
              items.amountType = item.amountType;
              items.paymentType = item.paymentType
              items.depositName = item.depositName
              items.isHot = item.isHot
              items.isRecommend = item.isRecommend
              this.bankList.push(items);
            });
          } else if (item.alipayFlg == 1) {
            item.bankCards.forEach((items) => {
              items.alipayFlg = 1;
              items.bankName = item.showName;
              items.amountType = item.amountType;
              items.paymentType = item.paymentType
              items.depositName = item.depositName
              items.isHot = item.isHot
              items.isRecommend = item.isRecommend
              items.bankLog = require("../../img/deposit/ali.png");
              aliList.push(items);
            });
          }
        });
      }
      this.renderList[1].children.unshift(...aliList);
      this.bankList.forEach(item => item.alipayFlg = 1);
      this.renderList[0].children.unshift(...this.bankList);
      this.renderList = this.renderList.filter(item => item.children.length);

      // this.renderList.forEach(item => {
      //   item.children.sort((a, b) => {
      //     const firstA = a.amountType !== 1 ? a.minAmout : a.fixedAmount.split(',')[0]
      //     const lastA = a.amountType !== 1 ? a.maxAmout : a.fixedAmount.split(',').pop()
      //     const firstB = b.amountType !== 1 ? b.minAmout : b.fixedAmount.split(',')[0]
      //     const lastB = b.amountType !== 1 ? b.maxAmout : b.fixedAmount.split(',').pop()
      //     return firstA != firstB ? firstA - firstB : lastA - lastB
      //   })
      // })

      const { minAmout, maxAmout } = this.renderList[0].children[0];
      this.feePlaceholder = `${minAmout}-${maxAmout}`;
    },
    //- 检测存款金额
    async _rmPayDeposit () {
      if (!this.feeForm.fee) return this.messageTip({ message: "存款金额不能为空" });
      //- 需要输入用户名
      if (this.curPayChannel.paymentType === 13 && this.curPayChannel.depositName && !this.accountName) return this.messageTip({ message: "存款人姓名不能为空" });

      this.buttonLoading = true;
      const res = await this.$http.getDepositLockStatus();
      if (res.data.code === 0) {
        const depositLimit = res.data.data;
        if (depositLimit.depositLock === 1) {
          //- 提示限制弹窗
          this.openConfirmDialog({ content: "您已被限制存款，请联系客服！", cancelButtonText: "知道了", confirmButtonText: "联系客服", callback: () => { window.open(this.serUrl) } })
          this.buttonLoading = false;
          return;
        }
        if (depositLimit.depositLock === 0 && depositLimit.isSuccessDeposit && this.depositLimit.isReminder) {
          //- 调用客服弹窗
          this.openConfirmDialog({ content: "存款遇到问题？可以联系客服为您服务！", cancelButtonText: "继续存款", confirmButtonText: "联系客服", callback: () => { window.open(this.serUrl) }, cancelFn: () => { this._onlinePayDeposit() } })
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
      if (this.curPayChannel) {
        if (!value) {
          callback(new Error(`请${this.curPayChannel.amountType === 1 ? "选择" : "输入"}存款金额`))
        }
        if (this.curPayChannel.minAmout || 0 <= value <= this.curPayChannel.manAmout || Number.POSITIVE_INFINITY) {
          callback();
        } else {
          callback(new Error("存款金额不符合单笔存款限额"));
        }
      }
    },
    openDialog ({ componentName, dialogTitle, confirmText, hasSelfFooter, cancelText }) {
      this.dialogTitle = dialogTitle;
      this.confirmText = confirmText;
      this.cancelText = cancelText;
      this.componentName = componentName
      this.showDialog = true;
      this.hasSelfFooter = hasSelfFooter;
    },
    //- 立即存款
    async _onlinePayDeposit () {
      if (!this.curPayChannel) {
        this.messageTip({ message: "请先选择充值通道" });
        this.buttonLoading = false;
        return;
      }

      if (this.curPayChannel.payType === 'qr') {
        //- 扫码支付
        const res = await this.$http.applyQrPay({ fee: this.feeForm.fee, depositId: this.curPayChannel.id })
        if (res.data.code === 0) {
          this.cancelText = '已完成充值'
          this.confirmText = '需要帮助';
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
              userName: this.curPayChannel.paymentType === 13 && this.curPayChannel.depositName ? this.accountName : this.userInfo.realName,
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
            this.openDialog({ componentName: "LargePaymentDialog", dialogTitle: `${this.bankDialogData.bankName}大额支付专用`, cancelText: "已完成充值", confirmText: "充值问题需要协助" })
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
              content: ["请在新页面完成充值支付", "充值支付完成前，请勿关闭此窗口。"],
              cancelButtonText: "已完成充值",
              confirmButtonText: "充值问题需要协助",
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
      return getRecommendList(Min, Max, 5)
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
    // this.currentMoneyIndex = -1;
    // this.selectIndex = 0;
    // this.feePlaceholder = this.crChannelList[this.selectIndex]?.limitLabel;
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
</style>
