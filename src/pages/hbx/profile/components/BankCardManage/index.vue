<template>
  <div :class="{'bankcard-manage':true,'wallet':isWallet}">
    <div class="wallet-title">
      <div class="wallet-inner">
        <div class="title">
          我的提现方式
        </div>
        <div class="wallet-num" v-if="isWallet">
          <span>银行卡：{{ bankcardData.rmb.length }}/5</span>
          <span>加密货币钱包：{{ bankcardData.crypto.length }}</span>
          <span>支付宝钱包：{{ bankcardData.alipay.length }}</span>
          <span>其他钱包：{{ bankcardData.otherpay.length }}</span>
        </div>
        <div class="wallet-num" v-else>
          <span v-if="tabActive==='rmb'">银行卡数量：{{ bankcardData.rmb.length }}/5</span>
          <span v-else-if="['crypto', 'otherpay'].includes(tabActive)">钱包数量：{{ bankcardData[tabActive].length }}</span>
          <span v-else>支付宝数量：{{ bankcardData.alipay.length }}</span>
        </div>
      </div>

      <!-- <img class="withdrawal_img" src="./img/withdrawalMethod.png" alt=""> -->
    </div>

    <div class="bank-card-list-container">

      <!-- 支付宝 -->
      <template v-if="tabActive==='alipay' || isWallet">
        <div :key="item.id" @click="selectBankCaxrd(item, index)" class="bank-card-list" v-for="(item, index) in bankcardData['alipay']" >
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select"></div>

            <div class="bank-label">{{ item.bankName }} <span class="bank-tips" v-if="item.available === 3">暂不支持</span></div>

            <!-- 静态展示图片 -->
            <div class="img-wrapper">
              <img class="static-img" src="./img/static_alipay.png" alt="">
              <img class="bank-logo" :src="item.bankLog" alt="">
            </div>

            <div class="bank-card-footer alipay-footer">
              <div class="bank-cardNo">{{ item.cardNo }}</div>
              <div class="bank-unbind" v-if="item.isDraw === 0" @click="openDialog(item, 'alipay')">
                解绑
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="tabActive==='rmb' || isWallet">
        <div :key="item.id || 1" @click="selectBankCard(item, index)" class="bank-card-list" v-for="(item, index) in bankcardData['rmb']" >
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select"></div>

            <div class="bank-label">{{ item.bankName }} <span class="bank-tips" v-if="item.available === 3">暂不支持</span></div>

            <!-- 静态展示图片 -->
            <div class="img-wrapper">
              <img class="static-img" src="./img/static_rmb.png" alt="">
              <img class="bank-logo" :src="item.bankLog" alt="">
            </div>

            <div class="bank-card-footer">
              <div class="bank-cardNo">{{ item.cardNo }}</div>
              <div class="bank-unbind" v-if="item.isDraw === 0" @click="openDialog(item, 'rmb')">
                解绑
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 虚拟币 -->
      <template v-if="tabActive==='crypto' || isWallet">
        <div :key="item.id" @click="selectBankCard(item, index)" class="bank-card-list" v-for="(item, index) in bankcardData['crypto']">
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select" v-if="item.available == 1"></div>
            <div class="bank-label">{{ item.walletName }} <span class="bank-tips" v-if="item.available === 3">暂不支持</span></div>
            <!-- 静态展示图片 -->
            <div class="img-wrapper">
              <img class="static-img" src="./img/static_crypto.png" alt="">
              <img class="bank-logo" :src="item.bankLog" alt="">
            </div>
            <div class="bank-card-footer">
              <div class="bank-cardNo">
                <div> {{ item.walletAddress }} </div>
                <div v-if="item.currencyProtocol && !isWallet">{{ item.currencyProtocol === 'TRC20' ? '波场（TRC20）' : '以太坊（ERC20）' }}</div>
              </div>

              <div v-if="item.isDraw === 0" @click="openDialog(item, 'crypto')" class="bank-unbind">
                解绑
              </div>

              <div class="bank-disabled" v-if="item.available == 0 || item.available == 2">
                该协议已被禁用
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 其他钱包 -->
      <template v-if="tabActive==='otherpay' || isWallet">
        <div :key="item.id" @click="selectBankCard(item, index)" class="bank-card-list" v-for="(item, index) in bankcardData['otherpay']">
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select"></div>

            <div class="bank-label">{{ item.bankName }} <span class="bank-tips" v-if="item.available === 3">暂不支持</span></div>

            <!-- 静态展示图片 -->
            <div class="img-wrapper">
              <img class="static-img" src="./img/static_otherpay.png" alt="">
              <img class="bank-logo" :src="item.bankLog" alt="">
            </div>

            <div class="bank-card-footer alipay-footer">
              <div class="bank-cardNo">{{ item.cardNo }}</div>
              <div class="bank-unbind" v-if="item.isDraw === 0" @click="openDialog(item, 'otherpay')">
                解绑
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 取款 -->
      <template v-if="!isWallet">
        <div @click="addBankCard" class="bank-card-list add-bank-card " v-if="(tabActive === 'rmb' && bankcardData[tabActive].length < 5) || ['crypto', 'alipay', 'otherpay'].includes(tabActive)">
          <div class="no-card">
            <img class="add" src="./img/add.png" alt="">
            <!-- <img class="static-img" :src="require(`./img/${tabActive === 'rmb'?'static_bank_img':tabActive === 'crypto' ? 'static_virtual':'static_alipay'}.png`)" alt=""> -->
            <img class="static-img" :src="require(`./img/static_${tabActive}.png`)" alt="">
            <div class="add-btn">添加新的提款方式</div>
          </div>
        </div>
      </template>

      <!-- 个人钱包 -->
      <template v-else>
        <div @click="addBankCard" class="bank-card-list add-bank-card" v-if="bankcardData.rmb.length < 5 || crFlag || alipayEnable">
          <div class="no-card">
            <img class="add" src="./img/add.png" alt="">
            <img class="static-img" src="./img/static_rmb.png" alt="">
            <div class="add-btn">添加新的提款方式</div>
          </div>
        </div>
      </template>
    </div>

    <global-dialog :showDialog.sync="showDialog" title="新增提现方式" :hasSelfFooter="true" width="600px">
      <AddBankCard :tabActive="tabActive" :showDialog.sync="showDialog" />
    </global-dialog>
  </div>
