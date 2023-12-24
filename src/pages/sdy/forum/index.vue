<template>
  <div class="forum-container">
    <div class="forum-main">
      <div class="forum-nav-wrapper">
        <div :class="['nav-item',{on:circle=== item.circle}]" v-for="(item,index) in classifyList" :key="index" @click="changeClassify(item,index)">
          <img class="nav-icon" :src="require(`./img/${item.type}${circle=== item.circle?'_on':''}.png`)" alt="">
          <span class="text">{{item.name}}</span>
        </div>
      </div>
      <!-- 评论列表组件 -->
      <forum-list v-if="forumList.length && !isShowDetail" :forumList="forumList" :currentTitle="classifyList[currentIndex].name" :classifyList="classifyList" :pageNo="pageNo" :listTotal="listTotal" @changePage="changePage" @goDetail="goDetail" @goHomePage="set_scroll_app_downLoad"></forum-list>
      <!-- 评论详情组件 -->
      <forum-detail :isShowDetail.sync="isShowDetail" v-else-if="isShowDetail" @goHomePage="set_scroll_app_downLoad" :contentDetail="contentDetail" :isLogin="isLogin"></forum-detail>

      <template v-else>
        <Loading :showLoading="loading" class="forum-load" />
        <img v-if="!loading" class="no-data-img" src="./img/no_data.png" alt="" />
      </template>
    </div>
  </div>
</template>

<script>
import ForumList from './component/ForumList.vue';
import ForumDetail from './component/ForumDetail.vue';
import { mapMutations, mapState } from 'vuex'
export default {
  name: "forum",
  components: {
    ForumList,
    ForumDetail
  },
  watch: {
    SToken: {
      immediate: true,
      handler (val) {
        val && this.init();
      }
    },
  },
  data () {
    return {
      classifyList: [
        { type: 'hot', name: "热门圈子", circle: null },
        { type: 'football', name: "篮球圈" },
        { type: 'basketball', name: "足球圈" },
        { type: 'guess', name: "竞猜圈" },
        { type: 'gaming', name: "电竞圈" },
        { type: 'hodgepodge', name: "大杂烩" },
        { type: 'feedback', name: "意见反馈" },
      ],
      forumList: [],
      isShowDetail: false,
      currentIndex: 0,
      circle: null,
      pageNo: 1,
      pageSize: 10,
      listTotal: 0,
      loading: false,
      contentDetail: {},
    }
  },
  methods: {
    ...mapMutations('normal', ['set_scroll_app_downLoad']),
    async init () {
      //- 获取分类列表
      this.loading = true;
      const { data } = await this.$http.listCircle({ terminal: 1 });
      if (data.code) return;
      this.classifyList = [this.classifyList[0], ...this.classifyList.filter(item => {
        for (let reqItem of data.data) {
          if (reqItem.name === item.name) {
            item = Object.assign(item, reqItem, { isExit: true, circle: reqItem.id });
            break;
          }
        }
        return item.isExit;
      })];
      this._getList();
    },
    async _getList () {
      this.loading = true;
      const { data } = await this.$http[this.isLogin ? 'listPost' : 'listPostGuest']({
        circle: this.circle,
        listType: 0,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      })
      this.loading = false;
      if (data.code) return
      this.forumList = data.data.list;
      this.listTotal = data.data.totalCount
    },
    //- 切换当前界面
    changePage (page) {
      this.pageNo = page;
      this._getList();
    },
    //- 切换分类获取不同列表内容
    changeClassify (item, index) {
      this.isShowDetail = false;
      this.currentIndex = index;
      this.circle = item.circle;
      this.forumList = [];
      this.listTotal = 0;
      this.pageNo = 1;
      this._getList();
    },
    //- 跳转详情界面
    goDetail (item) {
      this._addReadAmount(item.id);
      this.isShowDetail = true;
      this.contentDetail = item;
    },
    //- 添加当前铁子访问量
    async _addReadAmount (postId) {
      const res = await this.$http[this.isLogin ? 'PostRead' : 'PostReadGuest']({ postId, terminal: 1 });
      if (res.data.code) return
      this._getList();
    }
  },
  computed: {
    ...mapState({
      isLogin: state => !!state.user.token,
    })
  }
}
</script>

<style scoped lang="scss">
@import "./css/index.scss";
</style>
<style lang="scss">
.no-data-img {
  display: block;
  margin: 0 auto;
}
.forum-main .forum-load {
  top: 0;
  position: static;
  padding-top: 50px;
  min-height: 0;
  text-align: center;
  transform: translate(0, 0);
}
</style>
