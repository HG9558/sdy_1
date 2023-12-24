<template>
  <div class="content-title">
    <div class="content-title_inner">
      <div
        @click="$emit('changeUrl')"
        class="title"
        :class="{ on: !!mapList[$route.path].linkurl }"
        v-if="mapList[$route.path].hasSubPage"
      >
        {{ mapList[$route.path].text }}
      </div>
      <img class="en-title" :src="require(`../../img/header/${mapList[$route.path].icon}.png`)" alt="" />
    </div>

    <el-divider></el-divider>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const isViLanguage = process.env.VUE_APP_LANGUAGE === 'vi'

export default {
  name: "BaseHeader",
  computed: {
    ...mapGetters('global', ['isViLanguage']),
  },
  data() {
    return {
      mapList: {
        '/profile/vip': { text: this.$t('VIP详情 >'), icon: isViLanguage ? 'vi/vip' : 'vip', hasSubPage: true },
        '/profile/vipinfo': { text: this.$t('< VIP尊享'), icon: isViLanguage ? 'vi/vip_details' : 'vip_details', linkurl: 'vipinfo', hasSubPage: true },
        '/profile/baseInfo': { text: this.$t('账户安全'), icon: 'account' },
        '/profile/coupons': { text: this.$t('我的优惠'), icon: 'coupons' },
        '/profile/recommended': { text: this.$t('好友推荐'), icon: 'recommended' },
        '/profile/wallet': { text: this.$t('我的钱包'), icon: 'wallet' },
        '/profile/deposit': { text: this.$t('存款'), icon: 'deposit' },
        '/profile/withdrawal': { text: this.$t('取款'), icon: 'withdrawal' },
        '/profile/nationalAgent': { text: this.$t('全民代理'), icon: 'nationalAgent' },
        '/profile/transaction': { text: this.$t('交易记录'), icon: 'transaction' },
        '/profile/bettingRecord': { text: this.$t('投注记录'), icon: 'bettingRecord' },
        '/profile/message': { text: this.$t('消息中心'), icon: 'message' },
        '/profile/feedback': { text: this.$t('意见反馈'), icon: 'feedback' },
      }
    }
  }
}
</script>

<style  lang="scss">
.content-title {
  font-size: 16px;
  color: darkgoldenrod;
  font-weight: 500;
  background-color: #fcf9f7;
  padding: 4px 24px 0;
  border-radius: 15px 15px 0 0;
  box-sizing: border-box;
  position: relative;
  .content-title_inner {
    cursor: pointer;
    @include flex(center);
    height: 72px;
    .en-title {
      height: 48px;
    }
    .title {
      position: absolute;
      right: 20px;
      color: darkgoldenrod;
      &.on {
        left: 20px;
      }
    }
  }
  .el-divider {
    margin: 0;
    background-color: #deccba;
  }
}
</style>
