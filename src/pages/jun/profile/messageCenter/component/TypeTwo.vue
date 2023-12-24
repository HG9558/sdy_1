<template>
  <div class="info-msg-wrap">
    <div class="clear-div" v-if="unReadCount">
      <div class="count-notice">{{ $tt('unReadCount', { count: unReadCount }) }}</div>
      <div class="clear-btn" @click="clearBtnClick">{{$t('清除未读')}}</div>
    </div>

    <div @click="openDialog(item)" class="info-msg-inner" v-for="(item, index) in messageList" :key="index">
      <span :class="{
              'text-content':true,
               'text-content-text-gray' : item.isRead === 1 ,
            }" v-html="
              item.textContent ? item.textContent.replace(/<.+?>/g, '') : ''
            "></span>
      <span :class="{
              'create-time':true,
             'text-content-text-gray': item.isRead === 1 ,
            }">{{ item.createTime | formatDate('YYYY-MM-DD HH:mm')}}</span>
    </div>

    <!-- 弹窗部分内容 -->
    <global-dialog :title="$t('消息通知')" class="message-dialog" :showDialog.sync="showDialog" :hasSelfFooter="true">
      <div v-if="txtTime" class="unbing-time-div">
        {{ txtTime | formatDate('YYYY-MM-DD HH:mm') }}
      </div>
      <div class="unbing-div">
        {{ txtContent }}
      </div>
      <el-button class="bog unbing-btn-div" @click="_delMessage()">{{$t('删除消息')}}</el-button>
    </global-dialog>

  </div>
</template>

<script>
export default {
  name: "TypeTwo",
  props: {
    unReadCount: Number,
    messageList: Array,
  },
  data () {
    return {
      showDialog: false,
      txtTime: '',
      txtContent: '',
      id: ''
    }
  },
  methods: {
    async openDialog (item) {
      this.showDialog = true;
      this.txtContent = item.textContent.replace(/<.+?>/g, "");
      this.id = item.id;
      this.txtTime = item.createTime;
      if (item.isRead === 1) return;
      const res = await this.$http.setMessageMbrRead({ id: item.id, setReadType: 0 })
      if (res.data.code === 0) {
        this.$emit('triggerSelectClick', { type: 2, icon: 'inform', currentType: 'TypeTwo' })
      }
    },
    clearBtnClick () {
      this.openConfirmDialog({
        content: this.$t('是否将所有未读消息变成已读？'),
        title: this.$t('清除消息'),
        callback: () => {
          this._clearUnRead();
        },
      });
    },
    async _clearUnRead () {
      const firstRes = await this.$http.setMessageMbrRead({ setReadType: 1 });
      if (firstRes.data.code) return;
      const secondRes = await this.$http.getMessageUnread({ msgType: 2 });
      if (secondRes.data.code) return;
      this.$emit('update:unReadCount', secondRes.data.count);
      this.$emit('triggerSelectClick', { type: 2, icon: 'inform', currentType: 'TypeTwo' })
    },
    async _delMessage () {
      try {
        const res = await this.$http.deleteNotice({ id: this.id });
        if (res.data.code) return this.messageTip({ message: this.$t(this.$t('删除失败 接口异常')), type: "error" });
        this.messageTip({ message: this.$t('删除成功') });
        this.$emit('triggerSelectClick', { type: 2, icon: 'inform', currentType: 'TypeTwo' })
        this.showDialog = false;
      } catch (error) {
        this.showDialog = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../css/TypeTwo.scss";
</style>
