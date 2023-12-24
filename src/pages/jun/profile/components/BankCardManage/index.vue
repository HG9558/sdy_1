<template>
  <div :class="{'bankcard-manage':true,'wallet':isWallet}">
    <div class="bank-card-list-container">

      <template v-if="tabActive==='rmb' || isWallet">
        <div :key="item.id" @click="selectBankCard(item, index)" class="bank-card-list" v-for="(item, index) in bankcardData['rmb']">
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select"></div>

            <div class="bank-label">{{ item.bankName }} <span class="bank-tips" v-if="item.available === 3">{{$t('暂不支持')}}</span></div>
            <!-- 静态展示图片 -->
            <div class="img-wrapper">
              <img class="static-img" src="./img/static_bank_img.png" alt="">
              <img class="bank-logo" :src="item.bankLog" alt="">
            </div>

            <div class="bank-card-footer">
              <div class="bank-cardNo">{{ item.cardNo }}</div>
              <el-button class="bog bank-unbind" v-if="item.isDraw === 0" @click="openDialog(item, 'rmb')">
								{{$t('解绑')}}
							</el-button>
            </div>
          </div>
        </div>
      </template>

      <!-- 虚拟币 -->
      <template v-if="tabActive==='crypto' || isWallet">
        <div :key="item.id" @click="selectBankCard(item, index)" class="bank-card-list" v-for="(item, index) in bankcardData['crypto']">
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select" v-if="item.available == 1"></div>
            <div class="bank-label">{{ item.walletName }} <span class="bank-tips" v-if="item.available === 3">{{$t('暂不支持')}}</span></div>

            <!-- 静态展示图片 -->
            <div class="img-wrapper crypto">
              <img class="static-img virtual-bg" src="./img/static_virtual.png" alt="">
              <img class="bank-logo" :src="item.bankLog" alt="">
            </div>

            <div class="bank-card-footer">
              <div class="bank-cardNo crypto">
                {{ item.walletAddress }}
                <div v-if="item.currencyProtocol && !isWallet">{{ item.currencyProtocol === 'TRC20' ? $t('波场（TRC20）') : $t('以太坊（ERC20）') }}</div>
              </div>
              <el-button v-if="item.isDraw === 0" @click="openDialog(item, 'crypto')" class="bog bank-unbind">
								{{$t('解绑')}}
							</el-button>

              <div class="bank-disabled" v-if="item.available == 0 || item.available == 2">
                {{$t('该协议已被禁用')}}
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 电子钱包 -->
      <template v-if="tabActive==='elec' || isWallet">
        <div :key="item.id" @click="selectBankCard(item, index)" class="bank-card-list" v-for="(item, index) in bankcardData['elec']" >
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select"></div>

            <div class="bank-label">{{ item.bankName }} <span class="bank-tips" v-if="item.available === 3">{{$t('暂不支持')}}</span></div>

            <!-- 静态展示图片 -->
            <div class="img-wrapper">
              <img class="static-img" src="./img/static_virtual.png" alt="">
              <img class="bank-logo" :src="item.bankLog" alt="">
            </div>

            <div class="bank-card-footer alipay-footer">
              <div class="bank-cardNo">{{ item.cardNo }}</div>
              <div class="bank-unbind" v-if="item.isDraw === 0" @click="openDialog(item, 'elec')">
                {{$t('解绑')}}
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 支付宝 -->
      <template v-if="tabActive==='alipay' || isWallet">
        <div :key="item.id" @click="selectBankCard(item, index)" class="bank-card-list" v-for="(item, index) in bankcardData['alipay']">
          <div class="bank-card-inner">
            <div :class="{ on: currentId === item.id }" class="bank-select"></div>

            <div class="bank-label">{{ item.bankName }} <span class="bank-tips" v-if="item.available === 3">{{$t('暂不支持')}}</span></div>
            <!-- 静态展示图片 -->
            <div class="img-wrapper">
              <img class="static-img" src="./img/static_alipay.png" alt="">
              <img class="bank-logo" :src="item.bankLog" alt="">
            </div>

            <div class="bank-card-footer alipay-footer">
              <div class="bank-cardNo">{{ item.cardNo }}</div>
              <el-button class="bog bank-unbind" v-if="item.isDraw === 0" @click="openDialog(item, 'alipay')">
                {{$t('解绑')}}
              </el-button>
            </div>
          </div>
        </div>
      </template>

      <!-- 取款 -->
      <template v-if="!isWallet">
        <div @click="addBankCard" class="bank-card-list add-bank-card " v-if="(tabActive === 'rmb' && bankcardData[tabActive].length < 5) || (tabActive === 'crypto') || (tabActive === 'alipay') || (tabActive === 'elec')">
          <div class="bank-card-inner ">
            <div class="no-card">
              <img class="static-img" :src="require(`./img/${tabActive === 'rmb'?'static_bank_img':(tabActive === 'crypto'||tabActive === 'elec') ? 'static_virtual':'static_alipay'}.png`)" alt="">
              <img class="add-bank-card" src="./img/add_bank.png" alt="">
            </div>
            <el-button class="bog add-bank-button">
              {{ tabActive === 'rmb'? $t('添加新的银行卡') : tabActive === 'crypto' ? $t('添加新的钱包') : tabActive === 'alipay' ? $t('添加新的支付宝') : $t('添加新的电子钱包') }}
            </el-button>
          </div>
        </div>
      </template>

      <!-- 个人钱包 -->
      <template v-else>
        <div @click="addBankCard" class="bank-card-list add-bank-card" v-if="bankcardData.rmb.length < 5 || crFlag || alipayEnable">
          <div class="bank-card-inner">
            <div class="no-card">
              <img class="static-img" src="./img/static_bank_img.png" alt="">
              <img class="add-bank-card" src="./img/add_bank.png" alt="">
            </div>
            <el-button class="bog add-bank-button">{{$t('添加新的提现方式')}}</el-button>
          </div>
        </div>
      </template>
    </div>

    <global-dialog :showDialog.sync="showDialog" :title="$t('新增提现方式')" :hasSelfFooter="true" width="800px">
      <AddBankCard :tabActive="tabActive" :showDialog.sync="showDialog" />
    </global-dialog>
  </div>
