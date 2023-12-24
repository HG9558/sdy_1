<template>
  <div class="partner-container">
    <img class="animate__animated animate__fadeInUpBig partner-img" :src="require(`../img/menu/${data.leftImgLink}.png`)" alt="">
    <div class="partner-context">
      <div class="partner-title_one">是成为传奇？</div>
      <div class="partner-title_two">还是成为传奇的歌颂者？</div>
      <div class="notice">
        <div class="btn" v-for="(item,index) in data.btnList" :key="index">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { baseMenuData } from 'static_data/game_data';
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
      data: baseMenuData.partnerMenu
    }
  },
  methods: {
    ...mapActions(["enterGame"]),
  },
}
</script>

<style lang="scss" scoped>
.partner-container {
  height: 100%;
  @include flex();
  color: $c-3;
  font-size: 16px;
  padding-left: 30px;
  .partner-img {
    width: 239px;
    margin-top: 48px;
  }
  .partner-context {
    margin-left: 63px;
    .partner-title_one {
      font-size: 28px;
      color: $c-69;
    }
    .partner-title_two {
      font-size: 20px;
      color: $c-69;
      margin: 10px 0 32px;
    }
    .notice {
      @include flex();
      .btn {
        width: 140px;
        height: 36px;
        background: #D5D7E9;
        color: $c-3B;
        font-size:16px;
        border-radius: 34px;
        text-align: center;
        line-height: 36px;
        margin-right:80px;
      }
    }
  }
}
</style>