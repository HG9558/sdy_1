<template>
  <div class="notice">
    <img class="notice-icon" src="../../img/notice-icon.png" alt="" />
    <div class="notice-label"> 最新消息：</div>
    <div class="notice-content" @click="openDialog($event)">
      <vue-seamless-scroll v-if="newNoticeList.length" ref="seamlessScroll" class="scroll-container" :data="newNoticeList" :class-option="classOption">
        <div class="notice-item" v-for="(item, index) in newNoticeList" :key="index">
          <span :id="item.id" class="notice-title">{{item.noticeTitle}}:</span>
          <span :id="item.id" class="notice-text" v-html="item.noticeContent"></span>
        </div>
      </vue-seamless-scroll>
      <div v-else>暂时还没有系统公告哦！</div>
    </div>

    <global-dialog title="消息公告" :showDialog.sync="showDialog" :width="'480px'" :hasSelfFooter="false" cancelText="我知道了" :showConfirm="false" class="notice-dialog" :appendToBody="true">
      <div class="notice-dialog-cont">
        <img v-if="dialogContent.showType !== '0' && dialogContent.pcPath" class="notice-dialog-img" :src="dialogContent.pcPath" alt="">
        <div class="notice-title">{{dialogContent.noticeTitle}}</div>
        <div class="noticec-dialog-text" v-html="dialogContent.noticeContent"></div>
      </div>
    </global-dialog>

  </div>
</template>

<script> 
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'Notice',
  props: {
    noticeList: Array,
  },
  components: {
    vueSeamlessScroll
  },
  data () {
    return {
      cryptoVisible: false,
      txtContent: '',
      title: '',
      noticeTitle: '',
      classOption: {
        limitMoveNum: 1,
        direction: 2,
        step: .2
      },
      showDialog: false,
      dialogContent: ''
    }
  },
  computed: {
    newNoticeList () {
      return this.noticeList.filter(item => item.showType != 1);
    }
  },
  methods: {
    openDialog (e) {
      if (!e.target.id) return
      this.showDialog = true;
      let item = this.newNoticeList.find(obj => obj.id == e.target.id);
      this.dialogContent = Object.assign({}, item);
      this.dialogContent.noticeContent = this.dialogContent.noticeContent.replace(/\n/g, "<br/>")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./Notice.scss";
</style>
<style lang="scss">
.notice .scroll-container {
  overflow: hidden;
}
.notice-content .scroll-container > div {
  width: 29999px !important;
}

.notice-dialog .el-dialog__body {
  max-height: 300px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #393A42;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #545666;
  }
}
.notice-dialog {
        .notice-dialog-img {
            display: block;
            margin: 0 auto 5px;
            max-width: 100%;
        }
        .noticec-dialog-text {
            text-align: center;
            font-size: 20px;
            padding: 10px 0 0 0;
        }
    }
</style>
