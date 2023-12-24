<template>
  <div class="top-game">
    <common-title :titleTxt="$t('热门游戏')" :subTxt="$tt('hotGameSubText')" enTxt="Top Games" type="games"></common-title>
    <template v-if="!isViLanguage">
			<div class="type-chose">
				<div class="type" v-for="(item, index) in renderList" :key="index" @click="changeClassify(item.type,index)" :class="{'type-div' :selectIndex === index}">
					<div class="type-logo">{{ item.title }}</div>
				</div>
			</div>
			<div class="content-container">
				<div class="dn-bg">
					<img :src="require(`../../img/topGame/${gameItemData.type}_logo.png`)" :class="`plat-logo animate__fadeIn animate__animated ${gameItemData.type}-logo`">
					<div class="right-box">
						<div class="one">
							<div class="one-1">{{ gameItemData.gameNameTitle }}</div>
							<div class="one-2">{{ gameItemData.gameNameEnglish }}</div>
						</div>
						<div class="three">
							{{ gameItemData.gameInner }}
						</div>
					</div>
				</div>
				<div class="plat-content-box">
					<div class="game-item" :class="{'is-click':selectGameIndex===index}" v-for="(item, index) in renderList[selectIndex].gameList" :key="index" @click="goTargetGame(item,index)">
						<div v-show="item.isTry === 1 && item.availableWh === 1 && !token" class="game-item-mark try">
							<span>{{$t('可试玩')}}</span>
						</div>
						<div v-show="item.availableWh === 2" class="game-item-mark maintain">
							<span>{{$t('维护中')}}</span>
						</div>
						<img class="game-img isClick-img" :class="item.depotCode" :src="require(`../../img/topGame/${selectType}_${item.depotCode.toLowerCase()}.png`)" />
						<div class="type-name">{{ item.title }}</div>
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="top-game-tabs">
				<div class="top-game-tab" :class="{'top-game-tab__active' :selectIndex === index}" v-for="(item, index) in renderList" :key="index" @click="changeClassify(item.type,index)">
					{{ item.title }}
				</div>
			</div>

			<div class="top-game-tab-content">
				<img :src="getBannerImg(gameItemData.type)" alt="">
				<div class="top-game-tab-details">
					<div class="top-game-tab-details-title">{{ gameItemData.gameNameTitle }}</div>
					<div class="top-game-tab-details-desc">{{ gameItemData.gameInner }}</div>
					<div class="top-game-tab-details-games">
						<div class="game-item" :class="{'is-click':selectGameIndex===index}" v-for="(item, index) in renderList[selectIndex].gameList" :key="index" @click="goTargetGame(item,index)">
							<div v-show="item.isTry === 1 && item.availableWh === 1 && !token" class="game-item-mark try">
								<span>{{$t('可试玩')}}</span>
							</div>
							<div v-show="item.availableWh === 2" class="game-item-mark maintain">
								<span>{{$t('维护中')}}</span>
							</div>
							<img class="game-img isClick-img" :class="item.depotCode" :src="require(`../../img/topGame/${selectType}_${item.depotCode.toLowerCase()}.png`)" />
							<div class="type-name">{{ item.title }}</div>
						</div>
					</div>
				</div>
			</div>
		</template>
  </div>
</template>

<script>
import commonTitle from '../commonTitle/commonTitle.vue'
import { hotGameList } from "static_data/game_data"
import playGameMixin from "../../../../../common/mixin/playGameMixin";
import {mapState, mapMutations, mapGetters} from "vuex";

