<template>
  <div class="user-operation-container">
    <!-- 未登录状态 -->
    <template v-if="!isLogin">
      <div class="unlogin-container">
        <router-link class="link-container register" to="/login/register">
          <img class="un-login-icon" src="../img/un-login-register.png" alt="">
          <span class="url-desc-txt">注册</span>
        </router-link>
        <router-link class="link-container login" to="/login">
          <img class="un-login-icon" src="../img/un_login_login.png" alt="">
          <span class="url-desc-txt">登录</span>
        </router-link>
      </div>
    </template>

    <!-- 登录状态 -->
    <template v-else>
      <div class="login-container" @mouseleave="isShowUserDropMeun=false">
        <div class="user-profile-desc" @click="$router.push('/profile')" @mouseenter="isShowUserDropMeun=true">
          <div :class="`img-box ${(mailBoxMsg || unMessageCount) ? 'show-dotted' : '' }`">
            <img class="userInfo-icon" src="../img/avatar.png" alt="" />
            <div class="vip-lvl">VIP{{userInfo.levelName.replace(/[^\d.]/g, "")|| "0" }}</div>
          </div>
          <div class="user-detail">
            <div class="user_detail_top">
              <span class="user-name">{{userInfo.loginName || "" }}</span>
            </div>
            <div class="userInfo-balance">
              RMB {{ (centerBalanceMoney > 0 && centerBalanceMoney.toFixed(2)) || "0.00"}}
              <i @click.stop="updateBalance" :class="`el-icon-${isRefresh ? 'loading': 'refresh'} refresh`"></i>
            </div>
          </div>
        </div>
        <!-- 下拉菜单 -->
        <div :class="`user-drop-menu ${isShowUserDropMeun? 'on':''}`">
          <div class="user-drop-menu_head">
            <div @click="$router.push(item.path)" class="deposit-cls" v-for="(item, index) in selectList" :key="index" @mouseenter="currentSelectIndex=index" @mouseleave="currentSelectIndex=-1">
              <img class="deposit-cls_icon" :src="require( `../img/userOpteration/${currentSelectIndex===index ? item.on_icon:item.icon }`) " />
              <!-- <img class="deposit-cls_icon" :src="require( `../img/userOpteration/${item.on_icon}`)" /> -->
              <span :class="`${currentSelectIndex===index ? 'font-active' : ''}`">{{ item.val }}</span>
            </div>
          </div>
          <div class="user-drop-menu_content">
            <div @click="$router.push(item.path)" :class="`information-item ${currentContentIndex===index ? 'active' : ''}`" v-for="(item, index) in informationList" :key="index" @mouseenter="currentContentIndex =index" @mouseleave="currentContentIndex=-1">
              <img class="information-item_img" :src=" require(`../img/userOpteration/${currentContentIndex!==index ? item.icon : item.on_icon}.png`)" alt="" @mouseleave="currentContentIndex=-1" />
              <span>{{ item.val }}</span>
              <div v-if="item.type=='message' && unMessageCount" class="message-count">
                <span class="message-count_font"> {{unMessageCount}}</span>
              </div>
            </div>
          </div>
          <button @click="_signout" class="user-drop-menu_footer">退出登录</button>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { selectList, informationList } from 'static_data/header_data'
export default {
  name: "UserOperation",
  watch: {
    isLogin: {
      immediate: true,
      handler (newToken) {
        if (newToken) {
          const timer = setInterval(() => {
            if (this.SToken) {
              clearInterval(timer);
              this._getCenterMoney()
              this._getMessageUnreadCount();
            }
          }, 300)
        }
      }
    }
  },
  data () {
    return {
      selectList,
      informationList,
      currentSelectIndex: -1,
      currentContentIndex: -1,
      isShowUserDropMeun: false
    }
  },
  methods: {
    ...mapMutations('user', ['set_un_read_message_count', 'clear_user_info']),
    ...mapMutations('global', ['set_is_refresh']),

    //- 站内信获取
    async _getMessageUnreadCount () {
      const res = await this.$http.getMessageUnread({ msgType: 0 });
      if (res.data.code) return;
      this.set_un_read_message_count(res.data.count);
    },
    //- 刷新用户余额
    updateBalance () {
      this._getCenterMoney();
    },
    //- 用户退出
    async _signout () {
      try {
        const res = await this.$http.getLoginOut({ token: this.isLogin, SToken: this.SToken })
        if (res.data.code !== 0) return
        this.clear_user_info();
        (this.$route.name !== "Home") && this.$router.replace("/")
      } catch (e) { console.log() }
    },
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.token,
      unMessageCount: state => state.user.unMessageCount,
      mailBoxMsg: state => state.user.mailBoxMsg,
      isRefresh: state => state.user.isRefresh,
    })
  }
}
</script>

<style scoped lang="scss">
@import "../css/UserOperation.scss";
</style>