<template>
  <div class="banner-box-bog">
    <img class="banner-box_loading_img" v-if="!bannerList.length" src="../../img/default_banner.png" alt="">
    <el-carousel arrow="never" v-else>
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <img @click="goDetailPage(item)" :src="item.picPcPath" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Banner',
  props: {
    bannerList: Array
  },
  methods: {
    ...mapMutations('normal', ['set_link_data']),
    goDetailPage (item) {
      if (item.picTarget === 2) return
      // picTarget 2 不跳转 1 外链 0 优惠详情 activityId 这个是否为null来判断 是否跳转详情，不为null跳转优惠分类
      if (item.picTarget === 1) {
        window.open(item.outStation)
      } else {
        this.$router.push('/discount')
        if (!item.activityId) {
          this.set_link_data({ bannerLink: true })
        } else {
          this.set_link_data({ bannerLink: true, id: item.actId, activityId: item.activityId })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./Banner.scss";
</style>
