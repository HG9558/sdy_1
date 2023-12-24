<template>
  <div :class="`header-container ${$route.path=='/sponsor'?'_sponsor':''} ${ (!isShowDropMenu || (currentComponentName === 'AppDownload') ) ? ' drop-menu-hidden':'drop-menu-show'}`" ref="header">
		<header-top-bar />
    <!-- <NewYearHeader /> -->
    <header-navigator :currentComponentName.sync="currentComponentName" @changeMenuStatus="isShowDropMenu=$event">
      <div class="header-menu-container" v-if="isShowDropMenu && currentComponentName !== 'AppDownload'">
        <div class="header_menu_body">
          <component class="header_menu_main" :is="currentComponentName" @enterGame="_enterGame">
            <template v-if="currentComponentName==='HomeMenu'">
              <QrCode :codeSize="96" class="home-code" slot="ios-qrCode" :topTitle="token?'IOS':$t('扫码下载')">
								<span>{{$t('扫一扫')}}</span>
								<span>{{$t('下载全站APP')}}</span>
              </QrCode>
              <QrCode :codeSize="96" class="home-code" slot="android-qrCode" :topTitle="token?'Android':$t('扫码下载')">
								<span>{{$t('扫一扫')}}</span>
								<span>{{$t('下载全站APP')}}</span>
              </QrCode>
            </template>
          </component>
          <QrCode v-if="currentComponentName !=='HomeMenu'" :showRightEN="true" :topTitle="returnWaterData[currentComponentName].returnWater?$t('返水最高可达'):''" :returnWater="returnWaterData[currentComponentName].returnWater" :currentComponentName="currentComponentName" :enFlag="returnWaterData[currentComponentName].en_flag">
            <div>{{$t('扫一扫')}}</div>
            <div>{{$t('下载全站APP')}}</div>
          </QrCode>
        </div>
      </div>
    </header-navigator>
  </div>
</template>
<script>

import { mapState, mapMutations, mapGetters } from "vuex";
import HeaderNavigator from './component/HeaderNavigator.vue';
import HeaderTopBar from "./component/HeaderTopBar";
import QrCode from '../QrCode/index.vue';
import { returnWaterData } from 'static_data/header_data';
import { baseMenuData } from 'static_data/game_data';
import playGameMixin from '../../../common/mixin/playGameMixin.js'
// import NewYearHeader from 'components/common/NewYear/NewYearHeader.vue';

