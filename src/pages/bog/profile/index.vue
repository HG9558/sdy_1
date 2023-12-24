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
    ...mapActions('user', ["_getBankCardList", '_getCryptoList', '_getEcnyList', '_getAlipayList', '_getOtherPayAccountList']),
    async _initBankList () {
      this._getBankCardList();
      this._getCryptoList();
      this._getEcnyList();
      this._getAlipayList();
      this._getOtherPayAccountList();
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
  color: $c-81;
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
  }
}
</style>
