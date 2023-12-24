<template>
  <div class="footer-container">
    <div class="footer_icon_container">
      <img class="" src="./img/top_icon.png" alt="">
    </div>

    <div class="footer_main_container">
      <div class="desc-text-wrapper">
        BET88体育拥有欧洲马耳他博彩管理局（MGA）、英国GC监督委员会（GAMBLING COMMISSION）和菲律宾政府博彩委员会（PAGCO）颁发的合法执照。注册于英属维尔京群岛，是受国际博彩协会认可的合法博彩公司。进行注册并娱乐前，请确保您年满18周岁！
      </div>
      <div class="brand_wrapper">
        <img class="brand-img" :src="require(`./img/logo-${index+1}.png`)" alt="" v-for="(item,index) in 4" :key="index" />
      </div>
    </div>

    <div class="footer_link_box">
      <router-link class="link_item" :to="item.url" tag="div" v-for="item in linkUrlList" :key="item.url"> {{ item.value }} </router-link>
    </div>
    <div class="copyright">版权所有 © 2014-2021 BET88娱乐保留所有权</div>

  </div>
</template>

<script>
import { linkUrlList } from 'static_data/footer_data.js'

export default {
  name: "Footer",
  data () {
    return {
      linkUrlList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
