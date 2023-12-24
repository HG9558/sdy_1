<template>
  <div>
    <div class="top-div">
      <center-wallet :showLoding.sync="showLoding" :gameData.sync="gameData"></center-wallet>
      <div class="no-data-container" v-show="!showLoding && !Object.values(gameData).length">
        <img class="no-data-img" src="../withdrawal/img/no_data.png" alt="" />
        <div class="no-data-text">
          <p>{{$t('还没有任何场馆余额')}}</p>
          <p>{{$t('投注后即可查看各场馆余额')}}</p>
        </div>
      </div>
      <div class="no-data-gif" v-show="showLoding">
        <img style="width: 300px;" :src="siteImgMap.loadGif" alt="" />
      </div>
    </div>
    <!-- //银行卡管理 -->
    <div class="wallet-withdraw">
      <bank-card-manage :crFlag="crFlag" :tabActive="tabActive" :isWallet="true" :bankcardData="bankcardData"></bank-card-manage>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import CenterWallet from "../components/CenterWallet";
import BankCardManage from "../components/BankCardManage";
import siteImgMap from '@/configs/siteImgMap'

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
      gameData: [],
      siteImgMap,
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
