<template>
  <div class="chat-container">
    <div class="msg-list" ref="messageBox"  v-if="isShowChat">
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
              <TextElement :message="message" />
            </span>
          </template>
          <template v-else>
            <ShowBetElement :message="message"/>
          </template>
          </div>
        </div>
      </div>
    </div>

    <div class="send-box">
      <div class="gift-img" @click="changeGiftShow">
        <img src="../../img/gift.png" alt="">
      </div>
      <div class="emoji-input">
        <el-input  required="required" onkeyup="this.value=this.value.replace(/[, ]/g,'')"
            @keydown.native.enter="sendMessage"  rows="1"  resize="none" class="message-input_field" v-model="messageModel" :placeholder="!match ? $t('请选择直播房间～') : $t('我也来说两句')" @focus="onFocusin" :disabled="!match" />
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
        <img class="send-img" src="../../img/live/send.png" alt="">
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
import i18n from '@/i18n'

export default {
  name: 'Chat',
  inject: ['liveData'],
  mixins: [TIMInit],
    props: {
    isShowChat: {
      default: true,
    }
  },
  components: {
    TextElement,
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
    }
  },
  computed: {
    ...mapState('global', ['language']),
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
    if (this.match) this.$tim.off(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
  },
  methods: {
    //- 检测用户群组
    async _checkGroup (groupId) {
      const res = await this.$http.checkGroup({ groupId })
      if (res.data.code) return
      this.joinGroup()
    },
    onReceiveMessage ({ data: messageList }) {
      const { MSG_TEXT, MSG_CUSTOM } = this.$TIM.TYPES
      messageList = messageList.filter(item => (item.type === MSG_TEXT || item.type === MSG_CUSTOM))
      this.messageList = Array.isArray(messageList) ? [...this.messageList, ...messageList] : [...this.messageList, messageList]
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
        console.warn(this.$t('加入直播间失败，尝试重新加入')) // 申请加群失败的相关信息
      })
    },
    findKey (obj,value, compare = (a, b) => a === b) {
      return Object.keys(obj).find(k => compare(obj[k], value))
    },
    sendMessage () {
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
        let messageModel = this.messageModel.trim()
        try {
          // safari 不兼容正则断言匹配
          // messageModel = messageModel.replace(/(?<=\[)(.+?)(?=])/g, (str) => {
          messageModel = messageModel.replace(/\[(.+?)\]/g, (str) => {
            console.log("🚀 ~ file: Chat.vue:192 ~ messageModel=messageModel.replace ~ str", str)
            // 获取原始中文表情文本发送至m 兼容其他客户端表情显示
            const message = i18n.getLocaleMessage(this.language)
            const messageZh = i18n.getLocaleMessage('zh')
            const key = this.findKey(message, str) || this.findKey(messageZh, str) || str
            return this.$tt(key, 'zh')
          })
          // eslint-disable-next-line no-empty
        } catch (e) {}

        const message = this.$tim.createCustomMessage({
          to: this.match.groupId,
          conversationType: this.$TIM.TYPES.CONV_GROUP,
          priority: this.$TIM.TYPES.MSG_PRIORITY_NORMAL,
          payload: {
            data: crypto.Encrypt(messageModel),
            description: 'encrypt',
            extension: JSON.stringify({vip: this.userInfo.levelName.replace(/[^\d.]/g, "")|| "0"}),
          },
        })

        try {
          if(this.sending) return
          this.sending = 1
          const promise = this.$tim.sendMessage(message)
          this.showPopover = false
          promise.then((imResponse) => {
            this.messageList.push(message)
            this.messageModel = ''
            this.$nextTick(() => {
              this.$refs.messageBox.scrollTop = this.$refs.messageBox.scrollHeight
            })
          }).catch((err) => {
            this.messageTip({ message: errMsg })
          }).finally(()=> this.sending = 0)
        } catch (error) {
          console.log(error)
          this.sending = 0
        }
      }
    },
    onFocusin () {
      if (!this.userInfo.loginName) this.$router.push('/login')
    },
    changeGiftShow () {
      if (!this.isLogin) {
        this.$router.push('/login')
        return
      }
      this.$emit('changeGiftShow')
    }
  },
}
</script>

<style lang="scss">
@import "../../css/Chat.scss";
</style>
