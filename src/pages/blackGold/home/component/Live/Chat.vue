<template>
  <div class="chat-container">
    <div class="msg-list" ref="messageBox"  v-show="isShowChat">
      <div class="message-list">
        <div v-for="message in messageList" :key="message.ID" class="message-item">
          <div class="message-item-detail">
            <template v-if="message['type']">
              <i v-if="message.ident === 'anchor'" class="message-anchor" />
               <i v-else class="message-vip">
                <span> {{JSON.parse(message.payload.extension || 0)['vip']}} </span>
              </i>
              <span :class="{'message-name__anchor': message.flow==='anchor','message-name__self':message.flow==='out'}" class="message-name">
                {{ (message.nick || message.from) + ":" }}
              </span>

              <span :class="{ text__anchor: message.ident === 'anchor' }" class="message-text">
                <TextElement :message="message" @sendGift="sendGift"/>
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="send-box">
<!--      <div class="gift-img" @click="changeGiftShow" v-show="isShowGift">-->
<!--        <img src="../../img/gift.png" alt="">-->
<!--      </div>-->
      <div class="send-box-main">
        <div class="emoji-input">
          <el-input  required="required" onkeyup="this.value=this.value.replace(/[, ]/g,'')"
            @keydown.native.enter="sendMessage"  rows="1"  resize="none" class="message-input_field" v-model="messageModel" :placeholder="!match ? $t('请选择直播房间～') : $t('我也来说两句')" @focus="onFocusin" :disabled="!match" />
        </div>
        <div class="emoji-box">
          <el-popover v-model="showPopover" trigger="click" placement="top-start" class="emojis-popover">
            <div class="emojis">
              <div class="emoji-row">
                <div v-for="(item, index) in emojiName" :key="index" span="3" class="emoji" @click="messageModel += item">
                  <img :src="emojiUrl + emojiMap[item]" />
                </div>
              </div>
            </div>
            <div slot="reference" class="emoji-btn"></div>
          </el-popover>
        </div>
      </div>

      <div class="send-btn" :class="{ active: messageModel.trim().length }" @click="sendMessage">
      </div>
    </div>
  </div>
</template>

<script>
import { emojiMap, emojiName, emojiUrl } from '@/utils/emojiMap'
import crypto from '@/utils/crypto'
import { decodeText } from '@/utils/decodeText'
import { mapState } from 'vuex'
import TextElement from "./TextElement";
import TIMInit from '@/mixins/TIMInit.js';

