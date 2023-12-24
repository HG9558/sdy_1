<template>
  <div class="message-wrapper">
    <div class="nav-item-container">
      <div :class="{'nav-item':true,on:componentName === item.currentType}" v-for="item in tabList" :key="item.icon" @click="selectClick(item)">
        <div :class="`nav-item-content ${(unReadCount&&item.currentType === 'TypeTwo')?'un-read-count' : ''}`">
          <img class="icon" :src="require(`./img/${item.icon}${componentName === item.currentType?'_active':''}.png`)" />
          <span class="vertical-line">|</span>
          <span class="tab-name">{{ item.val }}</span>
        </div>

      </div>
    </div>
    <div class="main-container">
      <!-- 各个组件相关 -->
      <keep-alive>
        <component :is="componentName" :messageList="messageList" @triggerSelectClick="selectClick" :pageLen="pageLen" :currentPage="reqData.pageNo" @changeCurrentPage="changeCurrentPage" :unReadCount.sync="unReadCount"></component>
      </keep-alive>

      <Loading :showLoading="showLoading" class="message-load" />

      <!-- 没有数据 -->
      <div class="no-data-img" v-if="componentName !== 'TypeOne' && pageTotal === 0 && !showLoading">
        <img style="height: 117px" src="../img/no_data.png" alt="" /><br />
        <span>暂无数据</span>
      </div>

      <!-- 分页使用 -->
      <Pagination class="pagination-class" v-if="componentName !== 'TypeOne' && pageTotal !== 0" :pagination="paginationList" @change="switchNextList" />

    </div>
  </div>
</template>

<script>
import Loading from 'commonComponent/Loading';
import TypeOne from './component/TypeOne.vue'
import Pagination from "commonComponent/Pagination";
import {mapState,mapMutations} from "vuex";

export default {
  name: "messageCenter",
  components: {
    TypeOne,
    TypeTwo: () => import('./component/TypeTwo.vue'),
    TypeThree: () => import('./component/TypeThree.vue'),
    Loading,
    Pagination,
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this.init();
      }
    }
  },
  data () {
    return {
      tabList: [
        { val: '收件箱', type: 1, icon: 'message', currentType: 'TypeOne' },
        { val: '通知', type: 2, icon: 'inform', currentType: 'TypeTwo' },
        { val: '公告', type: 0, icon: 'notice', currentType: 'TypeThree' },
      ],
      componentName: 'TypeOne',
      showLoading: false,
      messageList: [],
      pageTotal: 0,
      pageLen: 0,
      reqData: {
        key: "",
        pageNo: 1,
        pageSize: 10,
        msgType: 1,
        isRead: 0,
        mbrisRead: 0,
      }
    }
  },
  computed: {
    ...mapState({
       unReadCount: state => state.user.unMessageCount,
    }),
    paginationList () {
      return {
        currentPage: this.reqData.pageNo,
        pageSize: this.reqData.pageSize,
        total: this.pageTotal
      };
    },
  },
  methods: {
    ...mapMutations('user', ['set_un_read_message_count']),
    init () {
      this._initMessageData();
    },
    async _getUnReadCount () {
      const res = await this.$http.getMessageUnread({ msgType: this.reqData.msgType })
      if (res.data.code) return
      this.set_un_read_message_count(res.data.count);
    },
    //- 获取1，2数据
    async _initMessageData (noLoading, getMore) {
      this.showLoading = noLoading ? false : true;
      try {
        const res = await this.$http.getMessageInfoList(this.reqData)
        this.showLoading = false;
        if (res.data.code) return
        getMore ? this.messageList.push(...res.data.data.list) : this.messageList = res.data.data.list;
        this.pageTotal = res.data.data.totalCount;
        this.pageLen = res.data.data.totalPage;
      } catch (error) {
        this.getMore && this.reqData.pageNo--
        this.showLoading = false;
      }
    },
    // 切换标题
    selectClick (item) {
      this.componentName = item.currentType
      this.pageTotal = 0;
      this.reqData.msgType = item.type
      !item.getMore && (this.reqData.pageNo = 1);
      item.type !== 1 && (this.messageList = []);

      switch (item.type) {
        case 0:
          return this._getNoticeData();
        case 2:
          this.reqData.isRead = 1
          this._getUnReadCount();
          break;
        case 1:
          this.reqData.isRead = 0
          break;
      }
      this._initMessageData(item.noLoading, item.getMore);
    },
    async _getNoticeData () {
      this.showLoading = true;
      try {
        const res = await this.$http.getNoticeList({
          pageSize: this.reqData.pageSize,
          pageNo: this.reqData.pageNo,
          showType: 2,
        })
        this.showLoading = false;
        if (res.data.code) return
        this.messageList = res.data.page.list;
        this.pageTotal = res.data.page.totalCount;
      } catch (error) {
        this.showLoading = false;
      }
    },
    changeCurrentPage (currentPage) {
      this.reqData.pageNo = currentPage;
    },
    switchNextList (data) {
      if (this.reqData.pageNo === data.current) return
      this.reqData.pageNo = data.current;
      this._initMessageData();
    }
  },
}
</script>

<style scoped lang="scss">
@import "./css/index.scss";
</style>