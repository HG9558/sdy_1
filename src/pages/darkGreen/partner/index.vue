<template>
  <div class="partner-wrapper">
    <div class="partner-banner">
      <div class="partner-main">
        <div class="partner-banner_left-box">
          <img v-if="venturePlanPic" class="partner-banner_left" :src="venturePlanPic" alt="">
        </div>
        <PartnerContact />
      </div>
    </div>
    <div class="parent-bg-container">
      <SplitLine />
      <div class="partner-content">
        <div class="partner-content_title">
          <div class="partner-content_title_left">
            {{$tt('appText')}}{{$t('重新定义了行业')}}
          </div>
        </div>
        <div class="partner-bg">
          <div class="partner-first-list">
            <div class="partner-first-item" v-for="(item, index) in memberList" :key="index">
<!--              <img class="partner-first-line-one" src="./img/line.png" alt="" />-->
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
                {{$tt('appText')}}{{$t('给力的手机APP')}}
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
    </div>
  </div>
</template>

<script>
import { mapState} from "vuex";
import PartnerContact from "./PartnerContact";
import SplitLine from "commonComponent/SplitLine/SplitLine.vue"

export default {
  name: "partner",
  components: {
    SplitLine,
    PartnerContact,
  },
  data () {
    return {
      memberList: [
        {
          name: this.$t('会员统计'),
          title: this.$t('注册会员有效会员随时查看'),
        },
        {
          name: this.$t('会员游戏明细'),
          title: this.$t('会员参与游戏盈亏详情'),
        },
        {
          name: this.$t('会员报表'),
          title: this.$t('各种会员信息一目了然'),
        },
        {
          name: this.$t('平台费用明细'),
          title: this.$t('平台流水，费用率，输赢状况及总平台费用'),
        },
      ],
      advantageList: [
        {
          name: this.$t('更安全'),
          title: this.$t('独家网络技术'),
          title2: this.$t('超强防劫持'),
        },
        {
          name: this.$t('更稳定'),
          title: this.$t('强大的技术团队'),
          title2: this.$t('提供更稳定的产品'),
        },
        {
          name: this.$t('更丰富'),
          title: this.$t('丰富的游戏产品'),
          title2: this.$t('你想要的我们都有'),
        },
        {
          name: this.$t('更私密'),
          title: this.$t('三重数据加密'),
          title2: this.$t('保护您的资料安全'),
        },
      ],
      organizationList: [this.$t('英国GC监督委员会'), this.$t('马耳他牌照(MGA)认证'), this.$t('英属维尔京群岛(BVI)认证'), this.$t('菲律宾(PAGCOR)认证')],
      defineIndustryPic: '',
      venturePlanPic: ''
    };
  },
  computed: {
		...mapState({
      isLogin: state => state.user.token,
    }),
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
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
