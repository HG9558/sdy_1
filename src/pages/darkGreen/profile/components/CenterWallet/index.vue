<template>
  <div :class="{ 'center-wallet-container': true }">
    <div class="common-container">
      <div class="center-money-container">
        <img class="wallet-img" src="./img/wallet_icon.png" alt="">
        <div class="money-amonut-container">
          <div>{{$t('中心钱包')}}</div>
          <span class="money-num">{{$tt('currencySymbol')}}{{ centerBalanceMoney }}</span>
        </div>
      </div>
      <div class="totoal-money-container">
        <div class="top-container">
          <span> {{$t('钱包金额：')}}</span>
          <span class="money-num">
            {{(totalMoney > 0 && totalMoney.toFixed(2)) || "0.00"}}
          </span>
          <i @click.stop="_updateBalance" :class="`el-icon-${isRefresh ? 'loading': 'refresh'} refresh c-r`"></i>
        </div>
        <div class="bottom-handle">
          <div class="return-btn" @click="_recycling">
            {{$t('一键回收')}}
          </div>
          <div class="line"></div>
          <div class="lock-container">
            <img class="icon_lock" src="./img/wallet_icon_lock.png" alt="">
            <div class="text">
              <div>{{$t('锁定钱包')}}</div>
              <div class="money-num">{{$tt('currencySymbol')}}{{ lockingMoney }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 只有钱包页面进行展示，其他界面不进行展示 -->
    <div class="game-wallet-container" v-if="$route.name === 'wallet'">
      <div class="tip-text">{{$t('进入游戏自动转账，助您省心畅游')}}</div>

      <!-- 上半部分六个展示 -->
      <div class="item-container" v-if="platList.length">
        <div class="item" v-for="(item,index) in platList.slice(0,6)" :key="index">
          <div class="title">
            <span class="deport-name">{{ item.depotName }}</span>
            <i v-if="item.availableWh === 2" class="el-icon-warning warning"></i>
          </div>
            <span class="deport-name-two">{{ item.availableWh === 2 ? $t('维护中') : item.moneyBlance  }}</span>
          <!-- <span class="deport-name-two">{{ item.moneyBlance }}</span> -->
        </div>
      </div>

      <template v-if="platList.slice(6).length">
        <el-collapse class="fold-wrapper" v-model="activeNames" :accordion="true">
          <el-collapse-item name="1">
            <div class="item" v-for="(item,index) in platList.slice(6)" :key="index">
              <div class="title">
                <span class="deport-name">{{ item.depotName }}</span>
                <i v-if="item.availableWh === 2" class="el-icon-warning warning"></i>
              </div>
              <span class="deport-name-two">{{ item.availableWh === 2 ? $t('维护中') : item.moneyBlance  }}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="collapse">
          <div class="collapse-toggle" @click="changeActiveName">
            <img class="show-more-icon" :src="require(`./img/${  this.activeNames === '1' ? 'close' : 'open'}.png`)" />
            <span>{{  this.activeNames === '1' ? $t('收起') : $t('展开') }}</span>
          </div>
        </div>
      </template>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CenterWallet',
  components: {
  },
  props: {
    styleData: Object,
  },
  watch: {
    centerBalanceMoney: {
      immediate: true,
      handler (val) {
        this._updateBalance();
      }
    }
  },
  data () {
    return {
      activeNames: '0',
      platMoney: 0,
      gameData: {}
    }
  },
  methods: {
    _updateBalance () {
      if(this.isRefresh)return
      this._getCenterMoney();
      this._getPlatInfo('update');
    },
    changeActiveName () {
      this.activeNames = this.activeNames == '1' ? '0' : '1'
    },
    //- 回收钱包
    async _recycling () {
      if (this.$route.name === 'wallet') {
        const result = this.platList.some(item => item.moneyBlance >= 1);
        if (!result) return this.messageTip({ message: this.$t('所有平台余额不足以转回中心钱包') });
      }
      const res = await this.$http.getRecover();

      if (res.data.code === 501) {
        this.messageTip({ message: this.$t('查询余额失败') })
      }

      if (res.data.code !== 501 && this.$route.name !== 'wallet') {
        this.messageTip({ message: res.data.msg, type: "success" });
      }

      this._getCenterMoney();
      this.gameData = {};
    },
    //- 获取各个平台信息钱 +  平台名称
    async _getPlatInfo (type) {
      this.$emit('update:showLoding', true)
      const res = await this.$http.getDepotList()
      if (res.data.code) return;

      let reqList = await Promise.allSettled(res.data.tGmDepots.map(item => {
        !this.gameData[item.id] && (this.gameData[item.id] = item);
        return this.$http.getBalanceData({ depotId: item.id })
      }))
      this.$emit('update:showLoding', false)
      reqList = reqList.filter(item => item.status === "fulfilled" && !item.value.data.code).map(item => item.value);

      reqList.forEach(item => {
        this.gameData[item.config.depotId].moneyBlance = item.data.data.balance || 0
      })
      this.gameData = { ...this.gameData }
      this.$emit('update:gameData', this.gameData)
    }
  },
  computed: {
    ...mapState({
      isRefresh: state => state.user.isRefresh,
    }),
    platList () {
      return Object.values(this.gameData);
    },
    totalMoney () {
      return this.platList
        .map(item => { return item.moneyBlance })
        .reduce((pre, next) => pre + next, this.centerBalanceMoney)
    },
    lockingMoney () {
      return this.userInfo.available === 2 ? this.centerBalanceMoney : 0.0;
    },
  }
}
</script>

<style scoped lang="scss">
@import "./css/index.scss";
</style>
<style>
.el-collapse-item__header {
  display: none;
}
</style>
