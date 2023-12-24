<template>
  <div class="profile-container">
    <div class="container">
      <side-bar></side-bar>
      <div class="view-content">
        <base-header @changeUrl="changeUrl"></base-header>
        <router-view class="router-view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import BaseHeader from './components/BaseHeader/BaseHeader.vue';
import SideBar from './components/SideBar/index.vue'
export default {
  name: "profileMain",
  components: {
    SideBar,
    BaseHeader
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        if (val) {
          this._getUserInfo();
          this._initBankList();
        }
      }
    }
  },
  data () {
    return {
      isDeposit: false,
    };
  },
  methods: {
    ...mapActions('user', ["_getBankCardList", '_getCryptoList', '_getAlipayList', '_getElecList']),
    // ...mapMutations('user', ['set_user_bank_card_list', 'set_user_cry_card_list','set_user_alipay_card_list']),

    async _initBankList () {
      //- 初始化进行银行卡获取
      // let [bankData, cryData, aliPayData] = await Promise.allSettled([
      //   this.$http.getBankCardList(),
      //   this.$http.getCryptoList(),
      //   this.$http.getZfbList()
      // ]);
      // (bankData.status === "fulfilled" && !bankData.value.data.code) && this.set_user_bank_card_list(bankData.value.data.bankCards);
      // (cryData.status === "fulfilled" && !cryData.value.data.code) && this.set_user_cry_card_list(cryData.value.data.cryptoCurrencies);
      // (aliPayData.status === "fulfilled" && !aliPayData.value.data.code) && this.set_user_alipay_card_list(aliPayData.value.data.bankCards);
      this._getBankCardList();
      this._getCryptoList();
      this._getAlipayList();
      this._getElecList();
    },
    changeUrl () {
      switch (this.$route.path) {
        case '/profile/vip':
          this.$router.push('/profile/vipinfo')
          break;
        case '/profile/vipinfo':
          this.$router.push('/profile/vip')
          break;
        default:
          break;
      }
    }
  },
  computed: {
    ...mapState({ userInfo: state => state.user.userInfo }),
  },

};
</script>

<style lang="scss" scoped>
.profile-container {
  font-size: 16px;
  color: $ft-f6;
  background-image: url("./img/profile_bg.png");
  background-size: contain;
}

.container {
  box-sizing: border-box;
  padding-top: 148px;
  padding-bottom: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  @include flex(flex-start);
  align-items: flex-start;
}

.view-content {
  flex-grow: 1;
  .router-view {
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
}
</style>
