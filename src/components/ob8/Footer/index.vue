<template>
  <div class="footer">
    <div class="footer-container">

      <div class="footer_icon_container">
        <img class="mr-5" v-for="(item, index) in 12" :key="index" :src="require(`./img/icon_${index+1}.png`)" alt="" />
      </div>

      <div class="footer_main_container">
        <div class="notice-msg">
          <div class="desc-text-wrapper">
            <div>欧博体育拥有欧洲马耳他博彩管理局（MGA）、英国GC监督委员会（Gambling Commission） 和菲律宾政府博彩委员会（PAGCOR）颁发的合法执照。 注册于<br/>英属维尔京群岛，是受国际博彩协会认可的合法博彩公司。 进行注册并娱乐前，请确保您年满18周岁！</div>
          </div>
        </div>

         <div class="brand_wrapper">
            <img class= "brand-img" src="./img/branch-qieerxi.png" alt="">
            <img class= "brand-img" src="./img/brand-pagcor.png" alt="">
            <img class= "brand-img" src="./img/brand-ISLE.png" alt="">
            <img class= "brand-img" src="./img/brand-mga.png" alt="">
        </div>
      </div>

      <div class="footer_link_box">
        <router-link class="link_item" :to="item.url" tag="div" v-for="item in linkUrlList" :key="item.url"> {{ item.value }} </router-link>
      </div>

      <div class="make-a-record">版权所有 © 2014-2021 欧博体育保留所有权</div>

    </div>
  </div>
</template>

<script>
import { linkUrlList, branchList } from 'static_data/footer_data.js'
const { VUE_APP_APP_TITLE } = process.env;

export default {
  name: "Footer",
  data () {
    return {
      linkUrlList,
      branchList,
      appTitle: VUE_APP_APP_TITLE,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
