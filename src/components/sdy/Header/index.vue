<template>
  <div>
    <div :class="`header-container ${!isShowDropMenu?'drop-menu-hidden':'drop-menu-show'}`">
      <header-navigator :currentComponentName.sync="currentComponentName" @changeMenuStatus="isShowDropMenu=$event">
        <div class="header-menu-container" v-if="isShowDropMenu && currentComponentName !== 'SponsorMenu'">
          <div class="header_menu_body">
            <component class="header_menu_main" :is="currentComponentName" @enterGame="_enterGame">
              <template v-if="currentComponentName==='HomeMenu'">
                <QrCode :unLoginImgSrc="require('../QrCode/img/header_unlogin_code.png')" :codeSize="96" class="home-code header-code" slot="ios-qrCode" :topTitle="token?'IOS':''">
                  <span>扫一扫</span>
                  <span>下载全站APP</span>
                </QrCode>
                <QrCode :unLoginImgSrc="require('../QrCode/img/header_unlogin_code.png')" :codeSize="96" class="home-code header-code" slot="android-qrCode" :topTitle="token?'Android':''">
                  <span>扫一扫</span>
                  <span>下载全站APP</span>
                </QrCode>
              </template>
            </component>
            <QrCode style="margin-right:20px" :unLoginImgSrc="require('../QrCode/img/header_unlogin_code.png')" class="header-code" v-if="currentComponentName !=='HomeMenu'" :showRightEN="true" :topTitle="returnWaterData[currentComponentName].img_src?'返水最高可达':''" :returnWater="returnWaterData[currentComponentName].img_src" :currentComponentName="currentComponentName" :enFlag="returnWaterData[currentComponentName].en_flag">
              <div>扫一扫</div>
              <div>下载全站APP</div>
            </QrCode>
          </div>
        </div>
      </header-navigator>
    </div>
    <div class="spacer"></div>
  </div>
</template>
<script>

import { mapState, mapMutations } from "vuex";
import HeaderNavigator from './component/HeaderNavigator.vue';
import QrCode from '../QrCode/index.vue';
import { returnWaterData } from 'static_data/header_data';
import { baseMenuData } from 'static_data/game_data';
import playGameMixin from '../../../common/mixin/playGameMixin.js'

export default {
  name: "Header",
  mixins: [playGameMixin],
  components: {
    QrCode,
    HeaderNavigator,
    HomeMenu: () => import(/* webpackChunkName: "HomeMenu" */ './component/HomeMenu'),
    SportsMenu: () => import(/* webpackChunkName: "SportsMenu" */ './component/SportsMenu'),
    RealMenu: () => import(/* webpackChunkName: "RealMenu" */ './component/RealMenu'),
    ChessMenu: () => import(/* webpackChunkName: "ChessMenu" */ './component/ChessMenu'),
    EsportMenu: () => import(/* webpackChunkName: "EsportMenu" */ './component/EsportMenu'),
    ElectronicMenu: () => import(/* webpackChunkName: "ElectronicMenu" */ './component/ElectronicMenu'),
    LotteryMenu: () => import(/* webpackChunkName: "LotteryMenu" */ './component/LotteryMenu'),
    DiscountsMenu: () => import(/* webpackChunkName: "DiscountsMenu" */ './component/DiscountsMenu'),
    PartnerMenu: () => import(/* webpackChunkName: "PartnerMenu" */ './component/PartnerMenu'),
    SabongMenu: () => import(/* webpackChunkName: "PartnerMenu" */ './component/SabongMenu'),
  },
  created () {
    //- 存储静态数据到stroe
    this.initGameList();
  },
  mounted () {
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this._initMenuList();
      }
    },
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
    ...mapMutations('game', ['set_esport', 'set_sport', 'set_real', 'set_poker', 'set_lottery', 'set_electronic', 'set_sabong', ]),
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
            item.list = this.deduplicateArr(item.list)
            this[item['saveType']](item.list);
            item['saveType'] === 'set_poker' && this.set_render_pokerGame(true);
            item['saveType'] === 'set_lottery' && this.set_render_lotteryGame(true);
            item['saveType'] === 'set_real' && this.set_render_realGame(true);
          })
        } else {
          //- 获取电子游戏列表 及捕鱼数据
          this.$http.getElecDepotList().then(eRes => {
            if (eRes.data.code) return
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
      const tempArr = [...staticList, ...serviceList];
      const obj = {};
      return tempArr.reduce((prev, next) => {
        if (obj[next['depotCode']]) {
          prev.push({ ...obj[next['depotCode']], ...next })
        } else {
          obj[next['depotCode']] = next;
        }
        return prev;
      }, [])
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