</template>

<script>
import AddBankCard from "./component/AddBankCard.vue"
import {  mapActions, mapState } from "vuex";
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
      this.currentId = this.bankcardData[currentActive][0].id;
    },
    bankcardData: {
      deep: true,
      immediate: true,
      handler (data) {
        if (Object.values(data).every(arr => !arr.length) || Object.values(data).flat().findIndex(item => item.id === this.currentId) > -1) return
        this.currentId = data.rmb.length ? data.rmb[0].id : data.crypto[0].id
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
  computed: {
    ...mapState('global', ['isNeedVfySms', 'isNeedVfyEMail']),
  },
  methods: {
    ...mapActions('user', ["_getBankCardList", '_getCryptoList', '_getAlipayList', '_getElecList']),
    selectBankCard (item, index) {
      this.currentId = item.id;
      this.$emit('changeCurrentBank', item)
    },
    openDialog (item, cardType) {
      this.openConfirmDialog({
        content: this.$t('确认解绑'),
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
          this._getElecList();
        }
        this.messageTip({ message: this.$t('解绑成功') })
      } catch (e) {
        Promise.resolve();
      }
    },
    //- 添加银行卡
    addBankCard () {
      if (!this.userInfo.mobile && this.isNeedVfySms) {
        this.messageTip({ message: this.$t('请先添加手机号') });
        return;
      }
			if (!this.userInfo.email && this.isNeedVfyEMail) {
				this.messageTip({ message: this.$t('请先添加邮箱') });
				return;
			}
      this.showDialog = true
    }
  }
}
</script>

<style scoped lang="scss">
@import "./css/index.scss";
</style>