export default {
  name: "Header",
  mixins: [playGameMixin],
  components: {
    // NewYearHeader,
    QrCode,
    HeaderNavigator,
		HeaderTopBar,
    HomeMenu: () => import(/* webpackChunkName: "HomeMenu" */ './component/HomeMenu'),
    SportsMenu: () => import(/* webpackChunkName: "SportsMenu" */ './component/SportsMenu'),
    RealMenu: () => import(/* webpackChunkName: "RealMenu" */ './component/RealMenu'),
    ChessMenu: () => import(/* webpackChunkName: "ChessMenu" */ './component/ChessMenu'),
    EsportMenu: () => import(/* webpackChunkName: "EsportMenu" */ './component/EsportMenu'),
    ElectronicMenu: () => import(/* webpackChunkName: "ElectronicMenu" */ './component/ElectronicMenu'),
    LotteryMenu: () => import(/* webpackChunkName: "LotteryMenu" */ './component/LotteryMenu'),
    DiscountsMenu: () => import(/* webpackChunkName: "DiscountsMenu" */ './component/DiscountsMenu'),
    PartnerMenu: () => import(/* webpackChunkName: "PartnerMenu" */ './component/PartnerMenu'),
  },
  created () {
    //- 存储静态数据到stroe
    this.initGameList();
    this._initMenuList();
  },
  mounted () {
    // window.addEventListener('scroll', this.watchScroll)
  },
  watch: {
    currentComponentName (comName) {
      this.currentComponentName = comName;
    }
  },
  data () {
    return {
      isShowDropMenu: false,   //- 下拉菜单展示
      currentComponentName: 'SportsMenu',
      baseMenuData,
      returnWaterData,
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token
    }),
		...mapGetters('global', ['isZhLanguage', 'isViLanguage']),
	},
  methods: {
    ...mapMutations('game', ['set_esport', 'set_sport', 'set_real', 'set_poker', 'set_lottery', 'set_electronic']),
    ...mapMutations('normal', ['set_render_slot_game', 'set_render_pokerGame', 'set_render_lotteryGame', 'set_render_realGame']),
    //- 渲染静态游戏列表到stroe
    initGameList () {
      Object.values(this.baseMenuData).forEach((item, index) => {
        if (!item.saveType) return
        //- store数据存储内容
        if (!this.$store.state.game[item.saveName].length) {
          this[item.saveType](item.list)
        }
      })
    },
    //- 初始化整理游戏列表
    async _initMenuList () {
			Object.values(this.baseMenuData).forEach((item, index) => {
				if (!item.catId) return;
        // - 请求游戏列表
        if (item.catId > 0) {
          this.$http.getGameList({ catId: item.catId }).then(res => {
            if (res.data.code) return
            if (res.data.catDepots.length === 0) {
              this[item['saveType']]([]);
              return
            }
            item.list = this.filterReturnList(item.list, res.data.catDepots);
            item.list = this.deduplicateArr(item.list);
            this[item['saveType']](item.list);
            item['saveType'] === 'set_poker' && this.set_render_pokerGame(true);
            item['saveType'] === 'set_lottery' && this.set_render_lotteryGame(true);
            item['saveType'] === 'set_real' && this.set_render_realGame(true);
          })
        } else {
          //- 获取电子游戏列表 及捕鱼数据
					this.$http.getElecDepotList().then(eRes => {
            if (eRes.data.code) return
						if (!item.list.some( v => v.depotCode === 'FISH')) {
							item.list = [...this.filterReturnList(item.list, eRes.data.tGmDepots)];
							this[item['saveType']](item.list);
							this.set_render_slot_game(true)
							return;
						}

            const fishData = item.list.pop();
            this.$http.getFishList({ lableName: "" }).then(res => {
              if (res.data.code) return
              fishData.renderList = res.data.page.list;
              fishData.totalCount = res.data.page.totalCount
              item.list = [...this.filterReturnList(item.list, eRes.data.tGmDepots), fishData];
              this[item['saveType']](item.list);
              this.set_render_slot_game(true)
            }).catch((err) => {
              item.list = [...this.filterReturnList(item.list, eRes.data.tGmDepots), fishData];
              this[item['saveType']](item.list);
              this.set_render_slot_game(true)
            })

          })
        }
      });
    },
    //- 过滤返回值
    filterReturnList (staticList, serviceList) {
      return serviceList.map((serviceItem) => {
        const findItem = staticList.find(staticItem => staticItem.depotCode === serviceItem.depotCode)
        if (!findItem) return null
        return {
          ...serviceItem,
          ...findItem,
        }
      }).filter(v => !!v)
    },
    //- 去重
    deduplicateArr (arr) {
      let obj = {}
      return arr.reduce((prev, cur) => {
        obj[cur.depotCode] ? '' : obj[cur.depotCode] = true && prev.push(cur);
        return prev
      }, []);
    },
    //- 屏幕监听
    watchScroll () {
      const scrollTop = document.documentElement.scrollTop;
      if (!this.$refs.header) return;
      if (scrollTop > 220) {
        return this.$refs.header.style.backgroundColor = 'rgb(255,255,255)'
      }
      this.$refs.header.style.backgroundColor = `rgba(255,255,255,${scrollTop / 200})`
    },
    destroyed () {
      // window.removeEventListener('scroll', this.watchScroll);
    }
  },

};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
