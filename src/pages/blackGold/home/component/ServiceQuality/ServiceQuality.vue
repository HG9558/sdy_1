<template>
  <div class="service">
   <div class="title-container">
     <div class="service-text">{{$t('优质的服务')}}</div>
     <div class="sub-text">{{$tt('serviceSubText')}}</div>
   </div>
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
        <div class="service-bottom-item-time">{{ item.time }}</div>
        <div class="service-bottom-item-text">
          <p>{{ item.text }}</p>
          <p v-if="isZhLanguage">{{ item.subText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonTitle from '../commonTitle/commonTitle.vue'
import { serviceQualityTopData } from 'static_data/service_quality_data'
import { mapGetters } from "vuex";
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
        { text: this.$t('合作游戏平台'), subText: 'COOPERATIVE GAME PLATFORM', time: '20+' },
      ],
    };
  },
  computed: {
    ...mapGetters('global', ['isZhLanguage']),
  }
};
</script>

<style lang="scss" scoped>
@import "./ServiceQuality.scss";
</style>
