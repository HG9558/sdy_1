<template>
  <div class="discounts-container">
    <div class="discount-item" v-for="(item, index) in renderList" :key="index">
      <div :class="['discounts-img', item.img_src]" @click="goDiscountPage(item)" ></div>
      <div class="enter-game">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { baseMenuData } from 'static_data/game_data';
export default {
  name: "DiscountsMenu",
  data () {
    return {
      renderList: baseMenuData.discountMenu.list
    }
  },

  methods: {
    ...mapMutations('normal', ['set_discount_type','set_scroll_top']),
    goDiscountPage (item) {
      this.$router.push({name: "discount"});
      this.set_discount_type(item.title)
      this.set_scroll_top(628)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../css/DiscountsMenu.scss";
</style>