export default {
  name: 'Chat',
  inject: ['liveData'],
  components: {
    TextElement,
  },
  mixins: [TIMInit],
  props: {
    isShowChat: {
      default: true,
    },
    isShowGift: {
      default: false,
    }
  },
  data () {
    return {
      messageList: [],
      emojiName,
      emojiUrl,
      emojiMap,
      messageModel: '',
      showPopover: false,
      onlineNum: 0,
      timer: null,
      isJoin: false,
      joinError: false,
      intervalId: null,
      isGiftMsg: false
    }
  },
  mounted () {
    this.$root.$on('send-gift', (giftMsg) => {
      this.messageModel = giftMsg
      this.sendMessage(giftMsg)
    })
  },
  computed: {
    ...mapState({
      timCreateSuccess: state => state.normal.timCreateSuccess,
      isLogin: state => state.user.token,
    }),
    match () {
      return this.liveData.activeMatchData
    },
    contentList () {
      return decodeText(this.message)
    },
  },
  watch: {
    match: {
      handler (val) {
        if (val && this.userInfo.loginName) {
          this.messageList = []
          this._checkGroup(val.groupId);
        }
      },
      immediate: true,
    },
    timCreateSuccess: {
      handler () {
        this.$tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
    if (this.match) this.$tim.off(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
  },
  methods: {
    //- 检测用户群组
    async _checkGroup (groupId) {
      const res = await this.$http.checkGroup({ groupId })
      if (res.data.code) return
      this.joinGroup()
      this.setTimer()
    },
    onReceiveMessage ({ data: messageList }) {
      const { MSG_TEXT, MSG_CUSTOM } = this.$TIM.TYPES
      messageList = messageList.filter(item => (item.type === MSG_TEXT || item.type === MSG_CUSTOM))
      this.messageList = Array.isArray(messageList) ? [...this.messageList, ...messageList] : [...this.messageList, messageList]
      this.initScroll()
    },
    messageListTotal (data) {
      const compare = function compare(obj1, obj2) {
        let val1 = obj1.time || obj1.msgTime || (Date.parse(obj1.createTime || '1990-01-06 00:00:00') / 1000 - 60 * 60 * 8)
        let val2 = obj2.time || obj2.msgTime || (Date.parse(obj2.createTime || '1990-01-06 00:00:00') / 1000 - 60 * 60 * 8)
        if (val1 < val2) {
          return -1
        }
        if (val1 > val2) {
          return 1
        }
        return 0
      }
      const result = []
      const arr = [...data, ...this.messageList]
      arr.sort(compare).forEach((item) => {
        if (item.indent !== 'join') {
          result.push(item)
        }
      })
      this.messageList = arr;

      this.initScroll()
    },
    initScroll(){
      this.$nextTick(() => {
        this.$refs.messageBox.scrollTop = this.$refs.messageBox.scrollHeight
      })
    },
    joinGroup () {
      this.isJoin = false
      this.joinError = false
      const tim = this.$tim
      const TIM = this.$TIM
      const groupID = this.match.groupId
      // 匿名用户加入（无需登录，入群后仅能接收消息）
      const promise = tim.joinGroup({ groupID })
      promise.then((imResponse) => {
        switch (imResponse.data.status) {
          case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
            // console.log('等待管理员同意')
            break
          case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
            // console.log('加群成功', imResponse) // 加入的群组资料
            // dispatch('getOnLineOfChatGroup', groupID)
            this.isJoin = true
            break
          case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
            // console.log('已经在群中', imResponse)
            this.isJoin = true
            break
          default:
            this.isJoin = false
            break
        }
      }).catch(() => {
        this.joinError = true
        console.warn('加入直播间失败，尝试重新加入') // 申请加群失败的相关信息
      })
    },
    sendMessage (giftMsg) {
      this.isGiftMsg = !!giftMsg || false
      if (!this.messageModel.trim()) {
        this.messageTip({ message: this.$t('请输入您需要发言的内容哦 ^_^') })
        return
      }
      const errMsg = this.$t('当前直播间链接失败，请刷新页面重试！')
      if (!this.isJoin) {
        this.messageTip({ message: this.$t('加入直播间中，请稍后') })
      } else if (this.joinError) {
        this.messageTip({ message: errMsg })
      } else {
        const message = this.$tim.createCustomMessage({
          to: this.match.groupId,
          conversationType: this.$TIM.TYPES.CONV_GROUP,
          priority: this.$TIM.TYPES.MSG_PRIORITY_NORMAL,
          payload: {
            data: crypto.Encrypt(this.messageModel.trim()),
            description: 'encrypt',
            extension: JSON.stringify({vip: this.userInfo.levelName.replace(/[^\d.]/g, "")|| "0"}),
          },
        })
        try {
          const promise = this.$tim.sendMessage(message)
          this.showPopover = false
          promise.then((imResponse) => {
            this.messageList.push(message)
            console.log("🚀 ~ file: Chat.vue ~ line 236 ~ promise.then ~ this.messageList", this.messageList)
            this.messageModel = ''
            this.$nextTick(() => {
              this.$refs.messageBox.scrollTop = this.$refs.messageBox.scrollHeight
            })
          }).catch((err) => {
            this.messageTip({ message: errMsg })
            this.initListener()
          })
        } catch (error) {
          console.log(error)
        }
      }
      if (giftMsg) this.messageModel = ''
    },
    onFocusin () {
      if (!this.userInfo.loginName) this.$router.push('/login')
    },
    async _getShonBetList () {
      if(!this.match.matchId) {
        clearInterval(this.intervalId)
        return
      }
      const res = await this.$http.getShowBetList({betMatchId: this.match.matchId});
      if(res.data.data.length>0){
        this.messageListTotal(res.data.data);
      }
    },
    setTimer () {
      this.intervalId = setInterval(()=>{
        this._getShonBetList();
      }, 15000)
    },
    changeGiftShow () {
      if (!this.isLogin) {
        this.$router.push('/login')
        return
      }
      this.$emit('changeGiftShow')
    },
    sendGift(giftDynamicUrl) {
      this.$emit('receiveGift', giftDynamicUrl)
    }
  },
}
</script>

<style lang="scss">
@import "../../css/Chat.scss";
</style>
