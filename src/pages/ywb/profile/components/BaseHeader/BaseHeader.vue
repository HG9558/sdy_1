<template>
  <div :class="['content-title',pathText=='/profile/wallet' &&'content-title1',pathText=='/profile/wallet' || pathText=='/profile/vipinfo' || pathText=='/profile/baseInfo'|| pathText=='/profile/withdrawal'?'content-title1':'']">
    <div class="content-title_inner">
      <div @click="$emit('changeUrl')" class="title" :class="{ on: !!mapList[$route.path].linkurl }" v-if="mapList[$route.path].hasSubPage" >
        {{ mapList[$route.path].subText }}
      </div>
			<div :class="['en-title', mapList[$route.path].icon]">
				<div class="en-title-content">
					<i></i>
					<span>{{mapList[$route.path].text}}</span>
					<i></i>
				</div>
			</div>
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
        '/profile/vip': { text: this.$t('VIP尊享'), icon: 'vip', hasSubPage: true, subText: this.$t('VIP详情 >') },
        '/profile/vipinfo': { text: this.$t('VIP详情'), icon: 'vip_details', linkurl: 'vipinfo', hasSubPage: true, subText: this.$t('< VIP尊享') },
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
  padding: 4px 24px 0;
  border-radius: 15px 15px 0 0;
  box-sizing: border-box;
  position: relative;
  .content-title_inner {
    cursor: pointer;
    @include flex(center);
    height: 72px;
    .en-title {
        width: 100%;
        height: 42px;
        display: flex;
        justify-content: center;
        &.account {
            width: 447px;
            background: url("../../img/header/account.png") no-repeat center center;
            background-size: contain;
        }
        &.vip {
            width: 323px;
            background: url("../../img/header/vip.png") no-repeat center center;
            background-size: contain;
        }
        &.vip_details {
            width: 264px;
            background: url("../../img/header/vip_details.png") no-repeat center center;
            background-size: contain;
        }
        &.coupons {
            width: 237px;
            background: url("../../img/header/coupons.png") no-repeat center center;
            background-size: contain;
        }
        &.recommended {
            width: 507px;
            background: url("../../img/header/recommended.png") no-repeat center center;
            background-size: contain;
        }
        &.wallet {
            width: 253px;
            background: url("../../img/header/wallet.png") no-repeat center center;
            background-size: contain;
        }
        &.deposit {
            width: 236px;
            background: url("../../img/header/deposit.png") no-repeat center center;
            background-size: contain;
        }
        &.withdrawal {
            width: 292px;
            background: url("../../img/header/withdrawal.png") no-repeat center center;
            background-size: contain;
        }
        &.nationalAgent {
            width: 370px;
            background: url("../../img/header/nationalAgent.png") no-repeat center center;
            background-size: contain;
        }
        &.transaction {
            width: 507px;
            background: url("../../img/header/transaction.png") no-repeat center center;
            background-size: contain;
        }
        &.bettingRecord {
            width: 385px;
            background: url("../../img/header/bettingRecord.png") no-repeat center center;
            background-size: contain;
        }
        &.message {
            width: 400px;
            background: url("../../img/header/message.png") no-repeat center center;
            background-size: contain;
        }
        &.feedback {
            width: 246px;
            background: url("../../img/header/feedback.png") no-repeat center center;
            background-size: contain;
        }
        .en-title-content {
            position: absolute;
            bottom: 5px;
            display: flex;
            align-items: center;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 42px;
            text-align: center;
            text-transform: capitalize;
            background: linear-gradient(180deg, #FBBB98 0%, #E1956E 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            span {
                margin: 0 10px;
            }
            i {
                display: block;
                transform: translateY(-50%);
                width: 100px;
                height: 2px;
                background: linear-gradient(90deg, rgba(255, 218, 198, 0.02) 0%, #E4976F 96.98%);
                &:first-child {
                    left: -60%;
                }
                &:last-child {
                    right: -60%;
                    transform: matrix(-1, 0, 0, 1, 0, 0);
                }
            }

        }
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
