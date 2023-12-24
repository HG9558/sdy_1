<template>
  <split-line>
    <div class="notice">
      <img class="notice-icon" src="../../img/notice-icon.png" alt="" />
      <div class="notice-content" @click="openDialog($event)">
        <vue-seamless-scroll v-if="newNoticeList.length" ref="seamlessScroll" class="scroll-container" :data="newNoticeList" :class-option="classOption">
          <div class="notice-item" v-for="(item, index) in newNoticeList" :key="index">
            <span :id="item.id" class="notice-title">{{item.noticeTitle}}:</span>
            <span :id="item.id" class="notice-text" v-html="item.noticeContent"></span>
          </div>
        </vue-seamless-scroll>
        <div v-else>{{$t('暂时还没有系统公告哦！')}}</div>
      </div>
      <global-dialog :title="$t('消息公告')" :showDialog.sync="showDialog"  :width="'450px'" :hasSelfFooter="false" :cancelText="$t('我知道了')" :showConfirm="false" class="notice-dialog">
        <div class="notice-dialog-cont">
          <img v-if="dialogContent.showType !== '0' && dialogContent.pcPath" class="notice-dialog-img" :src="dialogContent.pcPath" alt="">
          <div class="notice-title">{{dialogContent.noticeTitle}}</div>
          <p class="noticec-dialog-text" v-html="dialogContent.noticeContent"></p>
        </div>
      </global-dialog>
    </div>
  </split-line>
</template>

<script>
import SplitLine from 'commonComponent/SplitLine/SplitLine.vue'
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'Notice',
  props: {
    noticeList: Array,
  },
  components: {
    SplitLine,
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
.notice-content .scroll-container > div {
  width: 29999px !important;
}
.notice-dialog .el-dialog__footer .el-button {
  margin: 0 auto;
}
</style>
