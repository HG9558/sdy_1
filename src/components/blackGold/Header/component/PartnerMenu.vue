<template>
  <div class="partner-container">
    <img class="animate__animated animate__fadeInUpBig partner-img" :src="siteImgMap.headerMenuAndroid" alt="">
    <div class="partner-context">
      <div class="partner-title_one">{{$t('是成为传奇？')}}</div>
      <div class="partner-title_two">{{$t('还是成为传奇的歌颂者？')}}</div>
      <div class="notice">
        <div class="btn" v-for="(item,index) in data.btnList" :key="index">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { baseMenuData } from 'static_data/game_data';
import siteImgMap from '@/configs/siteImgMap'

export default {
  name: "PartnerMenu",
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      siteImgMap,
      data: baseMenuData.partnerMenu
    }
  },
  methods: {
    ...mapActions(["enterGame"]),
  },
}
</script>

<style lang="scss" scoped>
@import '../css/PartnerMenu.scss';
</style>
