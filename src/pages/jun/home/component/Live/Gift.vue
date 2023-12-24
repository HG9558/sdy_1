<template>
  <div class="gift" ref="gift" v-show="gitShow">
    <div class="list">
      <div class="top fxi fspa">
        <p class="fxi mn"><i>{{$t('账户余额:')}}</i> {{balance}} <img :class="isRefresh&&'a-round'" @click="refresh" src="../../img/refs.png"></p>
        <p class="fxi num">
          <i @click="numb>1?numb--:''">-</i>
          <span class="el-put">
            <el-input v-model="numb" @input="hdinput"></el-input>
          </span>
          <i @click="numb<99999?numb++:''">+</i>
          <i class="btn" @click="send">{{$t('赠送')}}</i>
          <img @click="showg=0" src="../../img/cls.png">
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
    <div class="play fxi"><img v-if="playlist" :src="playlist.giftDynamicUrl"></div>
    <!-- 弹窗 -->
    <global-dialog :showDialog.sync="showtip" :hasSelfFooter="true" :title="$t('提示')">
      <div class="tip">
				<p class="nr">{{$t('余额不足，请先充值')}}</p>
				<p class="btn fxi">
            <el-button class="self-footer" type="primary" @click="showtip=false">{{$t('稍后再说')}}</el-button>
            <el-button class="self-footer" type="primary" @click="$router.push('/profile/deposit')">{{$t('立即充值')}}</el-button>
        </p>
      </div>
    </global-dialog>
    <!-- <div class="cahe"><img v-for="(_,i) in list" :key="i" :src="_.giftDynamicUrl"></div> -->
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
      playlist: [],
      idx: 0,
      ld1: false,
    }
  },
  watch: {
    // playlist(v) {
    //   if (this.trag || v.length === 1) {
    //     this.trag = 0
    //     setTimeout(() => {
    //       v.shift()
    //       this.trag = v.length
    //     }, 2000)
    //   }
    // },
  },
  methods: {
    ...mapActions('pay'),
    // ...mapMutations('tim', ['setGroupModel']),
    send() {
      const item = this.list[this.idx]
      if (this.numb * item.giftPrice > this.balance) {
        this.showtip = true
        return
      }
      if (this.ld1) return
      this.ld1 = true
      const { loginName, nickName } = this.userInfo
      const params = {
        ...item,
        ...this.data,
        quantity: this.numb,
        giftId: item.id,
        anchorAccount: this.activeMatchData.userName,
        nickName: nickName,
        playAccount: loginName,
      }
      this.$http.saveOrUpdateGiftLog(params).then(() => {
        this._getCenterMoney()
        this.showg = 0
        this.playlist = item
        setTimeout(() => {
            this.playlist = ""
            this.$emit('isShowGift')
        }, 1500);
      }).finally(() => { this.ld1 = false })
    },
    // giftmsg({ body }) {
    //   if (body) {
    //     const { giftId, playAccount: msg, giftName, quantity } = JSON.parse(body)
    //     this.playlist.push((this.list.find(_ => _.id === giftId) || {}).giftDynamicUrl)
    //     const gift = { from: 'gi_', msg, msgContent: `赠送礼物“${giftName}” x${quantity}`, iself: this.userInfo.loginName === msg }
    //     // this.setGroupModel({ ...this.groupModel, messageList: [...this.groupModel.messageList, gift] })
    //   }
    // },
    refresh() {
      if (this.isRefresh) return
      this._getCenterMoney()
    },
    hdinput(target) {
      this.numb = parseInt(target, 10) || 0
      if (this.numb > 99999) {
				this.$message(this.$t('超过单次赠送数量上限'))
				this.numb = 99999
      }
    },
  },
  created() {
    // this.data = { ...this.activeMatchData, anchorAccount: this.activeMatchData.userName, nickName: this.activeMatchData.roomName, playAccount: this.userInfo.loginName }
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
