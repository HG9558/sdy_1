<template>
  <div class="service">
    <TitleSection type="service" />
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
import TitleSection from '../TitleSection'
import { serviceQualityTopData } from 'static_data/service_quality_data'
export default {
  name: "ServiceQuality",
  components: {
    TitleSection,
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
