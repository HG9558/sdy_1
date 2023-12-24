<template>
  <div class="service">
    <common-title titleTxt="优质服务" subTxt="MGM全心全意为您提供最优质的服务" enTxt="Service Quality"></common-title>
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
      <img class="item-bg" src="../../img/service/time.png" alt="" />
    </div>
  </div>
</template>

<script>
import commonTitle from '../commonTitle/commonTitle.vue'
import { serviceQualityTopData } from 'static_data/service_quality_data'
export default {
  name: "ServiceQuality",
  components: {
    commonTitle
  },
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
