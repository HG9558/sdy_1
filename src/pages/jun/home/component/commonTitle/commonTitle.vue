<template>
  <div v-if="!isViLanguage" class="download-title">
    <div class="title-left-container">
      <img class="topic" src="../../img/topic_icon.png" alt="">
      <div class="text-desc">
        <div class="big-txt">{{titleTxt}}</div>
        <div v-if="!isMgm" class="small-txt">{{subTxt}}</div>
      </div>
    </div>
    <div class="title-right-container">{{enTxt}}</div>
  </div>
	<div v-else class="download-title__multiLanguage" :class="['download-title__multiLanguage_' + type]">
		<img :src="topImg" alt="">
		<div class="download-title__multiLanguage-bg">{{titleTxt}}</div>
		<div class="download-title__multiLanguage-desc">{{subTxt}}</div>
	</div>
</template>

<script>
	import {mapGetters} from "vuex";

	export default {
  name: "commonTitle",
  props: {
    titleTxt: String,
    subTxt: String,
    enTxt: String,
		type: String
  },
		computed: {
			...mapGetters('global', ['isViLanguage']),
			isMgm () {
				const { VUE_APP_APP_SIGN } = process.env
				return VUE_APP_APP_SIGN === 'mgm'
			},
			topImg() {
				return {
					live: require('./img/live.png'),
					games: require('./img/games.png'),
					download: require('./img/download.png'),
					service: require('./img/service.png'),
				}[this.type]
			}
		},
}
</script>

<style scoped lang="scss">
.download-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $c-81;
  margin-bottom: 10px;
  .title-left-container {
    display: flex;
    align-items: center;
    .topic {
      width: 18px;
    }
    .text-desc {
      display: flex;
      align-items: flex-end;
      margin-left: 21px;
      .big-txt {
        font-weight: 600;
        font-size: 30px;
        line-height: 42px;
        color: $c-81;
      }
      .small-txt {
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        margin: 0 0 7px 10px;
        color: $c-81;
      }
    }
  }
  .title-right-container {
    font-size: 12px;
    line-height: 17px;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      width: 35px;
      height: 2px;
      right: 0px;
      background-color: $c-81;
      top: -6px;
    }
  }
}
.download-title__multiLanguage {
	padding-bottom: 60px;
	text-align: center;
	img {
		margin: 0 auto 5px;
		width: 242px;
		height: 38px;
	}
	.download-title__multiLanguage-bg {
		width: 1200px;
		height: 46px;
		background: url("./img/title-bg.png") no-repeat center center;
		background-size: cover;
		font-size: 28px;
		font-weight: 800;
		text-shadow: 0 4px 4px rgba(255, 242, 222, 0.25), 3px 0px 2px rgba(215, 198, 173, 0.67);
		color: #815B39;
		line-height: 46px;
	}
	.download-title__multiLanguage-desc {
		margin-top: 20px;
		font-size: 16px;
		color: #887F76;
		text-transform: uppercase;
	}
}
.download-title__multiLanguage_download, .download-title__multiLanguage_live {
	.download-title__multiLanguage-bg {
		font-size: 43px;
	}
}
</style>