</template>

<script>
import AddBankCard from "./component/AddBankCard.vue"
import {  mapState, mapActions } from "vuex";

export default {
  name: 'BankcardManage',
  props: {
    tabActive: String,
    bankcardData: Object,
    isWallet: Boolean,
    crFlag: Boolean,
    alipayEnable: Boolean,
  },
  components: {
    AddBankCard
  },
  watch: {
    showDialog () {
      this.$root.$emit('reset-count-time')
    },
    tabActive (currentActive) {
      if (!this.bankcardData[currentActive].length) return
      this.currentId = this.bankcardData[currentActive][0]?.id;
    },
    bankcardData: {
      deep: true,
      immediate: true,
      handler (data) {
        if (Object.values(data).every(arr => !arr.length) || Object.values(data).flat().findIndex(item => item.id === this.currentId) > -1) return
        if (data.rmb.length || data.crypto.length) {
          this.currentId = data.rmb.length ? data.rmb[0].id : data.crypto[0].id
        }
      }
    }
  },
  data () {
    return {
      currentId: null,
      unbindBankVisible: false,
      curBankCard: {},
      showDialog: false
    }
  },
  methods: {
    ...mapActions('user', ["_getBankCardList", '_getCryptoList', '_getAlipayList', '_getOtherPayAccountList' ]),
    selectBankCard (item, index) {
      this.currentId = item.id;
      this.$emit('changeCurrentBank', item)
    },
    openDialog (item, cardType) {
      this.openConfirmDialog({
        content: '确认解绑?',
        closeOnClickModal: false,
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            await this._confirmUnbind(item, cardType)
            done();
            instance.confirmButtonLoading = false;
          } else {
            done();
          }
        }
      })
    },
    //- 解绑银行卡确认事件
    async _confirmUnbind (item, cardType) {
      let requestMethod = this.$http.unbindCardList;
      let requestObj = { bankCardId: item.id };

      if (this.tabActive === 'crypto' || cardType === 'crypto') {
        requestMethod = this.$http.unbindWalletList;
        requestObj = { walletId: item.id }
      }

      try {
        const res = await requestMethod(requestObj)
        if (res.data.code) return this.messageTip({ message: res.data.msg });
        //- 刷新取款卡列表；
        if (this.tabActive === 'crypto' || cardType === 'crypto') {
          this._getCryptoList();
        } else {
          this._getBankCardList();
          this._getAlipayList();
          this._getOtherPayAccountList()
        }
        this.messageTip({ message: '解绑成功' })
      } catch (e) {
        Promise.resolve();
      }
    },
    //- 添加银行卡
    addBankCard () {
      if (!this.userInfo.mobile) {
        this.messageTip({ message: "请先添加手机号" });
        return;
      }
      this.showDialog = true
    }
  },
  computed: {
    ...mapState({
      ebPayWithdrawEnable: state => state.user.ebPayWithdrawEnable,
      toPayWithdrawEnable: state => state.user.toPayWithdrawEnable,
    }),
  },
}
</script>

<style scoped lang="scss">
@import "./css/index.scss";
</style>
