<template>
  <div class="vipinfo">
    <div class="vipinfo-top middle" v-if="isShowVipList">
      <el-carousel type="card" :initial-index="nowInitialIndex" arrow="never" indicator-position="none" :autoplay="false" height="211px">
        <el-carousel-item :class="`v-${index}`" v-for="(item, index) in filterActivityLevelList" :key="index" :style="{
            backgroundImage: 'url(' + getBannerBG(index) + ')',
            backgroundRepeat: 'round',
            borderRadius: '15px',
          }">
          <div class="header-left">
            <div class="header-left-bottom">
              <div>{{ item.depositMin }}</div>
              <div>{{ item.validbetMin }}</div>
              <div>
                {{ item.downgradeBet }}
                <span v-if="!isZhLanguage">({{ downgradePromotionDay }})</span>
              </div>
            </div>
            <div v-if="isZhLanguage" class="downgrade-day">({{ downgradePromotionDay }})</div>
          </div>
        </el-carousel-item>
      </el-carousel>

      <template v-if="rebateData.length">
        <div class="vipinfo-title">{{$t('VIP返水比例')}}</div>
        <div class="vipinfo-inner-thead vipinfo-inner">
          <span class="vipinfo-inner-level">{{$t('VIP等级')}}</span>
          <span class="vipinfo-inner-level" v-for="(item, index) in vipList" :key="index">{{ item }}</span>
        </div>
        <div v-for="(item, index) in rebateData" :key="index" class="vipinfo-inner">
          <span class="vipinfo-inner-level">{{item.catName}}</span>
          <span class="vipinfo-inner-level" v-for="(item1, index1) in item.list" :key="index1">
          {{ item1 ? item1.donateRatio.toFixed(2) : 0 }}%
        </span>
        </div>
      </template>
    </div>

    <div class="vipinfo-top">
      <div class="rule-title">{{$t('活动的一般条款与规则')}}</div>
      <div class="vipinfo-word" v-for="(item, index) in ruleContent" :key="index">
        {{item}}
      </div>
    </div>

    <div  v-if="VUE_APP_APP_SIGN === 'jss'" class="un-return-watter-container">
      <div class="watter-title">{{$t('不返水列表')}}</div>
      <div class="vipinfo-list">
        <div class="table-header">
          <div class="thead">
            {{$t('游戏平台')}}
          </div>
          <div class="thead">
            {{$t('游戏')}}
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
import {mapGetters, mapState} from "vuex";
const { VUE_APP_APP_SIGN } = process.env

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
      rebateData: [],
      ruleContent: []
    };
  },
  computed: {
    ...mapGetters('global', ['isZhLanguage']),
    ...mapState('global', ['language']),
		maxlength() {
			return {
				lua: 5,
				mgm: 8,
			}[VUE_APP_APP_SIGN] || 11
		},
    vipList() {
      return [
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
      ].slice(0, this.maxlength)
    },
    filterActivityLevelList() {
      return this.activityLevelList.slice(1, this.maxlength)
    },
		nowInitialIndex () {
      if (this.userInfo.mbrLevel === 0) {
        return 0;
      }
      return Number(this.userInfo.mbrLevel - 1);
    },
  },
  methods: {
    groupBy(array, f, key) {
      const groups = {}
      array.forEach((o) => {
        const group = f(o)
        groups[group] = groups[group] || []
        groups[group].push(o)
      })
      return Object.keys(groups).map(group => ({
        [key]: group,
        list: groups[group],
      }))
    },
    init () {
      this.$http.getGameListWithoutRebate().then((res) => {
        if (res.data.code === 0) {
          this.getGameListWithoutRebateList = res.data.data;
        }
      });
      this.$http.getVipInfo().then((res) => {
        if (res.data.code === 0) {
          this.vipData = res.data.data
          this.activityLevelList = this.vipData.activityLevelList
          this.ruleContent = JSON.parse(this.vipData.hdgz)?.content.split('\n')
          const day = this.vipData.downgradePromotionDay
          this.downgradePromotionDay = day > 30 ? (day / 30).toFixed()  + this.$t('个月') : day  + this.$t('天')

          const levelData = this.vipData.activityLevelCatDtos.filter(v => v.accountLevelId <= this.maxlength)
          this.rebateData = this.groupBy(levelData, item => item.catName, 'catName')
					this.rebateData.forEach((item) => {
						if (item.list.length !== this.maxlength) {
							item.list.length = this.maxlength
						}
					})
        }
      });
    },
    getBannerBG (index) {
      try {
				if (VUE_APP_APP_SIGN === 'lua') {
					return require(`./img/lua/V${index + 1}.png`);
				}

				if (VUE_APP_APP_SIGN === 'mgm') {
					try {
						return require(`./img/mgm/${this.language}/V${index + 1}.png`);
					} catch (e) {
						return require(`./img/mgm/V${index + 1}.png`);
					}
				}

        return require(`./img/${this.language}/V${index + 1}.png`);
      } catch (e) {
        return require(`./img/V${index + 1}.png`);
      }
		},
  },
};
</script>
<style lang="scss" scoped>
@import "./css/index.scss";
</style>
