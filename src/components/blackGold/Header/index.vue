<template>
  <div>
    <div :class="`header-container ${!isShowDropMenu?'drop-menu-hidden':'drop-menu-show'}`">
      <header-top-bar />
      <!-- <new-year-header /> -->
      <header-navigator :currentComponentName.sync="currentComponentName" @changeMenuStatus="isShowDropMenu=$event">
        <div class="header-menu-container" v-if="isShowDropMenu && currentComponentName !== 'SponsorMenu'">
          <div class="header_menu_body">
            <component class="header_menu_main" :is="currentComponentName" @enterGame="_enterGame">
              <template v-if="currentComponentName==='HomeMenu'">
                <QrCode :unLoginImgSrc="require('../QrCode/img/header_unlogin_code.png')" :codeSize="96" class="home-code header-code" slot="ios-qrCode" :topTitle="token?'IOS':''">
                  <span>{{$t('扫一扫')}}</span>
                  <span>{{$t('下载全站APP')}}</span>
                </QrCode>
                <QrCode :unLoginImgSrc="require('../QrCode/img/header_unlogin_code.png')" :codeSize="96" class="home-code header-code" slot="android-qrCode" :topTitle="token?'Android':''">
                  <span>{{$t('扫一扫')}}</span>
                  <span>{{$t('下载全站APP')}}</span>
                </QrCode>
              </template>
            </component>
            <QrCode style="margin-right:20px" class="header-code" v-if="currentComponentName !=='HomeMenu'" :showRightEN="true" :topTitle="returnWaterData[currentComponentName].returnWater?$t('返水最高可达'):''" :returnWater="returnWaterData[currentComponentName].returnWater" :currentComponentName="currentComponentName" :enFlag="returnWaterData[currentComponentName].en_flag">
              <div>{{$t('扫一扫')}}</div>
              <div>{{$t('下载全站APP')}}</div>
            </QrCode>
          </div>
        </div>
      </header-navigator>
    </div>
<!--    <div class="spacer"></div>-->
  </div>
</template>
<script>

import { mapState, mapMutations } from "vuex";
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
    CatchFishMenu: () => import(/* webpackChunkName: "LotteryMenu" */ './component/CatchFishMenu'),
    LotteryMenu: () => import(/* webpackChunkName: "LotteryMenu" */ './component/LotteryMenu'),
    DiscountsMenu: () => import(/* webpackChunkName: "DiscountsMenu" */ './component/DiscountsMenu'),
    PartnerMenu: () => import(/* webpackChunkName: "PartnerMenu" */ './component/PartnerMenu'),
    SabongMenu: () => import(/* webpackChunkName: "PartnerMenu" */ './component/SabongMenu'),
  },
  created () {
    //- 存储静态数据到stroe
    this.initGameList();
    this._initMenuList();
  },
  mounted () {
  },
  watch: {
    currentComponentName (comName) {
      this.currentComponentName = comName;
      let hideQrComponentArr = ['HomeMenu', 'LotteryMenu', 'DiscountsMenu'];
      this.hideRightQr = hideQrComponentArr.includes(comName);
    }
  },
  data () {
    return {
      isShowDropMenu: false,   //- 下拉菜单展示   //todo
      currentComponentName: 'SportsMenu',
      baseMenuData,
      returnWaterData,
      hideRightQr: false, //- 隐藏右侧二维码
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token
    }),
  },
  methods: {
    ...mapMutations('game', ['set_esport', 'set_sport', 'set_real', 'set_poker', 'set_lottery', 'set_electronic', 'set_catchfish', ]),
    ...mapMutations('normal', ['set_render_slot_game', 'set_render_pokerGame', 'set_render_lotteryGame', 'set_render_realGame', 'set_render_catchfishGame']),
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
            item.list = this.deduplicateArr(item.list)
            this[item['saveType']](item.list);
            item['saveType'] === 'set_poker' && this.set_render_pokerGame(true);
            item['saveType'] === 'set_lottery' && this.set_render_lotteryGame(true);
            item['saveType'] === 'set_real' && this.set_render_realGame(true);
          })
        } else if (item.catId === -2) {
          this.$http.getDepotListByCatId({ catId: 8 }).then(res => {
            if (res.data.code) return
            if (res.data.tGmDepots.length === 0) {
              this[item['saveType']]([]);
              return
            }
            item.list = this.filterReturnList(item.list, res.data.tGmDepots);
            item.list = this.deduplicateArr(item.list);
            this[item['saveType']](item.list);
            item['saveType'] === 'set_catchfish' && this.set_render_catchfishGame(true);
          })
        } else {
          //- 获取电子游戏列表 及捕鱼数据
          this.$http.getElecDepotList().then(eRes => {
            if (eRes.data.code) return
            item.list = [...this.filterReturnList(item.list, eRes.data.tGmDepots)];
            this[item['saveType']](item.list);
            this.set_render_slot_game(true);
          })
        }
      });
    },
    //- 过滤返回值
    filterReturnList(staticList, serviceList) {
      return serviceList
        .map(serviceItem => {
          const findItem = staticList.find(staticItem => staticItem.depotCode === serviceItem.depotCode);
          if (!findItem) return null;
          return {
            ...serviceItem,
            ...findItem,
          };
        })
        .filter(v => !!v);
    },
    //- 去重
    deduplicateArr (arr) {
      let obj = {}
      return arr.reduce((prev, cur) => {
        obj[cur.depotCode] ? '' : obj[cur.depotCode] = true && prev.push(cur);
        return prev
      }, []);
    }
  },

};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