export default {
  name: "TopGame",
  mixins: [playGameMixin],
  components: {
    commonTitle
  },
  created () {
    this.selectType = this.hotGameList[0].type;
  },
  data () {
    return {
      selectIndex: 0,
      selectType: null,
      selectGameIndex: 0,
      hotGameList,
      gameItemData: hotGameList[0],
    };
  },
  methods: {
		...mapMutations('game', ['set_electronic_depotCode', 'set_poker_depotCode', 'set_lottery_depotCode', 'set_bingo_depotCode', 'set_catchfish_depotCode']),
    changeClassify (type, index) {
      this.selectGameIndex = 0;
      this.selectType = type
      this.selectIndex = index
      this.gameItemData = hotGameList[this.selectIndex];
    },
    async goTargetGame (item, index) {
      this.selectGameIndex = index;
      if (item.topGameType === "electronic") {
        this.set_electronic_depotCode(item.depotCode)
        this.$router.push('/electronic/selectList');
      } else if (item.topGameType === "poker") {
        this.set_poker_depotCode(item.depotCode)
        this.$router.push('/poker/selectList');
      } else if (item.topGameType === "bingo") {
        this.set_bingo_depotCode(item.depotCode)
        this.$router.push('/bingo/selectList');
      } else if (item.topGameType === "fish") {
        this.set_catchfish_depotCode(item.depotCode)
        this.$router.push('/fish/selectList');
      } else if (item.topGameType === "lottery") {
        this.set_lottery_depotCode(item.depotCode)
        this.$router.push('/lottery/selectList');
      } else {
        this._enterGame(item)
      }
    },
		getBannerImg(type) {
			try {
				return require(`../../img/topGame/tabBanners/${type}.png`)
			}	catch (e) {
				return require(`../../img/topGame/tabBanners/sport.png`)
			}
		}
  },
  computed: {
		...mapGetters('global', ['isViLanguage']),
		...mapState('global', ['language']),
		...mapState({
      token: state => state.user.token,
      esport: state => state.game.esport,
      sport: state => state.game.sport,
      real: state => state.game.real,
      poker: state => state.game.poker,
      lottery: state => state.game.lottery,
      electronic: state => state.game.electronic,
      fish: state => state.game.catchfish,
      bingo: state => state.game.bingo,
      douji: state => state.game.douji,
    }),
    renderList () {
      return this.hotGameList.map(item => {
        item.gameList = this[item.type]
        return item;
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./TopGame.scss";
.top-game .game-item {
	.M8, .M8VN {
		top: 44% !important;
	}
	.XA, .XAVN {
		width: 28px !important;
		height: 22px !important;
		top: 45% !important;
	}
	.QQK {
		width: 36px !important;
		top: 42% !important;
	}
	.CQ9, .CQVN, .CQYX {
		top: 46%!important;
	}

	.IM2 {
		top: 45%!important;
	}
	.YBCP {
		width: 26px !important;
		height: 28px !important;
		top: 47%!important;
	}
	.BL {
		width: 34px !important;
		height: 28px !important;
		top: 48%!important;
	}
	.AGIN {
		width: 39px !important;
		height: 22px !important;
		top: 46%!important;
	}
	.DG, .DGVN {
		width: 34px !important;
		height: 24px !important;
		top: 47%!important;
	}
	.AELI {
		width: 36px !important;
		height: 17px !important;
		top: 45%!important;
	}
	.SA {
		width: 30px !important;
		height: 30px !important;
	}
	.OBSP, .OBLI, .OBES, .OBQP, .OBCP, .OBDY {
		width: 20px !important;
		top: 52% !important;
	}
	.ME {
		width: 47px;
		height: 10px;
	}
	&.is-click {
		.M8, .M8VN {
			top: 48% !important;
			left: 51% !important;
		}
		.YBCP {
			top: 50%!important;
		}
		.BL {
			top: 52%!important;
		}
		.AGIN {
			top: 50%!important;
		}
		.DG, .DGVN {
			top: 50%!important;
			left: 51% !important;
		}
		.XA, .XAVN {
			left: 50% !important;
			top: 49% !important;
		}
		.QQK {
			top: 45% !important;
			left: 51% !important;
		}
		.CQ9, .CQVN .CQYX{
			top: 50%!important;
		}
		.AELI {
			top: 49%!important;
		}
		.SBA {
			top: 53%!important;
		}
		.SBOVN {
			top: 53%!important;
		}
		.OBSP, .OBLI, .OBES, .OBQP, .OBCP, .OBDY {
			top: 56% !important;
		}
	}
}
</style>
