<template>
  <div class="partner-wrapper">
    <div class="partner-banner">
      <div class="partner-main">
        <img class="partner-banner_left" :src="venturePlanPic" alt="">
        <div class="partner-banner_right">
          <img class="hy-title" src="./img/hy.png" alt="">
          <div class="contact-box">
            <div :key="index" class="contact-item" v-for="(item, index) in renderCopyList">
              <div class="contact-item-bg">
                <div class="circle-bg">
                  <img class="hy-logo" :src="require(`./img/${item.name}.png`)"  alt="logo" />
                </div>
                <div>{{ item.title }}</div>
                <div style="width: 140px; height: 16px; word-wrap: break-word;text-align: center;">
                  {{ item.text }}
                </div>
              </div>

              <div class="copy-btn" v-clipboard:copy="item.text" v-clipboard:success="firstCopySuccess"></div>
            </div>
          </div>
          <img class="agent" @click="goAgt" src="./img/join.png" />
        </div>
      </div>
    </div>
    <SplitLine />
    <div class="partner-content">
      <div class="partner-content_title">
        <div class="partner-content_title_left">
          BET88重新定义了行业
        </div>
        <div class="partner-content_title_right">
          App Download
        </div>
      </div>
      <div class="partner-bg">
        <div class="partner-first-list">
          <div class="partner-first-item" v-for="(item, index) in memberList" :key="index">
            <img class="partner-first-line-one" src="./img/line.png" alt="" />
            <img class="partner-first-line-two" :src="require(`./img/first-${index+1}.png`)" alt="" />
            <div class="partner-first-line-three">{{ item.name }}</div>
            <div class="partner-first-line-four">{{ item.title }}</div>
          </div>
        </div>
        <div class="partner-line"></div>
        <div class="partner-bottom-content">
          <img class="partner-img" :src="defineIndustryPic" alt="" />
          <div class="partner-right-box">
            <div class="partner-right-box_title_1">BET88给力的手机APP</div>
            <div class="partner-right-box_title_2">
              PC端，H5还有独家开发的移动端 全面支持IOS及安卓系统下全部移动设备
            </div>
            <div class="partner-right-box_title_3">业内最强的APP产品</div>
            <div class="two-box">
              <div class="two-item" v-for="(item, index) in advantageList" :key="index">
                <img :class="`icon-${index}`" :src="require(`./img/two-${index+1}.png`)" alt="" />
                <div class="item-name item-one">{{ item.name }}</div>
                <div class="item-title">{{ item.title }}</div>
                <div class="item-title2">{{ item.title2 }}</div>
              </div>
            </div>
            <div class="partner-right-box_title_3">权威认证机构</div>
            <div class="two-box">
              <div class="two-item" v-for="(item, index) in organizationList" :key="index">
                <img :src="require(`./img/logo_${index+1}.png`)" alt="" />
                <div class="item-name">{{item}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :show-close="false" :visible.sync="isShowCopy" center top="400px" width="182px">
      <img class="dialog-result" alt src="./img/copy_sucess.png" width="182px" />
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SplitLine from "commonComponent/SplitLine/SplitLine.vue"

export default {
  name: "partner",
  components: { SplitLine },
  data () {
    return {
      isShowCopy: false,
      copyList: [
        {
          name: "skype",
          title: "合营部SKYPE",
        },
        {
          name: "telegram",
          title: "合营部TELEGRAM",
        },
        {
          name: "flygram",
          title: "合营部FLYGRAM",
        },
      ],
      memberList: [
        {
          name: "会员统计",
          title: "注册会员有效会员随时查看",
        },
        {
          name: "会员游戏明细",
          title: "会员参与游戏盈亏详情",
        },
        {
          name: "会员报表",
          title: "各种会员信息一目了然",
        },
        {
          name: "平台费用明细",
          title: "平台流水，费用率，输赢状况及总平台费用",
        },
      ],
     advantageList: [
        {
          name: "更安全",
          title: "独家网络技术",
          title2: "超强防劫持",
        },
        {
          name: "更稳定",
          title: "强大的技术团队",
          title2: "提供更稳定的产品",
        },
        {
          name: "更丰富",
          title: "丰富的游戏产品",
          title2: "你想要的我们都有",
        },
        {
          name: "更私密",
          title: "三重数据加密",
          title2: "保护您的资料安全",
        },
      ],
      organizationList:['英国GC监督委员会','马耳他牌照(MGA)认证','英属维尔京群岛(BVI)认证','英属维尔京群岛(BVI)认证'],
      defineIndustryPic:'',
      venturePlanPic:''
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.token,
      stationSetting: state => state.global.stationSetting
    }),
    renderCopyList () {
      this.copyList.map(item => {
        if (this.stationSetting) {
          switch (item.name) {
            case "skype":
              item.text = this.stationSetting.configSkype
              break;
            case "telegram":
              item.text = this.stationSetting.configTelegram
              break;
            case "flygram":
              item.text = this.stationSetting.configFlygram
              break;
            default:
              break;
          }
        }

      })
      return this.copyList
    }
  },
  created () {
    this._initData()
  },
  methods: {
    async _initData () {
      const picResponse = await this.$http.getVenturePlanPic();
      if (picResponse.data.code) return;
      this.venturePlanPic = picResponse.data.data.venturePlanPic
      this.defineIndustryPic = picResponse.data.data.defineIndustryPic
    },
    goAgt () {
      if (this.isLogin) {
        if (process.env.VUE_APP_TOOGLETO_DOMAIN) {
          window.open(`${process.env.VUE_APP_TOOGLETO_DOMAIN}/#/login?username=${this.userInfo.loginName}`)
        }
      } else {
        this.$router.push({ path: '/login' })
      }
    },
    firstCopySuccess () {
      this.isShowCopy = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
