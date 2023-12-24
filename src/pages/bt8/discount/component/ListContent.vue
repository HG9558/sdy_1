<template>
  <div class="discount-main ">
    <div class="discount-item-box animate__animated  animate__fadeInRight " v-for="item in list" :key="item.id" @click="openDetail(item)" :class=" { 'out-date':(new Date(item.useEnd.split(' ')[0]) - Date.now()) <= 0}">
      <img class="discount-item-img" :src="item.pcLogoUrl + '?imageslim'" alt="" />
      <img v-if="item.labelId" class="mark" :src="require(`../img/mark_${item.labelId}.png`)" alt="">
      <div class="notice-mark">
        <!-- <img class="watch" src="../img/watch.png" alt="" /> -->
        {{item | formatDiscountTime}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListContent",
  props: {
    list: Array,
  },
  data () {
    return {
      val: 1
    }
  },
  methods: {
    openDetail (item) {
      this.$emit('openDetail', item)
    }
  },
}
</script>

<style scoped lang="scss">
@import "../css/ListContent.scss";
</style>