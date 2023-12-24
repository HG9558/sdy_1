<template>
  <div class="cr-pay-container">
    <div v-if="!showLoading && !noData && crChannelList.length">
      <div class="tip">{{$t('选择充值通道')}}
        <span class="usdt-txt" v-if="stationSetting.usdtBuyUrl" @click="hdclick">{{$t('购买USDT币')}}</span>
        <router-link to="/usdtTeach" class="usdt-txt" v-if="stationSetting.usdtBuyUrl" >{{$t('USDT购买教程')}}</router-link>
      </div>
      <div class="select-pay-container">
        <div class="select-pay-item" v-for="(item,index) in crChannelList" :key="index" @click="changeRechargeChannel(item,index)">
          <img :src="item.icoUrl" class="logo" alt="">
          <div class="pay-name">
            <span class="text">{{item.label}}</span>
            <span class="number">{{item.limitLabel}}</span>
          </div>
          <p class="tag" v-if="item.isHot||item.isRecommend"><i>{{item.isHot?$t('热门'):item.isRecommend?$t('推荐'):''}}</i></p>
          <img v-if="selectIndex === index" src="../../img/deposit/new_checked.png" class="is-select" alt="">
        </div>
      </div>

      <div class="select-pay-form">
        <div class="tip">
          <span>{{$t('存款金额')}}</span>
          <!-- 存就送icon，勿删 -->
          <!-- <span class="text" v-show="paymentText">{{ paymentText }}</span> -->
          </div>
        <div class="select-box">
          <div class="select-card-container">
            <div class="select-item" :class="{'active':currentMoneyIndex===index}" v-for="(item,index) in recommendList" :key="index" @click="changeSelectMoney(item,index)">{{item.value}}USDT</div>
          </div>
          <div class="select-form-container">
            <el-input v-model.number="money" class="yszjl" type="number" :placeholder="feePlaceholder"></el-input>
            <el-button class="handle-btn yszjl" @click="_cyPayDeposit" :loading="buttonLoading">{{$t('立即存款')}}</el-button>
            <div :class="{'handle-btn':true,'remindActive' : isRemindIng}" @click="_onRemind">{{remindText}}</div>
            <div class="handle-btn" @click="$router.push('/help_center')">{{$t('存款教程')}}</div>
          </div>
          <div class="select-info">
            <div class="info-item tip-text">{{$t('请使用您信任的第三方交易所钱包进行转账，本平台不收取任何手续费，最终充值金额以实际到账金额为准！')}}</div>
            <div class="info-item exchange-num">{{$t('当前参考汇率：')}} 1 USDT ≈ {{exchangeRate}} {{$tt('currencyValue')}}</div>
            <div class="info-item get-money">{{$t('预计到账金额：')}}{{userGetMoney}} {{$tt('currencyValue')}}</div>
          </div>
        </div>
      </div>

      <div class="pay-card-list-container">
        <div class="card-title">{{$t('可任意选择支持USDT支付的交易所及钱包，例如：')}}</div>
        <div class="card-list-wrapper">
          <div class="card-list" v-for="(item,index) in crLogoList" :key="index">
            <div class="circle-outer">
              <div class="circle-inner">
                <img class="card-logo" :src="item.picpcpath || item.picMbPath" alt="">
              </div>
            </div>
            <div class="text">{{item.name}}</div>
          </div>
        </div>
      </div>

    </div>

    <Loading :showLoading="showLoading" v-if="showLoading" />
    <template v-else>
      <div v-if="noData || !crChannelList.length" class="box-no-deposit-rode">
        <div class="rode-image">
          <img src="../../img/deposit/nodepositrode.png" alt="" />
        </div>
        <div class="rode-text">{{$t('充值通道维护中')}}</div>
      </div>
    </template>
    <global-dialog v-if="crChannelList.length" class="cr-dialog" :title="`${crChannelList[selectIndex].crName}(${crChannelList[selectIndex].category})`" :showDialog.sync="showDialog" :hasSelfFooter="false" :cancelText="$t('已完成充值')" :confirmText="$t('充值问题需要协助')" @confirmHandle="confirmHandle">
      <div class="cr-pay-dialog">
        <img class="qr-code" :src="`data:image/png;base64,${crPayInfo.qrCode}`" alt="">
        <div>
          <div class="cr-line">
            <span class="cr-title">{{$t('预计到账金额：')}}</span>
            <span class="cr-value">{{crPayInfo.depositAmountCNY}}{{$tt('currencyValue')}}</span>
          </div>
          <div class="cr-line">
            <span class="cr-title">{{$t('支付金额：')}}</span>
            <span class="cr-value">{{crPayInfo.depositAmount}} USDT</span>
          </div>
          <div class="cr-line">
            <span class="cr-title">{{$t('钱包地址：')}}</span>
            <span class="cr-value">{{crPayInfo.walletAddress}}</span>
          </div>
        </div>

        <el-button class="yszjl cr-button" type="primary" v-clipboard:copy="crPayInfo.walletAddress" v-clipboard:error="onCopyError" v-clipboard:success="onCopySuccess">{{$t('点击复制钱包地址')}}</el-button>
        <div class="cr-title tip">{{$t('请使用您的加密货币钱包或交易所平台进行支付')}}</div>
      </div>
    </global-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import { getRecommendList } from 'static_data/deposit_data';
