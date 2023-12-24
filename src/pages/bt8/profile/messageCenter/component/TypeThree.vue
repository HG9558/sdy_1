<template>
  <div class="info-msg-wrap">
    <div @click="openDialog(item, 0)" class="info-msg-inner" v-for="(item, index) in renderList" :key="index">
      <span class="text-content" v-text="item.noticeContent.replace(/<.+?>/g, '')"></span>
      <span class="create-time">{{ item.startTime | formatDate('YYYY-MM-DD HH:mm') }}</span>
    </div>

    <global-dialog title="公告" class="message-dialog" :showDialog.sync="isShowDialog" cancelText="我知道了" :showConfirm="false">
      <div class="unbing-div-center">
        {{ titleWord }}
      </div>
      <div class="unbing-div-content" v-html="txtContent">
      </div>
      <!-- <div class="unbing-time-right">
        {{ txtTime | formatDate('YYYY-MM-DD HH:mm') }}
      </div> -->
    </global-dialog>
  </div>

</template>

<script>
export default {
  name: 'TypeThree',
  props: {
    messageList: Array,
  },
  data () {
    return {
      isShowDialog: false,
      txtContent: '',
      titleWord: '',
      txtTime: ''
    }
  },
  computed: {
    renderList () {
      if (!this.messageList.length) return [];
      const tempList = [...this.messageList]
      return tempList.map((item) => {
        item.noticeContent = item.noticeContent.replace(/\n/g, "<br>");
        item.isNotice = true;
        return item;
      });
    }
  },
  methods: {
    openDialog (item) {
      this.isShowDialog = true;
      this.txtContent = item.noticeContent;
      this.titleWord = item.noticeTitle;
      this.txtTime = item.createTime;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../css/TypeThree.scss";
</style>