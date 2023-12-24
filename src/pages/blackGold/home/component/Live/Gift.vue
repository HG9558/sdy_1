<template>
  <div class="gift" ref="gift">
    <div class="list">
      <div class="top fxi fspa">
        <p class="fxi mn"><i>账户余额:</i> {{balance}} <img :class="isRefresh&&'a-round'" @click="refresh" src="../../img/refs.png"></p>
        <p class="fxi num">
          <i @click="numb>1?numb--:''">-</i>
          <span class="el-put">
            <el-input v-model="numb" @input="hdinput"></el-input>
          </span>
          <i @click="numb<99999?numb++:''">+</i>
          <i class="btn" @click="send">赠送</i>
          <img @click="$emit('isShowGift')" src="../../img/cls.png">
        </p>
      </div>
      <ul class="item">
        <li v-for="(_i,j) in list" :key="j" :class="idx===j&&'act'" @click="idx=j">
          <div>
              <p class><img :src="_i.giftUrl"></p>
              <i>¥{{(+_i.giftPrice).toFixed(2)}}</i>
          </div>
        </li>
      </ul>
    </div>
    <!-- 余额不足弹窗 -->
    <global-dialog class="glo-dia" :append-to-body='true' :showDialog.sync="showtip" :hasSelfFooter="true" :title="$t('提示')">
      <div class="tip">
        <p class="nr">余额不足，请先充值</p>
        <p class="btn fxi">
            <el-button class="self-footer" type="primary" @click="showtip=false">稍后再说</el-button>
            <el-button class="self-footer" type="primary" @click="$router.push('/profile/deposit')">立即充值</el-button>
        </p>
      </div>
    </global-dialog>
  </div>
</template>

<script>
/* eslint-disable object-curly-newline */
import { mapState, mapActions } from 'vuex'

export default {
  props: ['activeMatchData', 'gitShow'],
  data() {
    return {
      showtip: false,
      showg: false,
      numb: 1,
      length: 0,
      list: [],
      idx: 0,
      ld1: false,
    }
  },
  methods: {
    ...mapActions('pay'),
    // ...mapMutations('tim', ['setGroupModel']),
    send() {
      const item = this.list[this.idx]
      if (this.numb === 0) {
        this.$message('礼物数量至少为1个')
        return
      }
      if (this.numb * item.giftPrice > this.balance) {
        this.showtip = true
        return
      }
      if (this.ld1) return
      this.ld1 = true
      const { loginName, nickName } = this.userInfo
      const { userName,  groupId, roomId } = this.activeMatchData
      const params = {
        ...item,
        ...this.data,
        quantity: this.numb,
        giftId: item.id,
        anchorAccount: userName,
        nickName: nickName,
        playAccount: loginName,
        groupId,
        roomId: Number(roomId || 0)
      }
      this.$http.saveOrUpdateGiftLog(params).then(() => {
        this._getCenterMoney()
        this.showg = 0
        const giftDynamicUrl = item.giftDynamicUrl
        this.$emit('receiveGift', giftDynamicUrl)
        //聊天内容
        const giftMsg = {
          msgContent: `赠送礼物"${item.giftName}" x ${this.numb}`,
          giftDynamicUrl: giftDynamicUrl,
          msg: this.userInfo.loginName,
          from: 'gi_',
          ident: 'gift',
          time: (new Date()).valueOf() / 1000,
        }
        this.$root.$emit('send-gift', JSON.stringify(giftMsg))
        // 变更状态
        setTimeout(() => {
            this.$emit('receiveGift')
            this.$emit('isShowGift')
        }, 2000);
      }).finally(() => { this.ld1 = false })
    },
    refresh() {
      if (this.isRefresh) return
      this._getCenterMoney()
    },
    hdinput(target) {
      this.numb = parseInt(target, 10) || 0
      if (this.numb > 99999) {
        this.$message('超过单次赠送数量上限')
        this.numb = 99999
      }
    },
  },
  created() {
    this.$http.getGiftList().then(({ data: { data } }) => {
      this.list = data.sort((a, b) => a.sort - b.sort)
      this.length = Math.ceil(this.list.length / 8)
    })
  },
  computed: {
    ...mapState('user', ['userInfo']),
    ...mapState({
      userInfo: state => state.user.userInfo,
      balance: state => state.user.centerBalanceMoney,
      isRefresh: state => state.user.isRefresh,
    }),
  },
}
</script>

<style lang="scss">
@import "../../css/Gift.scss";
</style>