import Loading from 'commonComponent/Loading';

export default {
  name: "CrPay",
	components: {
		Loading,
	},
  props: {
    componentName: String,
    rmPayActivityRules: Object,
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this._initCrypto()
      }
    },
    money (val) {
      this.currentMoneyIndex = this.recommendList.findIndex(item => item.value === val)
    }
  },
  data () {
    return {
      exchangeRate: null,
      crChannelList: [],
      selectIndex: 0,
      feePlaceholder: null,
      currentMoneyIndex: -1,
      money: null,
      isRemindIng: false,
      remindText: this.$t('催单'),
      crLogoList: [],
      showLoading: true,
      noData: false,
      buttonLoading: false,
      showDialog: false,
      crPayInfo: {}
    }
  },
  computed: {
    ...mapState({
      serUrl: state => state.user.serUrl,
      stationSetting: state => state.global.stationSetting
    }),
    recommendList () {
      try {
        let Min = Number(this.feePlaceholder.split("-")[0]);
        const Max = 50000;
        return getRecommendList(Min, Max)
      } catch (error) {
        return []
      }
    },
    userGetMoney () {
      let amount = (this.money * this.exchangeRate).toString();
      const index = amount.indexOf(".");
      if (index !== -1) {
        amount = amount.slice(0, index + 3);
      }
      return amount;
    },
    paymentText () {
      const { allActiveText, textArr } = this.rmPayActivityRules
      return allActiveText || textArr[6]
    },
  },
  methods: {
    ...mapMutations('user', ['set_crLogo_list']),
    hdclick() {
      window.open(this.stationSetting.usdtBuyUrl)
    },
    //- 初始虚拟币
    async _initCrypto () {
      this.showLoading = true
      try {
        const [exchangeRes, crListRes] = await Promise.all([this.$http.getExchangeRate(), this.$http.getCrList()]);
        if (exchangeRes.data.code || crListRes.data.code) {
          this.messageTip({ message: exchangeRes.data.msg || crListRes.data.msg })
          return
        }
        this.exchangeRate = exchangeRes.data.msg;
        crListRes.data.crList && (this.crChannelList = crListRes.data.crList.map((v) => {
          return {
            ...v,
            icoUrl: v.backBankImg,
            label: v.showName,
            limitLabel: `${v.minAmout}-${this.$t('无上限')}`,
          };
        }));
        this.noData = !this.crChannelList.length;
        this.feePlaceholder = this.crChannelList[this.selectIndex].limitLabel;
        this.showLoading = false;
      } catch (error) {
        console.log(error)
        this.showLoading = false;
        this.noData = true;
      }
      this._getCrLog();
    },
    changeSelectMoney (item, index) {
      this.currentMoneyIndex = index;
      this.money = item.value;
    },
    //- 获取虚拟币显示图标
    async _getCrLog () {
      try {
        const res = await this.$http.getCrLogo();
        if (res.data.code) return this.messageTip({ message: res.data.msg })
        this.crLogoList = res.data.data;
      } catch (error) {
        console.log(error)
      }
    },
    async _onRemind () {
      if (this.isRemindIng) {
        this.messageTip({ message: this.$t('请稍后再试') });
        return;
      }
      this.isRemindIng = true;
      let wait = 10;
      let time = setInterval(() => {
        if (wait === 0) {
          this.remindText = this.$t('催单');
          this.isRemindIng = false;
          clearInterval(time);
          return
        }
        this.remindText = `${this.$t('催单')}(${wait})`;
        wait--;
      }, 1000);
      const res = await this.$http.getRemind();
      if (res.data.code) {
        this.messageTip({ message: this.$t('请稍后再试') });
        this.isRemindIng = false;
        clearInterval(time);
        wait = 10;
      }
    },
    changeRechargeChannel (item, index) {
      this.selectIndex = index;
      this.feePlaceholder = item.limitLabel;
      this.money = null;
      this.currentMoneyIndex = -1;
    },
    confirmHandle () {
      window.open(this.serUrl);
    },
    onCopyError () {
      this.messageTip({ message: this.$t('复制失败！'), type: "error" });
    },
    onCopySuccess () {
      this.messageTip({ message: this.$t('复制成功！'), type: "success" });
    },
    async _cyPayDeposit () {
      if (this.money === 0) return
      if (!this.money) {
        this.messageTip({ message: this.$t('存款金额不能为空') })
        return;
      }
      this.buttonLoading = true;
      try {
        const res = await this.$http.applyCrPay({
          depositId: this.crChannelList[this.selectIndex].id,
          fee: this.money,
          exchangeRate: this.exchangeRate,
        })
        this.buttonLoading = false;
        if (res.data.code) {
          this.messageTip({
            message: res.data.msg,
            onClose: () => {
              // this.$router.push({ path: "/profile" });
            }
          });
          return
        }
        this.crPayInfo = res.data.info
        this.showDialog = true;
      } catch (error) {
        this.buttonLoading = false;
      }
    }
  },
  deactivated () {
    this.money = null;
    this.currentMoneyIndex = -1;
    this.selectIndex = 0;
    this.feePlaceholder = this.crChannelList[this.selectIndex]?.limitLabel;
    this.noData = false;
    this.showLoading = false;
  }
}
</script>

<style scoped lang="scss">
@import "../css/CrPay.scss";
</style>
