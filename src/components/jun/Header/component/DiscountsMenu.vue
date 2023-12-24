<template>
  <div class="discounts-container">
<!--    <img @click="goDiscountPage(item)" v-for="(item, index) in renderList" :key="index" class="discounts-item" :src="getImg(item)" alt="">-->
    <div @click="goDiscountPage(item)" v-for="(item, index) in renderList" :key="index" class="discounts-item">
      <img :src="require(`../img/menu/discountMenu/${item.img_src}.png`)" alt="">
      <span>{{item.text}}</span>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex";
import { baseMenuData } from 'static_data/game_data';

export default {
  name: "DiscountsMenu",
  data () {
    return {
      renderList: baseMenuData.discountMenu.list
    }
  },
  computed: {
    ...mapGetters('global', ['isZhLanguage']),
  },
  methods: {
    ...mapMutations('normal', ['set_discount_type','set_scroll_top']),
    goDiscountPage (item) {
      this.$router.push({name: "discount"});
      this.set_discount_type(item.title)
      this.set_scroll_top(628)
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../css/DiscountsMenu.scss";
</style>
