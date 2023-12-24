<template>
  <div class="chat-container">
    <!-- 聊天内容相关  -->
    <div class="info-chat-wrap">
      <div infinite-scroll-delay="500" ref="scroller" class="info-chat-inner">
        <div class="chat-item" v-for="(item, index) in formatList" :key="index">
          <div v-if="item.createTime && !showLoading" class="info-chat-time">
            {{item.createTime.split(' ')[0]}}
          </div>
          <div v-show="item.isSign === 1" class="info-chat-left">
            <img class="avator" src="../img/servicer.png" />
            <!-- <div class="triangle"></div> -->
            <span class="left-text" v-show="item.textContent" v-html="item.textContent"></span>
            <img class="image-url" v-show="item.imageUrl" :src="item.imageUrl" />
            <div class="read"> {{item.isRead === 1 ? '已读' :'未读'}} </div>
          </div>
          <div v-show="item.createUser === userInfo.loginName" class="info-chat-right">
            <div class="read"> {{item.isReadSys === 1 ? '已读' :'未读'}} </div>
            <span class="right-text" v-show="item.textContent" v-html="item.textContent"></span>
            <img class="image-url" v-show="item.imageUrl" :src="item.imageUrl" />
            <div class="triangle"></div>
            <img class="avator" src="../img/avatar.png" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="info-chat-div">
      <el-upload ref="upload" class="upload-demo" drag :limit="1" action="" :show-file-list="false" :auto-upload="false" list-type="picture" accept=".jpg,.png,.jpeg" :on-change="changeHandle">
        <div class="el-upload__text">
          <img class="add-img" src="../img/add.png" />
        </div>
      </el-upload>
      <el-input class="bog send-input" v-model="sendMessage" clearable placeholder="输入内容点击发送">
      </el-input>
      <div class="send-btn" @click="sendClick">
        <img class="send-img" src="../img/send.png" />
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "TypeOne",
  props: {
    messageList: Array,
    unReadCount: Number,
    pageLen: Number,
    currentPage: Number,
    showLoading: Boolean,
  },
  watch: {
    messageList (val) {
      val.length && !this.isGetMore && this.$nextTick(() => {
        this.$refs.scroller.scrollTop = this.$refs.scroller.scrollHeight
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scroller.onscroll = () => {
        if (this.$refs.scroller.scrollTop === 0) {
          this.load();
        }
      };
    })
  },
  data () {
    return {
      sendMessage: '',
      isGetMore: false,
    }
  },
  computed: {
    formatList () {
      let tempList = JSON.parse(JSON.stringify(this.messageList));
      if (tempList.length) {
        return tempList.reduce((prev, next, index) => {
          if (index && (prev[prev.length - 1].createTime.split(' ')[0] === next.createTime.split(' ')[0])) {
            delete prev[prev.length - 1].createTime
          }
          return prev.concat(next);
        }, []).reverse();
      }
      return []
    }
  },
  methods: {
    load () {
      if (this.pageLen === this.currentPage) return
      this.isGetMore = true;
      this.$emit('changeCurrentPage', this.currentPage + 1);
      this.$emit('triggerSelectClick', { type: 1, currentType: 'TypeOne', noLoading: true, getMore: true })
    },
    // 上传图片
    async changeHandle (file) {
      this.isGetMore = false;
      let formData = new FormData();
      formData.append("uploadMessageFile", file.raw);
      const res = await this.$http.getMessageCenterSend(formData);
      if (res.data.code) return
      this.messageTip({ message: "提交成功", type: "success" });
      this.$emit('triggerSelectClick', { type: 1, currentType: 'TypeOne', noLoading: true });
    },
    // 发送
    async sendClick () {
      this.isGetMore = false;
      if (!this.sendMessage) return this.messageTip({ message: "发送内容不能为空" });
      let formData = new FormData();
      formData.append("textContent", this.sendMessage);
      const res = await this.$http.getMessageCenterSend(formData);
      if (res.data.code) return this.messageTip({ message: res.data.msg });
      this.sendMessage = '';
      this.$emit('triggerSelectClick', { val: '收件箱', type: 1, icon: 'message', currentType: 'TypeOne', noLoading: true });
    }
  },
  deactivated () {
    this.isGetMore = false;
  }
}
</script>

<style scoped lang="scss">
@import "../css/TypeOne.scss";
</style>