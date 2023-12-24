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
    ...mapActions('user', ["_getBankCardList"]),
    ...mapMutations('user', ['set_user_bank_card_list', 'set_user_cry_card_list','set_user_alipay_card_list']),

    async _initBankList () {
      //- 初始化进行银行卡获取
      let [bankData, cryData, aliPayData] = await Promise.allSettled([
        this.$http.getBankCardList(),
        this.$http.getCryptoList(),
        this.$http.getZfbList()
      ]);
      (bankData.status === "fulfilled" && !bankData.value.data.code) && this.set_user_bank_card_list(bankData.value.data.bankCards);
      (cryData.status === "fulfilled" && !cryData.value.data.code) && this.set_user_cry_card_list(cryData.value.data.cryptoCurrencies);
      (aliPayData.status === "fulfilled" && !aliPayData.value.data.code) && this.set_user_alipay_card_list(aliPayData.value.data.bankCards);
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
  background-image:url('./img/bg.png');
  background-size:cover ;
}

.container {
  box-sizing: border-box;
  padding-top: 148px;
  padding-bottom: 3rem;
  width: 1200px;
  margin: 0 auto;
  @include flex(flex-start);
  align-items: flex-start;
}

.view-content {
  flex-grow: 1;
  .router-view {
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    // background: radial-gradient(102.63% 94.75% at 40.91% 42.48%, #FBFAFF 0%, #ECF2FF 100%);
    // box-shadow: 0px 4px 4px rgba(0, 56, 255, 0.06), inset -1px -1px 0px #FFFFFF, inset 1px 1px 0px #FFFFFF;
  }
}
</style>