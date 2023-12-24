<template>
  <div class="aside">

    <div class="profile-top">
      <div class="user-container">
        <img class="user-avatar" :src="require(`../../img/sideBar/man.png`)" />
        <div class="level-badge">{{userInfo.levelName.replace(/[^\d.]/g, "")|| "0" }} </div>
        <div class="username">{{ userInfo.loginName }}</div>
        <el-divider></el-divider>
      </div>

      <el-row justify="space-around" type="flex">
        <el-col :span="8">
          <router-link class="link-item" to="/profile/deposit">
            <div class="ico-wrap">
              <img alt="wallet" src="../../img/sideBar/shopping.png" />
            </div>
            <div class="txt-wrap">存款</div>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link class="link-item" to="/profile/withdrawal">
            <div class="ico-wrap">
              <img alt="wallet" src="../../img/sideBar/withdrawal.png" />
            </div>
            <div class="txt-wrap">取款</div>
          </router-link>
        </el-col>
      </el-row>
    </div>

    <div class="profile-nav">
      <div class="profile-nav-item" v-for="(item, index) in sideBarList" :key="index">
        <router-link class="menu-item" tag="div" :to="item.path">
          <div :class="`img-bg ${item.icon}`"> </div>
          <div class="txt-wrap">{{ item.name }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { sideBarList } from 'static_data/user_profile_data.js';
import { mapMutations } from "vuex";

export default {
  name: "Sidebar",
  data () {
    return {
      sideBarList
    }
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this._getAgentInfo();
      }
    }
  },
  methods: {
    ...mapMutations('normal', ['set_agent_Info']),
    async _getAgentInfo () {
      const { data: { data, code } } = await this.$http.getAgentInfo();
      if (code) return
      if (data && data.isShowMbrAgent && this.sideBarList[4].path !== "/profile/nationalAgent") {
        this.set_agent_Info(data)
        this.sideBarList.splice(4, 0, {
          icon: 'agent',
          name: "全民代理",
          path: "/profile/nationalAgent",
        })
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>