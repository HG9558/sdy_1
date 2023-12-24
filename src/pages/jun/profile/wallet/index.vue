<template>
  <div>
    <div class="top-div">
      <center-wallet :showLoding.sync="showLoding" :gameData.sync="gameData"></center-wallet>
      <div class="no-data-container" v-show="!showLoding && !Object.values(gameData).length">
        <img class="no-data-img" src="../withdrawal/img/no_data.png" alt="" />
        <div class="no-data-txt">
          {{ $t('还没有任何场馆余额') }} <br />
          {{ $t('投注后即可查看各场馆余额') }}
        </div>
      </div>
      <div class="no-data-gif" v-show="showLoding">
        <img :src="siteImgMap.loadGif" alt="" />
      </div>
    </div>
    <!-- //银行卡管理 -->
    <div class="wallet-withdraw">
      <div class="content-title">
        <div class="content-title_inner">
          <div class="wallet-title">
            <div class="title">
              {{ $t('我的提现方式') }}
            </div>
            <div class="wallet-num">
              <span v-if="cnyWithdrawEnable">{{ $t('银行卡') }}：{{ bankcardData.rmb.length }}/5</span>
              <span class="cry" v-if="crFlag">{{ $t('加密货币钱包：') }}{{ bankcardData.crypto.length }}</span>
              <span v-if="alipayEnable">{{ $t('支付宝钱包：') }}{{ bankcardData.alipay.length }}</span>
              <span v-if="eMoneyPayWithdrawEnable">{{ $t('电子钱包：') }}{{ bankcardData.elec.length }}</span>
            </div>
          </div>

          <img class="en-title" :src="require(`../img/header/withdrawal_method.png`)" alt="" />
        </div>
      </div>
      <bank-card-manage
        :crFlag="crFlag"
        :tabActive="tabActive"
        :isWallet="true"
        :bankcardData="bankcardData"></bank-card-manage>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import CenterWallet from '../components/CenterWallet';
import BankCardManage from '../components/BankCardManage';
import siteImgMap from '@/configs/siteImgMap';

export default {
  name: 'wallet',
  components: {
    BankCardManage,
    CenterWallet,
  },
  data() {
    return {
      tabActive: 'rmb',
      showLoding: false,
      gameData: [],
      siteImgMap,
    };
  },
  computed: {
    ...mapState({
      alipayEnable: state => state.user.alipayEnable,
      eMoneyPayWithdrawEnable: state => state.user.eMoneyPayWithdrawEnable,
      cnyWithdrawEnable: state => state.user.cnyWithdrawEnable,
      bankcardData: state => state.user.bankcardData,
      crFlag: state => state.user.crFlag,
    }),
  },
  methods: {
    ...mapMutations('user', ['set_alipay_enable', 'set_elecpay_enable', 'set_cnyWithdrawEnable_enable']),
    async _isWithdrawal () {
      const res = await this.$http.isWithdrawal()
      if (res.data.code) return
      this.set_alipay_enable(!!res.data.data.alipayEnable)
      this.set_elecpay_enable(!!res.data.data.eMoneyPayWithdrawEnable)
      this.set_cnyWithdrawEnable_enable(!!res.data.data.cnyWithdrawEnable)
    },
  },
  mounted() {
    this._isWithdrawal()
  }
};
</script>

<style lang="scss" scoped>
@import './css/index.scss';
</style>
