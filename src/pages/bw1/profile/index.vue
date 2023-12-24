<template>
  <div class="profile-container">
    <div class="container">
      <side-bar></side-bar>
      <div :class="[path=='/profile/wallet' || path=='/profile/vipinfo'|| path=='/profile/baseInfo'|| path=='/profile/withdrawal'?'view-content1':'view-content']">
        <base-header :pathText="path" @changeUrl="changeUrl"></base-header>
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
    },
    $route (current, pre) {
     this.path = current.fullPath
    }
  },
  data () {
    return {
      isDeposit: false,
      path:''
    };
  },
  methods: {
    ...mapActions('user', ["_getBankCardList", '_getCryptoList', '_getAlipayList', '_getOtherPayAccountList']),

    async _initBankList () {
      this.path = this.$route.fullPath
      this._getBankCardList();
      this._getCryptoList();
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
  color: $c-1f;
  background: url('./img/bg.png') no-repeat center/cover;
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
  background: linear-gradient(180deg, #EFF0F9 2.4%, #DFE5F3 100%);
  border-radius: 10px;
  box-shadow: 0px 4px 8px 0px rgba(76, 78, 129, 0.4);

  .router-view {
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
}

.view-content1 {
  flex-grow: 1;
  background: none;
  border-radius: 10px;
  box-shadow: none;

  .router-view {
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
}

/deep/.el-input__prefix{
  color: #3B4165;
}
/deep/ .el-input__inner{
    box-shadow: none;
    color: #6F6F87;
  }
  
/deep/.el-dialog__body{
  .self-footer{
    width: 120px;
    height: 36px;
    font-weight: 600;
    font-size: 14px;
    color: #3B4165;
    background: $bg-ead;
    border-radius: 34px;
  }
}
</style>