<template>
  <div :class="['content-title',pathText=='/profile/wallet' &&'content-title1',pathText=='/profile/wallet' || pathText=='/profile/vipinfo' || pathText=='/profile/baseInfo'|| pathText=='/profile/withdrawal'?'content-title1':'']">
    <div class="content-title_inner">
      <div @click="$emit('changeUrl')" class="title" :class="{ on: !!mapList[$route.path].linkurl }" v-if="mapList[$route.path].hasSubPage" >
        {{mapList[$route.path].text}}
      </div>
      <img class="en-title" :src="require(`../../img/header/${mapList[$route.path].icon}.png`)" alt="">
    </div>
    
      <el-divider></el-divider>

  </div>
  
</template>

<script>
export default {
  name: "BaseHeader", 
  props: {
    pathText: String,
  },
  data () {
    return {
      mapList: {
        '/profile/vip': { text: 'VIP详情 >', icon: 'vip', hasSubPage: true },
        '/profile/vipinfo': { text: '< VIP尊享', icon: 'vip_details', linkurl: 'vipinfo', hasSubPage: true },
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
  color: darkgoldenrod;
  font-weight: 500;
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
    .title{
      position: absolute;
      right: 20px;
      color:#F3AF8A;
      &.on {
        left: 20px;
      }
    }
  }
  .el-divider{
    margin: 0;
    background-color:  #D5D7E9;
  }
}
.content-title1 {
  background: #eceef8;
  box-shadow: 0px 4px 8px 0px rgba(76, 78, 129, 0.4);
  overflow: hidden;
  &::after{
  content: "";
  display:block;
  clear: both;
  }  
}
</style>