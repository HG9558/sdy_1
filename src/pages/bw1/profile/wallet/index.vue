<template>
  <div>
    <div class="top-div">
      <center-wallet :showLoding.sync="showLoding" :gameData.sync="gameData"></center-wallet>
      <div class="no-data-container" v-show="!showLoding && !Object.values(gameData).length">
        <img class="no-data-img" src="../withdrawal/img/no_data.png" alt="" />
        <div class="no-data-txt">
          还没有任何场馆余额 <br />
          投注后即可查看各场馆余额
        </div>
      </div>
      <div class="no-data-gif" v-show="showLoding">
        <img style="width: 300px;" src="../img/load.gif" alt="" />
      </div>
    </div>
    <!-- //银行卡管理 -->
    <div class="wallet-withdraw">
      <div class="content-title">
        <div class="content-title_inner">
          <div class="wallet-title">
            <div class="title">
              我的提现方式
            </div>
            <div class="wallet-num">
              <span>银行卡：{{ bankcardData.rmb.length }}/5</span>
              <span class="cry" v-if="crFlag">加密货币钱包：{{ bankcardData.crypto.length }}</span>
            </div>

          </div>

          <img class="en-title" :src="require(`../img/header/withdrawal_method.png`)" alt="">
        </div>
      </div>
      <bank-card-manage :crFlag="crFlag" :tabActive="tabActive" :isWallet="true" :bankcardData="bankcardData" ></bank-card-manage>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import CenterWallet from "../components/CenterWallet";
import BankCardManage from "../components/BankCardManage";

export default {
  name: 'wallet',
  components: {
    BankCardManage,
    CenterWallet,
  },
  data () {
    return {
      tabActive: "rmb",
      showLoding: false,
      gameData:[]
    };
  },
  computed: {
    ...mapState({
      bankcardData: state => state.user.bankcardData,
      crFlag: state => state.user.crFlag
    }),
  }
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
