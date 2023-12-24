<template>
  <div class="partner-wrapper">
    <div class="partner-banner">
      <div class="partner-main">
        <div class="partner-banner_left-box">
          <img v-if="venturePlanPic" class="partner-banner_left" :src="venturePlanPic" alt="">
        </div>
        <div class="partner-banner_right">
          <!--          <img class="hy-title" src="./img/hy.png" alt="">-->
          <div class="partner-title">
            <h1>{{appTitle}}{{$t('合营计划')}}</h1>
            <h2>Partnership plan</h2>
            <p>{{$t('冲破一切的束缚，成为自己的传奇！')}}</p>
          </div>
          <div class="contact-box">
            <div :key="index" class="contact-item" v-for="(item, index) in renderCopyList">
              <div class="contact-item-bg">
                <div class="circle-bg">
                  <img class="hy-logo" :src="item.url" alt="logo" />
                </div>
                <div>{{ item.title }}</div>
              </div>
              <div class="copy-btn" v-for="(childItem, index) in item.text" :key="childItem + ` ${index}`">
                <span class="copy-btn-text">{{ childItem }}</span>
                <span class="copy-click" v-clipboard:copy="childItem"
                  v-clipboard:success="firstCopySuccess">{{$t('复制')}}</span>
              </div>
            </div>
          </div>
          <div class="agent" @click="goAgt">
            {{$t('登录代理系统')}}
          </div>
        </div>
      </div>
    </div>
    <!-- <SplitLine /> -->
    <div class="partner-content">
      <div class="partner-content_title">
        <div class="partner-content_title_left">
          {{appTitle}}{{$t('重新定义了行业')}}
        </div>
        <!-- <div class="partner-content_title_right">
          App Download
        </div> -->
      </div>
      <div class="partner-bg">
        <div class="partner-first-list">
          <div class="partner-first-item" v-for="(item, index) in memberList" :key="index">
            <!-- <img class="partner-first-line-one" src="./img/line.png" alt="" /> -->
            <img class="partner-first-line-two" :src="require(`./img/first-${index+1}.png`)" alt="" />
            <div class="partner-first-line-three">{{ item.name }}</div>
            <div class="partner-first-line-four">{{ item.title }}</div>
          </div>
        </div>
        <div class="partner-line"></div>
        <div class="partner-bottom-content">
          <img class="partner-img" :src="defineIndustryPic" alt="" />
          <div class="partner-right-box">
            <div class="partner-right-box_title_1">
              {{appTitle}}{{$t('给力的手机APP')}}
            </div>
            <div class="partner-right-box_title_2">
              {{$t('PC端，H5还有独家开发的移动端 全面支持IOS及安卓系统下全部移动设备')}}
            </div>
            <div class="partner-right-box_title_3">{{$t('业内最强的APP产品')}}</div>
            <div class="two-box">
              <div class="two-item" v-for="(item, index) in advantageList" :key="index">
                <img :class="`icon-${index}`" :src="require(`./img/two-${index+1}.png`)" alt="" />
                <div class="item-name item-one">{{ item.name }}</div>
                <div class="item-title">{{ item.title }}</div>
                <div class="item-title2">{{ item.title2 }}</div>
              </div>
            </div>
            <div class="partner-right-box_title_3">{{$t('权威认证机构')}}</div>
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
      <div class="dialog-result">
        <span>{{$t('复制成功')}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SplitLine from "commonComponent/SplitLine/SplitLine.vue"

const { VUE_APP_APP_TITLE } = process.env

export default {
  name: "partner",
  components: { SplitLine },
  data () {
    return {
      appTitle: VUE_APP_APP_TITLE,
      isShowCopy: false,
      // copyList: [
      //   {
      //     name: "flygram",
      //     title: this.$t("合营部FLYGRAM"),
      //   },
      //   {
      //     name: "telegram",
      //     title: this.$t("合营部TELEGRAM"),
      //   },
      //   {
      //     name: "QQ",
      //     title: this.$t("合营部QQ"),
      //   },
      // ],
      memberList: [
        {
          name: this.$t("会员统计"),
          title: this.$t("注册会员有效会员随时查看"),
        },
        {
          name: this.$t("会员游戏明细"),
          title: this.$t("会员参与游戏盈亏详情"),
        },
        {
          name: this.$t("会员报表"),
          title: this.$t("各种会员信息一目了然"),
        },
        {
          name: this.$t("平台费用明细"),
          title: this.$t("平台流水，费用率，输赢状况及总平台费用"),
        },
      ],
      advantageList: [
        {
          name: this.$t("更安全"),
          title: this.$t("独家网络技术"),
          title2: this.$t("超强防劫持"),
        },
        {
          name: this.$t("更稳定"),
          title: this.$t("强大的技术团队"),
          title2: this.$t("提供更稳定的产品"),
        },
        {
          name: this.$t("更丰富"),
          title: this.$t("丰富的游戏产品"),
          title2: this.$t("你想要的我们都有"),
        },
        {
          name: this.$t("更私密"),
          title: this.$t("三重数据加密"),
          title2: this.$t("保护您的资料安全"),
        },
      ],
      organizationList: [this.$t('英属维尔京群岛(BVI)认证'), this.$t('英国GC监督委员会'), this.$t('马耳他牌照(MGA)认证'), this.$t('菲律宾(PAGCOR)监督竞彩牌照')],
      defineIndustryPic: '',
      venturePlanPic: ''
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.token,
      stationSetting: state => state.global.stationSetting
    }),
    copyList () {
			if (!this.stationSetting) return []
      let tempList = [
        { name: "configSkype", url: "", text: '', title: '' },
        { name: "configTelegram", url: "", text: '', title: '' },
        { name: "configFlygram", url: "", text: '', title: '' }];
      return tempList.filter(item => this.stationSetting[item.name]);
    },
    renderCopyList () {
      return this.copyList.map(item => {
        if (this.stationSetting) {
          switch (item.name) {
            case "configSkype":
              item.text = this.filterNull(this.stationSetting.configSkype.split(','))
              item.url = this.stationSetting.pcIconSkype;
              item.title = this.stationSetting.titleSkype
              break;
            case "configTelegram":
              item.text = this.filterNull(this.stationSetting.configTelegram.split(','))
              item.url = this.stationSetting.pcIconTelegram;
              item.title = this.stationSetting.titleTelegram
              break;
            case "configFlygram":
              item.text = this.filterNull(this.stationSetting.configFlygram.split(','))
              item.url = this.stationSetting.pcIconFlygram;
              item.title = this.stationSetting.titleFlygram
              break;
          }
        }
        return item;
      })
    },
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
    filterNull (arr) {
      return arr.filter(val => val && val.trim())
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
