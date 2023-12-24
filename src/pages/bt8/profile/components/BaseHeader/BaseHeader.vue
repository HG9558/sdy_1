<template>
  <div class="content-title">
    <div class="content-title_inner">
      <div @click="$emit('changeUrl')" class="title">
        {{mapList[$route.path].text}}
      </div>
      <img class="en-title" :src="require(`../../img/header/${mapList[$route.path].icon}.png`)" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseHeader",
  data () {
    return {
      mapList: {
        '/profile/vip': { text: '查看VIP详情 >>', icon: 'vip' },
        '/profile/vipinfo': { text: '< VIP详情', icon: 'vip_details', linkurl: 'vipinfo' },
        '/profile/baseInfo': { text: ' 账户安全', icon: 'account' },
        '/profile/coupons': { text: '我的优惠', icon: 'coupons' },
        '/profile/wallet': { text: '我的钱包', icon: 'wallet' },
        '/profile/deposit': { text: '存款', icon: 'deposit' },
        '/profile/withdrawal': { text: '取款', icon: 'withdrawal' },
        '/profile/nationalAgent': { text: '全民代理', icon: 'nationalAgent' },
        '/profile/transaction': { text: '交易记录', icon: 'transaction' },
        '/profile/bettingRecord': { text: '投注记录', icon: 'bettingRecord' },
        '/profile/message': { text: '消息中心', icon: 'message' },
        '/profile/feedback': { text: '意见反馈', icon: 'feedback' },
      }
    }
  }
}
</script>

<style  lang="scss">
.content-title {
  font-size: 16px;
  color: $c-ff4;
  font-weight: 500;
  background: $c-fc;
  padding: 4px 24px 0;
  border-radius: 15px 15px 0 0;
  box-sizing: border-box;
  .content-title_inner {
    border-bottom: 1.2px solid $bg-926;
    cursor: pointer;
    @include flex();
    height: 72px;
    .en-title {
      height: 30px;
    }
    .title {
      color:$c-4d;
      font-weight: 600;
    }
  }
}
</style>