<template>
  <div :class="{ 'center-wallet-container': true, 'has-box-shadow': $route.name !== 'wallet'}" >
    <div class="common-container">
      <div class="center-money-container">
        <img class="wallet-img" src="./img/wallet_icon.png" alt="" />
        <div class="money-amonut-container">
          <div>中心钱包</div>
          <span>￥{{ centerBalanceMoney }}</span>
        </div>
      </div>
      <div class="totoal-money-container">
        <div class="top-container">
          <span> 钱包金额：</span>
          <span class="totoal-money">
            {{ (totalMoney > 0 && totalMoney.toFixed(2)) || "0.00" }}
          </span>
          <i @click.stop="_updateBalance" :class="`el-icon-${isRefresh ? 'loading' : 'refresh'} refresh c-r`"></i>
        </div>
        <div class="bottom-handle">
          <div class="return-btn" @click="_recycling">一键回收</div>
          <div class="line"></div>
          <div class="lock-container">
            <img class="icon_lock" src="./img/wallet_icon_lock.png" alt="" />
            <div class="text">
              <div>锁定钱包</div>
              <div>￥{{ lockingMoney }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 只有钱包页面进行展示，其他界面不进行展示 -->
    <div class="game-wallet-container" v-if="$route.name === 'wallet'">
      <div class="game-z-z">
        <div>
          <button
            class="toggle-money auto"
            @click="setAutoPay"
            :class="{ on: isAutoPay }"
          >
            自动转账
          </button>
        </div>

        <div>
          <button
            class="toggle-money"
            @click="setManuPay"
            :class="{ on: !isAutoPay }"
          >
            手动转账
          </button>
        </div>
        <div class="money" v-show="!isAutoPay">场馆钱包</div>
      </div>

      <!-- 自动转账 -->
      <div v-if="isAutoPay">
        <div class="tip-text">进入游戏自动转账，助您省心畅游</div>

        <!-- 上半部分六个展示 -->

        <div class="item-container" v-if="platList.length">
          <div class="item" v-for="(item, index) in platList.slice(0, 6)" :key="index" >
            <div class="title">
              <span class="deport-name">{{ item.depotName }}</span>
              <i v-if="item.availableWh === 2" class="el-icon-warning warning"></i>
            </div>
            <span class="deport-name-two">{{ item.availableWh === 2 ? "维护中" : item.moneyBlance }}</span>
            <!-- <span class="deport-name-two">{{ item.moneyBlance }}</span> -->
          </div>
        </div>

        <template v-if="platList.slice(6).length">
          <el-collapse class="fold-wrapper" v-model="activeNames" :accordion="true">
            <el-collapse-item name="1">
              <div class="item" v-for="(item, index) in platList.slice(6)" :key="index">
                <div class="title">
                  <span class="deport-name">{{ item.depotName }}</span>
                  <i v-if="item.availableWh === 2" class="el-icon-warning warning"></i>
                </div>
                <span class="deport-name-two">{{ item.availableWh === 2 ? "维护中" : item.moneyBlance}}</span>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div class="collapse">
            <div class="collapse-toggle" @click="changeActiveName">
              <img
                class="show-more-icon" :src=" require(`./img/${this.activeNames === '1' ? 'close' : 'open' }.png`) "/>
              <span>{{ this.activeNames === "1" ? "收起" : "展开" }}</span>
            </div>
          </div>
        </template>
      </div>

      <!-- 手动转账 -->
      <div v-else>
        <div class="game-sport" v-for="(item, index) in platList" :key="index">
          <div class="game-11">
            <el-tooltip class="game-sport-one-tooltip" :content="item.depotName" placement="top">
              <div class="game-sport-one">{{ item.depotName }}</div>
            </el-tooltip>
            <div>
              <i v-if="item.availableWh === 2" class="el-icon-warning warning"></i>
              {{ item.availableWh === 2 ? "维护中" : item.moneyBlance }} </div>
          </div>
          <div class="game-transfers" v-show="item.availableWh !== 2">
            <div class="transfer-on" @click="toggleIn(item.depotName, item.id, centerBalanceMoney)">转入</div>
            <div class="transfer-out" @click="toggleOut(item.depotName, item.id, item.moneyBlance)">转出</div>
          </div>
        </div>
      </div>
      <!-- 弹窗 -->
    <global-dialog :showDialog.sync="showDialog" :title="dialogData.dialogTitle" :hasSelfFooter="true" v-if="showDialog">
      <!-- <img class="prompt" src="./img/prompt.svg" alt=""> -->
      <component :is="dialogData.componentName" :showDialog.sync="showDialog" 
      :dialogData="dialogData" @dialog-event="dialogEvent"></component>
    </global-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import BaseInfoDialog from './components/BaseInfoDialog.vue'
import TransferPlatformDialog from './components/TransferPlatformDialog.vue'

export default {
  name: "CenterWallet",
  components: {
    BaseInfoDialog,
    TransferPlatformDialog
  },
  props: {
    styleData: Object,
  },
  watch: {
    centerBalanceMoney: {
      immediate: true,
      handler() {
        this._updateBalance();
      },
    },
  },
  data() {
    return {
      activeNames: "0",
      platMoney: 0,
      gameData: {},
      isAutoPay: true,
      showDialog: false,
      dialogData: {
        dialogTitle: "",
        dialogContent: "",
        componentName: "",
        checkText: "",
        type: '',
        depotId: '',
        loading: false,
      },
      curDepotId: null
    };
  },
  created () {
    this.isAutoPay = !!this.userInfo.freeWalletSwitch
  },
  methods: {
    ...mapMutations('user', ['set_user_info']),
    async _updateBalance() {
      if (this.isRefresh) return;
      this._getCenterMoney(); //- 中心钱包获取
      if (this.curDepotId) {
        const res = await this.$http.getBalanceData({ depotId: this.curDepotId })
        this.gameData[this.curDepotId].moneyBlance = res.data.data.balance || 0
        this.$set(this.dialogData, 'loading', false)
        this.showDialog = false
        return
      }
      this._getPlatInfo("update");
    },
    changeActiveName() {
      this.activeNames = this.activeNames == "1" ? "0" : "1";
    },
    //- 回收钱包
    async _recycling() {
      if (this.$route.name === "wallet") {
        const result = this.platList.some((item) => item.moneyBlance >= 1);
        if (!result) return this.messageTip({ message: "所有平台余额不足以转回中心钱包" });
      }
      const res = await this.$http.getRecover();

      if (res.data.code === 501) {
        this.messageTip({ message: "查询余额失败" });
      }

      if (res.data.code !== 501 && this.$route.name !== "wallet") {
        this.messageTip({ message: res.data.msg, type: "success" });
      }
      this._getCenterMoney();
      this.gameData = {};
    },
    //- 获取各个平台信息钱 +  平台名称
    async _getPlatInfo(type) {
      type !== 'update' && this.$emit("update:showLoding", true);
      const res = await this.$http.getDepotList()
      if (res.data.code) return;

      let reqList = await Promise.allSettled(res.data.tGmDepots.map((item) => {
          !this.gameData[item.id] && (this.gameData[item.id] = item);
          return this.$http.getBalanceData({ depotId: item.id });
        })
      );
      this.$emit("update:showLoding", false);
      reqList = reqList.filter((item) => item.status === "fulfilled" && !item.value.data.code).map((item) => item.value);

      reqList.forEach((item) => {
        this.gameData[item.config.depotId].moneyBlance =
          item.data.data.balance || 0;
      });
      this.gameData = { ...this.gameData };
      this.$emit("update:gameData", this.gameData);
    },
    async getDepotList () {
      const params = {
        terminal: 0,
        flag: this.userInfo.freeWalletSwitch
      }
      return await this.$http.getDepotList(params);
    },
    setAutoPay () {
      if (this.isAutoPay) return
      this.curDepotId = null
      this.isAutoPay = true
      this.setFreeWalletSwitch(1)
      this.setUserInfo(1)
      this._getPlatInfo()
    },
    setManuPay () {
      if (!this.isAutoPay) return
      this.curDepotId = null
      this.setDialog({
        dialogTitle: '温馨提示',
        dialogContent: '关闭自动免转后,您将需要手动操作各个游戏钱包的金额,确定关闭自动免转?',
        componentName: 'BaseInfoDialog',
      })
    },
    async setFreeWalletSwitch (val) {
      this.gameData = {}
      const params = {
        status: val
      }
      await this.$http.setFreeWalletSwitch(params)
    },
    setUserInfo (val) {
      this.set_user_info({
        ...this.userInfo,
        freeWalletSwitch: val,
      })
    },
    setDialog (dialogData) {
      this.$nextTick(() => {
        this.showDialog = true
        this.dialogData = dialogData
      })
    },
    dialogEvent (data) {
      this.showDialog = false
      const { type, sumbit } = data || {}
      if (type === 'base') {
        if (!sumbit) return
        this.isAutoPay = false
        this.setFreeWalletSwitch(0)
        this.setUserInfo(0)
        this._getPlatInfo()
        return
      }
      this._updateBalance()
    },
    toggleIn (depotName, id, money) {
      this.curDepotId = id
      this.setDialog({
        dialogTitle: `中心钱包到${depotName}`,
        dialogContent: money,
        componentName: 'TransferPlatformDialog',
        checkText: '中心钱包余额不足,请先充值',
        type: 'in',
        depotId: id
      })
    },
    toggleOut (depotName, id, money) {
      this.curDepotId = id
      this.setDialog({
        dialogTitle: `${depotName}到中心钱包`,
        dialogContent: money,
        componentName: 'TransferPlatformDialog',
        checkText: '金额超过场馆金额',
        type: 'out',
        depotId: id
      })
    },
    openDialog ({ componentName, dialogTitle }) {
      this.dialogTitle = dialogTitle
      this.componentName = componentName
      this.showDialog = true
    },
  },
  computed: {
    ...mapState({
      isRefresh: (state) => state.user.isRefresh,
    }),
    platList() {
      return Object.values(this.gameData);
    },
    totalMoney() {
      return this.platList
        .map((item) => { return item.moneyBlance })
        .reduce((pre, next) => pre + next, this.centerBalanceMoney);
    },
    lockingMoney() {
      return this.userInfo.available === 2 ? this.centerBalanceMoney : 0.0;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./css/index.scss";
</style>
<style>
.el-collapse-item__header {
  display: none;
}
/* img.prompt {
    position: absolute;
    top: 10px;
    right: 175px;
    height: 26px;
} */
</style>