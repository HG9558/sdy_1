<template>
  <div class="vipinfo">
    <div class="vipinfo-top middle" v-if="isShowVipList">
      <el-carousel type="card" :initial-index="nowInitialIndex" arrow="never" indicator-position="none" :autoplay="false" height="211px">
        <el-carousel-item :class="`v-${index}`" v-for="(item, index) in activityLevelList.slice(1, 11)" :key="index" :style="{
            backgroundImage: 'url(' + getBannerBG(index) + ')',
            backgroundRepeat: 'round',
            borderRadius: '15px',
          }">
          <div class="header-left">
            <div class="header-left-bottom">
              <div>{{ item.depositMin }}</div>
              <div>{{ item.validbetMin }}</div>
              <div>{{ item.downgradeBet }}</div>
            </div>
            <div class="downgrade-day">({{ downgradePromotionDay }}个月)</div>
          </div>
        </el-carousel-item>
      </el-carousel>

      <div class="vipinfo-title">VIP返水比例</div>
      <div class="vipinfo-inner-thead vipinfo-inner">
        <span class="vipinfo-inner-level">VIP等级</span>
        <span class="vipinfo-inner-level" v-for="(item, index) in vipList" :key="index">{{ item }}</span>
      </div>
      <div v-if="showTiyu" class="vipinfo-inner">
        <span class="vipinfo-inner-level">体育返水</span>
        <span class="vipinfo-inner-level" v-for="(item, index) in tiyu" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
      </div>
      <div v-if="showZr" class="vipinfo-inner">
        <span class="vipinfo-inner-level">真人返水</span>
        <span class="vipinfo-inner-level" v-for="(item, index) in zr" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
      </div>
      <div v-if="showQipai" class="vipinfo-inner">
        <span class="vipinfo-inner-level">棋牌返水</span>
        <span class="vipinfo-inner-level" v-for="(item, index) in qipai" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
      </div>
      <div v-if="showDj" class="vipinfo-inner">
        <span class="vipinfo-inner-level">电竞返水</span>
        <span class="vipinfo-inner-level" v-for="(item, index) in dj" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
      </div>
      <div v-if="showDy" class="vipinfo-inner">
        <span class="vipinfo-inner-level">电子返水</span>
        <span class="vipinfo-inner-level" v-for="(item, index) in dy" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
      </div>
      <div v-if="showBuyu" class="vipinfo-inner">
        <span class="vipinfo-inner-level">捕鱼返水</span>
        <span class="vipinfo-inner-level" v-for="(item, index) in buyu" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
      </div>
      <div v-if="showCp" class="vipinfo-inner">
        <span class="vipinfo-inner-level">彩票返水</span>
        <span class="vipinfo-inner-level" v-for="(item, index) in caip" :key="index">
          {{ item ? item.donateRatio.toFixed(2) : 0 }}%
        </span>
      </div>
    </div>
    <div class="vipinfo-top">
      <div class="rule-title">活动的一般条款与规则</div>
      <div class="vipinfo-word" v-for="(item, index) in ruleContent" :key="index">
        {{item}}
      </div>              
    </div>

    <div class="un-return-watter-container">
      <div class="watter-title">不返水列表</div>
      <div class="vipinfo-list">
        <div class="table-header">
          <div class="thead">
            游戏平台
          </div>
          <div class="thead">
            游戏
          </div>
        </div>
        <div class="table-body">
          <div class="vipinfo-list-word" v-for="(item, index) in getGameListWithoutRebateList" :key="index">
            <div class="item-title">{{ item.depotName }}</div>
            <div class="item">
              <span v-for="(childList, ind) in item.gameList" :key="ind">
                {{
                  ind !== item.gameList.length - 1
                    ? childList.gameName + ","
                    : childList.gameName
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VipInfo",
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this.init()
      }
    }
  },
  data () {
    return {
      isShowVipList: true,
      vipData: [],
      vipList: [
        "VIP0",
        "VIP1",
        "VIP2",
        "VIP3",
        "VIP4",
        "VIP5",
        "VIP6",
        "VIP7",
        "VIP8",
        "VIP9",
        "VIP10",
      ],
      buyu: [],
      tiyu: [],
      zr: [],
      dy: [],
      qipai: [],
      dj: [],
      caip: [],
      activityLevelList: [],
      showBuyu: true,
      showTiyu: true,
      showZr: true,
      showDy: true,
      showQipai: true,
      showDj: true,
      showCp: true,
      getGameListWithoutRebateList: [],
      ruleContent: []
    };
  },
  computed: {
    nowInitialIndex () {
      if (this.userInfo.mbrLevel === 0) {
        return 0;
      }
      return Number(this.userInfo.mbrLevel - 1);
    },
  },
  methods: {
    init () {
      this.$http.getGameListWithoutRebate().then((res) => {
        if (res.data.code === 0) {
          this.getGameListWithoutRebateList = res.data.data;
        }
      });
      this.$http.getVipInfo().then((res) => {
        if (res.data.code === 0) {
          this.vipData = res.data.data;
          const levelData = this.vipData.activityLevelCatDtos;
          this.activityLevelList = this.vipData.activityLevelList;
          this.ruleContent = JSON.parse(this.vipData.hdgz)?.content.split('\n');
          this.downgradePromotionDay = (
            this.vipData.downgradePromotionDay / 30
          ).toFixed();
          this.tiyu = levelData.filter((item) => {
            return item.catName === "体育";
          });
          this.zr = levelData.filter((item) => {
            return item.catName === "真人";
          });
          this.dy = levelData.filter((item) => {
            return item.catName === "电子";
          });
          this.qipai = levelData.filter((item) => {
            return item.catName === "棋牌";
          });
          this.buyu = levelData.filter((item) => {
            return item.catName === "捕鱼";
          });
          this.dj = levelData.filter((item) => {
            return item.catName === "电竞";
          });
          this.caip = levelData.filter((item) => {
            return item.catName === "彩票";
          });

          this.showBuyu = this.buyu.some((item) => item.donateRatio !== 0);
          this.showTiyu = this.tiyu.some((item) => item.donateRatio !== 0);
          this.showZr = this.zr.some((item) => item.donateRatio !== 0);
          this.showDy = this.dy.some((item) => item.donateRatio !== 0);
          this.showQipai = this.qipai.some((item) => item.donateRatio !== 0);
          this.showDj = this.dj.some((item) => item.donateRatio !== 0);
          this.showCp = this.caip.some((item) => item.donateRatio !== 0);

          if (
            this.buyu.length !== 11 ||
            this.tiyu.length !== 11 ||
            this.zr.length !== 11 ||
            this.dy.length !== 11 ||
            this.qipai.length !== 11 ||
            this.dj.length !== 11 ||
            this.caip.length !== 11
          ) {
             this.buyu.length = 11;
            this.tiyu.length = 11;
            this.zr.length = 11;
            this.dy.length = 11;
            this.qipai.length = 11;
            this.dj.length = 11;
            this.caip.length = 11;
          }
        }
      });
    },
    getBannerBG (index) {
      return require(`./img/V${index + 1}.png`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./css/index.scss";
</style>