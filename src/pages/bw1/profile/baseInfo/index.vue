<template>
  <div class="personal-data">

    <top-info :finishBase="finishBase" :bindBankCard="bindBankCard"></top-info>

    <div class="data-box data-box1">
      <div class="content-title profile-content-title">
        <div class="content-title_inner">
          <div class="title">
            基本资料
          </div>
          <img class="en-title" :src="require(`../img/header/basicInformation.png`)" alt="">
        </div>
      </div>
      <div class="box-title">
        <base-info v-if="finishBase" :serUrl="serUrl"></base-info>
        <real-info v-else></real-info>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TopInfo from './component/TopInfo.vue';
import BaseInfo from './component/BaseInfo.vue';
import RealInfo from './component/RealInfo.vue'
export default {
  components: {
    TopInfo,
    BaseInfo,
    RealInfo
  },
  computed: {
    ...mapState({
      finishBase () {
        return !!this.userInfo.realName && !!this.userInfo.birthday && !!this.userInfo.gender
      },
      serUrl: state => state.user.serUrl,
      bankcardData: state => state.user.bankcardData,
      bindBankCard () {
        return !!this.bankcardData.rmb.length || !!this.bankcardData.crypto.length
      }
    }),
  },
  methods: {
    ...mapMutations('user', ['set_bank_card_data'])
  }
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
