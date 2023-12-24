<template>
  <div class="dialog-content-container">
    <div class="discount-dialog_content">
      <img class="discount-dialog_content_img" :src="`${detailData.pcLogoUrl}?imageslim`" :alt="$t('图片加载失败')" />

    </div>
    <div class="dialog-content" v-html="detailData.content" @click="jupmUrl()"></div>
    <div v-if="token && btnType" class="discount-dialog_content_btn" :class="{'finished':btnType === $t('已结束')}" @click="btnClick(btnType)">
        <div class="btn-inner">{{btnType}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiscountDetailDialog",
  props: {
    detailData: Object,
    token: String,
  },
  methods: {
    btnClick () {
      if (this.btnType === this.$t('已结束')) {
        this.messageTip({ message: this.$t('活动已结束'), duration: 1000 });
        return
      }
      this.$router.push(`/profile/coupons?id=${this.detailData.id}`);
    }
  },
  computed: {
    btnType () {
      if (this.detailData.tmplCode === "AQ0000025") return "";

      switch (this.detailData.buttonShow) {
        case 0:
          return this.$t('已结束')
        case 1:
        case 2:
          return this.$t('立即领取')
        case 3:
          return this.$t('已领取')
        default:
          return ""
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../css/DiscountDetailDialog.scss";
</style>
