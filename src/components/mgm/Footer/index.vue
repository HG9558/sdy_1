<template>
  <div class="footer-container">

    <div class="footer_icon_container">
      <img class="mr-10" v-for="(item, index) in 19" :key="index" :src="require(`./img/icon_${index+1}.png`)" alt="" />
    </div>

    <div class="footer_main_container">
      <div class="notice-msg">
        <img height="60" src="./img/logo.png" alt="" />
        <div class="desc-text-wrapper">
          <div>{{appTitle}}拥有欧洲马耳他博彩管理局（MGA）、英国GC监督委员会（GAMBLING
            COMMISSION）</div>
          <div>和菲律宾政府博彩委员会（PAGCO）颁发的合法执照。注册于英属维尔京群岛，是受国际博彩协会认可的合法博彩公司。</div>
          <div>进行注册并娱乐前，请确保您年满18周岁！</div>
        </div>
      </div>
      <div class="brand_wrapper">
        <div class="brand_item" v-for="(item,index) in branchList" :key="index">
          <img class="brand-img" :src="require(`./img/branch_${index+1}.png`)" alt="" />
          <div class="msg-box">{{ item }}</div>
        </div>
      </div>
    </div>

    <div class="footer_link_box">
      <router-link class="link_item" :to="item.url" tag="div" v-for="item in linkUrlList" :key="item.url"> {{ item.value }} </router-link>
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
