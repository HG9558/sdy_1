<template>
  <div class="service">
    <img class="top-service" src="../../img/service/top_service.png" alt="">
    <div class="service-top-box">
      <div class="service-items" v-for="(item, index) in serviceQualityTopData" :key="index">
        <div class="left-box">
          <img class="desc-img" :src="require(`../../img/service/${item.imgSrc}`)" alt="" />
          <div class="main">
            {{ item.titleOne }}
            <div class="english">{{ item.english }}</div>
          </div>
        </div>
        <div class="main-two">{{ item.titleTwo }}</div>
      </div>
    </div>
    <div class="service-bottom-box">
      <img class="item-bg" src="../../img/service/time.png" alt="" />
    </div>
  </div>
</template>

<script>
import commonTitle from '../commonTitle/commonTitle.vue'
import { serviceQualityTopData } from 'static_data/service_quality_data'
export default {
  name: "ServiceQuality",
  data () {
    return {
      serviceQualityTopData,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./ServiceQuality.scss";
</style>
