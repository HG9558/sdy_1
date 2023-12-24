<template>
  <div class="home-title-section">
    <div class="home-title-section-tit" :class="type">
      <h2>{{dataMap.title}}</h2>
    </div>
    <div class="home-title-section-sub">{{dataMap.subtext}}</div>
  </div>
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      default: 'events',
    },
  },
  computed: {
    dataMap () {
      const map = {
        events: {
          title: this.$t('热门赛事'),
          subtext: this.$t('众多体育赛事，带给您丰富的游戏体验'),
        },
        game: {
          title: this.$t('热门游戏'),
          subtext: this.$tt('hotGameSubText'),
        },
        service: {
          title: this.$t('优质的服务'),
          subtext: this.$tt('serviceSubText'),
        },
      }
      return map[this.type]
    }
  },
}
</script>

<style lang="scss" scoped>
  .home-title-section {
		margin: 30px 0;
    text-align: center;
    .home-title-section-tit {
			overflow: auto;
			&.game {
				background: url("./images/game.png") no-repeat center center;
				background-size: 383px 33px;
			}
			&.events {
				background: url("./images/game.png") no-repeat center center;
				background-size: 383px 33px;
			}
			&.service {
				background: url("./images/service.png") no-repeat center center;
				background-size: 398px 38px;
			}
      h2 {
        margin-top: 10px;
        line-height: 42px;
        font-family: 'FZHanZhenGuangBiaoS-GB',serif;
        font-style: normal;
        font-size: 32px;
				color: #C8D2D2;
      }
    }
    .home-title-section-sub {
      margin-top: 5px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
			color: #889796;
    }
  }
</style>
