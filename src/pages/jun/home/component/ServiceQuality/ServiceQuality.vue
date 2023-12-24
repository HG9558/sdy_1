<template>
  <div class="service">
    <common-title :titleTxt="$t('优质的服务')" :subTxt="$tt('serviceSubText')" enTxt="Service Quality" type="service"></common-title>
    <template v-if="!isViLanguage">
			<div class="service-top-box">
				<div class="service-items" v-for="(item, index) in serviceQualityTopData" :key="index">
					<img class="desc-img" :src="require(`../../img/service/${item.imgSrc}`)" alt="" />
					<div class="content">
						<div class="main">
							{{ item.titleOne }}
							<div class="english">{{ item.english }}</div>
						</div>
						<div class="main-two">{{ item.titleTwo }}</div>
					</div>
				</div>
			</div>
			<div class="service-bottom-box">
				<div v-for="item in serviceBottomList" :key="item.text" class="service-bottom-item">
					<div class="service-bottom-item-text">
						<p>{{ item.text }}</p>
						<p v-if="isZhLanguage">{{ item.subText }}</p>
					</div>
					<div class="service-bottom-item-time">{{ item.time }}</div>
				</div>
			</div>
		</template>

		<template v-else>
			<div class="service-top-box">
				<div
					v-for="(item, index) in serviceTimeListForVi"
					:key="index"
					class="service-time-item"
				>
					<div class="service-time-item-icon">
						<p>{{item.time}}</p>
						<p>{{item.symbol}}</p>
					</div>
					<div class="service-time-item-text">{{item.text}}</div>
				</div>
			</div>
			<div class="service-desc">
				<div v-for="(item, index) in serviceQualityTopData" :key="index" class="service-desc-item">
					<img :src="require(`../../img/service/desc-icon-${index + 1}.png`)" alt="">
					<div class="service-desc-item-detail">
						<h3>{{ item.titleOne }}</h3>
						<p>{{ item.titleTwo }}</p>
					</div>
				</div>
			</div>
		</template>
  </div>
</template>

<script>
import commonTitle from '../commonTitle/commonTitle.vue'
import { serviceQualityTopData } from 'static_data/service_quality_data'
import {mapGetters, mapState} from "vuex";
export default {
  name: "ServiceQuality",
  components: {
    commonTitle
  },
  data () {
    return {
      serviceQualityTopData,
			serviceBottomList: [
				{ text: this.$t('平均存款时间'), subText: 'AVERAGE TIME OF DEPOSIT', time: '60s' },
				{ text: this.$t('平均取款时间'), subText: 'AVERAGE TIME OF WITHDRAW', time: '10s' },
				{ text: this.$t('客服响应时间'), subText: 'CUSTOMER SERVICE RESPONSE', time: '3s' },
				{ text: this.$t('合作游戏平台'), subText: 'COOPERATIVE GAME PLATFORM', time: '20s' },
			],
			serviceTimeListForVi: [
				{ text: 'Thời gian gửi tiền trung bình', time: '60', symbol: 's' },
				{ text: 'Thời gian rút tiền trung bình', time: '15', symbol: 'm' },
				{ text: 'Thời gian CSKH phản hồi', time: '30', symbol: 's' },
				{ text: 'Hợp tác cùng các nhà cung cấp', time: '20', symbol: 's' },
			]
    };
  },
	computed: {
		...mapGetters('global', ['isViLanguage', 'isZhLanguage']),
		...mapState('global', ['language']),
	}
};
</script>

<style lang="scss" scoped>
@import "./ServiceQuality.scss";
</style>
